(function() {
    'use strict';
    var $dummy = $('<div></div>');
    angular.module('ngStyleGuide',[])
    /**
     * スタイルガイドディレクティブ
     */
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
    /**
     * スタイルをブロック分けするディレクティブ
     */
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
                    guideCtrl.addBlock($scope);
                }
            };
        })
    /**
     * ブロックの見出し
     */
        .directive('heading',function() {
            return {
                require: '^block',
                restrict: 'E',
                link: function($scope,$element,$attr,blockCtrl) {
                    $scope.html = $element.text();
                    $element.attr('id',$scope.$id);
                    blockCtrl.addHeading($scope);
                }
            };
        })
    /**
     * ブロックの説明文
     */
        .directive('comment', function() {
            return {
                require: '^block',
                restrict: 'E',
                scope: true
            }
        })
    /**
     * スタイルコード
     */
        .directive('markup',function($compile) {
            return {
                require: '^block',
                restrict: 'E',
                scope: true,
                link: function($scope,$element,$attr,blockCtrl) {
                    $scope.html = $element.html();
                    $element.html('<preview>'+$scope.html+'</preview>');
                    var inter = $compile('<sample class="prettyprint">{{html | pretty}}</sample>')($scope);
                    blockCtrl.addMarkup($scope);
                    $element.append(inter);
                    window.setTimeout(function() {
                        inter.html(prettyPrintOne(inter.html()));
                    });
                }
            };
        })
    /**
     * 整形フィルタ
     */
        .filter('pretty',function() {
            return function(input) {
                if(!input) return '';
                input = input.replace(/^\n+/gm,'').replace(/^\s+$/gm,'').replace(/\n+$/gm,'').replace(/\t/gm,'    ');
                var m = input.match(/^\s+/gm,'');
                var min = NaN;
                for (var i = 0 , len = m.length; i< len; i++) {
                    if(m[i].length < min || isNaN(min)) {
                        min = m[i].length;
                    }
                }
                if(isNaN(min)) {
                    return input;
                }
                var reg = new RegExp('^\\s{'+min+'}','gm');
                input = input.replace(reg,'');
                return input;
            }
        })
    /**
     * アンカーリンク
     */
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
    /**
     * ナビゲーション
     */
        .directive('navigation', function() {
            return {
                restrict: 'E',
                scope: true
            }
        });
})();