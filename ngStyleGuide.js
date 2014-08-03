(function() {
    'use strict';
    var STYLE = {
        block: {
            marginBottom: '40px'
        },
        heading: {
            fontSize: '32px'
        }
    };
    angular.module('ngStyleGuide',[])
        .directive('styleguide', function() {
            return {
                restrict: 'E',
                scope: {
                    ngModel: '='
                },
                controller: function($scope) {
                    $scope.blocks = [];
                    this.addBlock = function(block) {
                        $scope.blocks.push(block);
                        $scope.ngModel = $scope.blocks;
                    }
                }
            }
        })
        .directive('block',function() {
            return {
                require: '^styleguide',
                restrict: 'E',
                scope: true,
                controller: function($scope) {
                    $scope.headings = [];
                    $scope.markups = [];
                    this.addHeading = function(heading) {
                        $scope.headings.push(heading);
                    };
                    this.addMarkup = function(markup) {
                        $scope.markups.push(markup);
                    };
                },
                link: function($scope,$element,$attr,guideCtrl) {
                    $element.css(STYLE.block);
                    guideCtrl.addBlock($scope);
                }
            };
        })
        .directive('heading',function() {
            return {
                require: '^block',
                restrict: 'E',
                link: function($scope,$element,$attr,blockCtrl) {
                    $scope.html = $element.text();
                    $element.attr('id',$scope.$id);
                    $element.css(STYLE.heading);
                    blockCtrl.addHeading($scope);
                }
            };
        })
        .directive('markup',function($compile) {
            return {
                require: '^block',
                restrict: 'E',
                scope: true,
                link: function($scope,$element,$attr,blockCtrl) {
                    $scope.html = $element.html();
                    $element.html('<preview>'+$scope.html+'</preview>');
                    var inter = $compile('<sample>{{html | pretty}}</sample>')($scope);
                    $element.append(inter);
                    blockCtrl.addMarkup($scope);
                }
            };
        })
        .filter('pretty',function() {
            return function(input) {
                if(!input) return '';
                var tabsp = input.split('\n');
                var max = NaN;
                for (var i = 0,len=tabsp.length;i<len;i++){
                    var m = tabsp[i].match(/ {2}/g,'');
                    if(m) {
                        if (m.length < max || isNaN(max)) {
                            max = m.length;
                        }
                    }
                }
                var reg = new RegExp('  {'+max+'}','g');
                if (isNaN(max)) {
                    return input;
                }
                return input.replace(/^\n/m,"").replace(/^\s/mg,"").replace(/^\s+$/gm,'').replace(reg, "");
            }
        })
        .directive('anchor', function($anchorScroll,$location) {
            return {
                restrict: 'E',
                scope:{
                    headings: '='
                },
                link: function($scope,$element) {
                    $element.attr('href',$scope.headings[0].$id);
                    $element.html($scope.headings[0].html);
                    $element.on('click',function(e){
                        e.preventDefault();
                        $location.hash(this.getAttribute('href'));
                        $anchorScroll();
                    })
                }
            }
        })
        .directive('navigation', function() {
            return {
                restrict: 'E',
                scope: true
            }
        });
})();