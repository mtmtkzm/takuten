UNITED用のGulpタスクを作ります。内容物は主に、Sass・EJS。

## 制作時の環境
- npm 3.7.3
- node 5.6.0
- gulp 3.9.1

## How to use
### テンプレートの準備
このテンプレートをダウンロードし、以下のファイル＆フォルダを任意のプロジェクトディレクトリに展開。

- app
- gulpfile.js
- package.json

### 必要なプラグイン等を全てインストール
展開したディレクトリで以下のコマンドを実行。
```
npm install
```

処理終了を待ち、全ファイルをビルド。
```
gulp build
```

処理終了を待ち、ローカルサーバを立ち上げファイルの変更を監視を開始。
```
gulp
```
