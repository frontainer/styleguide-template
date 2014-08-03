styleguide-template(β)
===================

AngularJSを使ったスタイルガイドテンプレート

## デモ
[http://frontainer.com/styleguide-template/](http://frontainer.com/styleguide-template/)

## 使い方
index.htmlにガイドの元となるCSSを読み込む

	<link rel="stylesheet" href="/path/to/yours.css">
	
下記のルールで<styleguide></styleguide>内にマークアップする

	<block>
		<heading>見出し</heading>
		<markup>
			<!-- サンプルコード -->
			<a class="button button-success">送信</a>
		</markup>
	</block>

以上！

デザインの変更はng-styleguide.cssを編集すれば可能です。

## Todo

* サンプルコード表示の整形
* できればシンタックスハイライトさせたい
* 備考や説明文の追加

## 更新履歴
0.0.1 - Release
