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
		<comment>このスタイルの説明文</comment>
		<markup>
			<!-- サンプルコード -->
			<a class="button button-success">送信</a>
		</markup>
	</block>

以上！

デザインの変更はng-styleguide.cssを編集すれば可能です。

## plugin
[jquery.htmlClean.min.js](https://code.google.com/p/jquery-clean/)
[google-code-prettify](https://code.google.com/p/google-code-prettify/)

## 更新履歴
0.0.2 - 整形をプラグインを使うように。シンタックスハイライト実装。
0.0.1 - Release. commentディレクティブ追加
