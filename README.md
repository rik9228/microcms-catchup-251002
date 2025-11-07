# microCMS Catchup Project

このリポジトリは **microCMS** を用いた学習用サンプルプロジェクトです。  
初学者が microCMS を使った Web サイトの基本的な仕組みを理解できるように構成されています。

---

## 📚 学べること
1. [はじめに](./docs/1_はじめに.md)
2. [CMSについて](./docs/2_CMSについて.md)
3. [Javascriptの基礎](./docs/3_Javascript基礎.md)
4. [microCMSを使ってみる](./docs/4_microCMSを使ってみる.md)
5. [サイトに公開しよう](./docs/5_サイトに公開しよう.md)
6. [使用するにあたり](./docs/使用するにあたり.md)

## 📂 プロジェクト構成

```bash
microcms-catchup_251107/
.
├── README.md
├── assets
│   ├── css
│   └── js
├── dist
│   ├── assets
│   ├── index.html
│   └── news
├── docs
│   ├── CMSについて.md
│   ├── Javascript基礎.md
│   ├── microCMSを使ってみる.md
│   ├── はじめに.md
│   ├── サイトに公開しよう.md
│   └── 他の案件で使用する場合.md
├── index.html
├── news
│   ├── index.html
│   └── post
├── package-lock.json
└── package.json
```

---

## 🚀 セットアップ

1. **リポジトリをクローン**
```bash
git clone <このリポジトリのURL>
cd microcms-catchup_251107
```

2. 依存関係をインストール

```bash
npm install
```

3. 開発サーバーを起動

```bash
npm run start
```

## 🔑 環境変数の設定
microCMS の API にアクセスするために、以下の情報を `/assets/js/env.js` ファイルに設定してください。

※`.env`などの仕組みは使わずにwindowオブジェクトに格納して簡易に指定できるようにしています。

```javcscript
window.ENV = {
  MICROCMS_SERVICE_DOMAIN: "your-service-id",
  MICROCMS_API_KEY: "your-service-id"
};
```

## 📰 機能概要
- トップページ (index.html)
  - プロジェクトの説明やナビゲーションを表示。
- ニュース一覧 (/news/)
  - microCMS API から取得した記事の一覧を表示。
- ニュース詳細 (/news/post/)
  - 記事の詳細情報を表示

## 🛠 使用技術
- microCMS - ヘッドレスCMS
- HTML / CSS / JavaScript
- Node.js（パッケージ管理に使用）

## 📄 ライセンス
MIT License