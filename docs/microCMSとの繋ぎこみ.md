# 🔌 microCMSとの繋ぎこみ

## 概要

microCMSはヘッドレスCMSとして記事やコンテンツをAPI経由で取得できます。
ここでは、JavaScriptを使ってニュース一覧・詳細ページを取得・表示する方法をまとめます。

## 前提条件

- microCMS のサービスを作成済み
- API キー（X-API-KEY）が発行されている

## 基本の書き方

### 1. エンドポイント設定

```javascript
const SERVICE_DOMAIN = "xxxxx";
const API_KEY = "yyyyy";

// 例：ニュース一覧
const ENDPOINT = `https://${SERVICE_DOMAIN}.microcms.io/api/v1/news`;
```

-> `SERVICE_DOMAIN`, `API_KEY` はサービスごとに適宜変更してください。

### 2. データ取得（fetch）

```javascript
const res = await fetch(ENDPOINT, {
  headers: { "X-API-KEY": API_KEY }
});
const data = await res.json();
```

->->-> `data.contents` に設定したデータが格納されています。

### 3. DOMに描画

```javascript
data.contents.forEach(item => {
  const li = document.createElement("li");
  li.innerHTML = `
    <a href="/news/post/?id=${item.id}">
      ${item.title}
    </a>
    <small>${item.publishedAt?.slice(0,10) || "日付未定"}</small>
  `;
  document.getElementById("news-list").appendChild(li);
});

```