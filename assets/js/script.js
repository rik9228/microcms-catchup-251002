'use strict';

const SERVICE_DOMAIN = window.ENV.MICROCMS_SERVICE_DOMAIN;
const API_KEY = window.ENV.MICROCMS_API_KEY;

const ENDPOINT = `https://${SERVICE_DOMAIN}.microcms.io/api/v1/news`;

/**
 * トップページ
 */
async function fetchNews() {
  const listEl = document.getElementById("news-list");

  try {
    const res = await fetch(ENDPOINT, {
      headers: { "X-API-KEY": API_KEY }
    });
    const data = await res.json();

    listEl.innerHTML = "";

    data.contents.forEach(item => {
      const li = document.createElement("li");
      li.innerHTML = `
        <a href="/news/post/?id=${item.id}" aria-label="${item.title} 詳細へ">
          ${item.title}
        </a>
        <small>${item.publishedAt?.slice(0,10) || "日付未定"}</small>
      `;
      listEl.appendChild(li);
    });

    if (data.contents.length === 0) {
      listEl.innerHTML = "<li>現在お知らせはありません。</li>";
    }
  } catch (error) {
    console.error("取得エラー:", error);
    listEl.innerHTML = "<li>データの取得に失敗しました。</li>";
  }
}

fetchNews();
