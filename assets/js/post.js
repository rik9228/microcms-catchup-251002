'use strict';

const SERVICE_DOMAIN = window.ENV.MICROCMS_SERVICE_DOMAIN;
const API_KEY = window.ENV.MICROCMS_API_KEY;

// URLパラメータからIDを取得 (?id=xxxxx)
const params = new URLSearchParams(window.location.search);
const newsId = params.get("id");

const ENDPOINT = `https://${SERVICE_DOMAIN}.microcms.io/api/v1/news/${newsId}`;

/**
 * ニュース詳細ページ
 */
async function fetchDetail() {
  const titleEl = document.getElementById("news-title");
  const dateEl = document.getElementById("news-date");
  const categoryEl = document.getElementById("news-category");
  const contentEl = document.getElementById("news-content");

  const thumbnailEl = document.getElementById("news-thumbnail");

  try {
    const res = await fetch(ENDPOINT, {
      headers: { "X-API-KEY": API_KEY }
    });
    const data = await res.json();

    titleEl.textContent = data.title;

    // 日付
    dateEl.textContent = `公開日: ${data.publishedAt?.slice(0,10)}`;

    // 本文（microCMSからのcontentはHTML文字列）
    categoryEl.innerHTML = `カテゴリー: ${data.category.name}`;
    
    // 本文（microCMSからのcontentはHTML文字列）
    contentEl.innerHTML = data.content;

    // サムネイル
    thumbnailEl.src = data.thumbnail ? data.thumbnail.url : "https://dummyimage.com/960x600.jpg";

  } catch (error) {
    console.error("詳細取得エラー:", error);
    contentEl.innerHTML = "<p>記事を読み込めませんでした。</p>";
  }
}

fetchDetail();
