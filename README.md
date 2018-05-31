# gulp v3 → v4設定方法

gulpをv4にアップデートしてしまうとこれまでのgulp(v3)が起動できなくなります。  
これまでのgulpfile(v3)を使うにはグローバルからgulp-cliを削除し、  
ローカルのgulpを起動させることによってversionの違うgulpを起動させる事ができます。  

グローバルのgulp削除コマンド  

`npm rm --global gulp-cli`  
`npm rm --global gulp`  

※ローカルのgulpとはpackage.jsonに記載されているgulpのバージョンの事です。


これからはnpxコマンドでgulpを実行させる必要があります。  
npxとはNode.jsバージョン8.2.0以降から追加された機能で、ローカルにあるgulpを簡単に起動させる事ができます。  
nodist経由でnode.jsをインストールされてる方は手動でnpxをインストールしなくてはなりません。  

インストールコマンド  

`npm i npx`  

ちなみにnodist経由でnode.jsをインストールされてる場合npmが自動でアップデートできないので,  
下記のコマンドを実行してください。  

`npm i npm`  

以上でgulp v3 → v4設定は終わりです。


# gulp 起動コマンド  

`npx gulp`

## browserSync

browserSync 単体起動  
`npx gulp server`

## scss 機能

### コンパイル処理のみ

`npx gulp sass`

### scss 拡張機能使用方法

#### sassGlob

https://qiita.com/tonkotsuboy_com/items/67d9fd4d054a45af9f34

#### autoprefixer

https://parashuto.com/rriver/tools/using-custom-data-for-autoprefixer

#### assets

↑ 開発元が一年ぐらい更新がないので使わないほうが良いかも  
https://qiita.com/mo4_9/items/0221f50c22864ffe71f3

## minify 機能

一括 minify コマンド

`npx gulp minify`

### 画像圧縮処理

`npx gulp imagemin`  
https://ichimaruni-design.com/2017/06/image-min/

### minify-html

`npx gulp minify-html`

### minify-css

`npx gulp minify-css`

### minify-js

`npx minify-js`
