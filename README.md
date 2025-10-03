# microCMS Catchup Project

このリポジトリは **microCMS** を用いた学習用サンプルプロジェクトです。  
初学者が microCMS を使った Web サイトの基本的な仕組みを理解できるように構成されています。

---

## 📂 プロジェクト構成

```bash
microcms-catchup-251002/
├── index.html # トップページ
├── news/ # ニュース一覧・詳細ページ
│ ├── index.html
│ └── post/index.html
├── package.json # Node.js パッケージ管理
├── .gitignore # Git 管理から除外するファイル設定
└── README.md # この説明ファイル
```

---

## 🚀 セットアップ

1. **リポジトリをクローン**
```bash
git clone <このリポジトリのURL>
cd microcms-catchup-251002
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
  - 記事の詳細情報を表示。

## 📚 学べること
- microCMS の基本的な使い方
- API 経由でデータを取得して HTML に表示する流れ
- Git を用いたソース管理
- Node.js / npm を使った開発環境の基本

## 🛠 使用技術
- microCMS - ヘッドレス CMS
- HTML / CSS / JavaScript
- Node.js（パッケージ管理に使用）

## ✅ 今後の課題
React / Vue / Astro などフレームワーク版の実装例追加

## 📄 ライセンス
MIT License