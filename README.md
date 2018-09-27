
#2018/09/28
村井の社内gulp開発は今日までです。
今後はgithubに公開しているリポジトリで開発していくので、
興味のある方は下記参照お願い致します。
https://github.com/taichi0514

# gulp v3 → v4 設定方法

gulp を v4 にアップデートしてしまうとこれまでの gulp(v3)が起動できなくなります。  
これまでの gulpfile(v3)を使うにはグローバルから gulp-cli を削除し、  
ローカルの gulp を起動させることによって version の違う gulp を起動させる事ができます。

グローバルの gulp 削除コマンド

`npm rm --global gulp-cli`  
`npm rm --global gulp`

※ローカルの gulp とは package.json に記載されている gulp のバージョンの事です。

これからは npx コマンドで gulp を実行させる必要があります。  
npx とは Node.js バージョン 8.2.0 以降から追加された機能で、ローカルにある gulp を簡単に起動させる事ができます。  
nodist 経由で node.js をインストールされてる方は手動で npx をインストールしなくてはなりません。

インストールコマンド

`npm i -g npx`

ちなみに nodist 経由で node.js をインストールされてる場合 npm が自動でアップデートできないので,  
下記のコマンドを実行してください。

`npm i -g npm`

以上で gulp v3 → v4 設定は終わりです。

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

