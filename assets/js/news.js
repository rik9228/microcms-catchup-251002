'use strict';

const SERVICE_DOMAIN = window.ENV.MICROCMS_SERVICE_DOMAIN;
const API_KEY = window.ENV.MICROCMS_API_KEY;

// APIエンドポイント
const ENDPOINT = `https://${SERVICE_DOMAIN}.microcms.io/api/v1/news`;

/**
 * ニュース一覧ページ
 */
async function fetchNews() {
  const listEl = document.getElementById("news-list");

  try {
    const res = await fetch(ENDPOINT, {
      headers: { "X-API-KEY": API_KEY }
    });
    const data = await res.json();

    listEl.innerHTML = ""; // 初期の「読み込み中」を消す

    data.contents.forEach(item => {
      // 概要文は content のHTMLタグを除去して最初の80文字くらいを抜粋
      const plainText = item.content
        .replace(/<[^>]*>?/gm, "")
        .replace(/\s+/g, " ")
        .trim();
      const excerpt = plainText.length > 80 ? plainText.slice(0, 80) + "…" : plainText;

      // li要素を生成
      const li = document.createElement("li");
      li.className = "news-item";
      li.innerHTML = `
        <a href="/news/post/?id=${item.id}" class="news-link">
          <div class="news-meta">
            <time datetime="${item.publishedAt}">
              ${item.publishedAt ? item.publishedAt.slice(0,10) : "日付未定"}
            </time>
            ${item.category ? `<span class="category">${item.category.name}</span>` : ""}
          </div>
          <h3 class="news-title">${item.title}</h3>
          <p class="news-excerpt">${excerpt}</p>
        </a>
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

// ページ読み込み時に実行
// fetchNews();
