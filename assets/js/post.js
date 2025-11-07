'use strict';

const SERVICE_DOMAIN = window.ENV.MICROCMS_SERVICE_DOMAIN;
const API_KEY = window.ENV.MICROCMS_API_KEY;

// URLパラメータから記事ID (?id=xxxxx) を取得
const params = new URLSearchParams(window.location.search);
const newsId = params.get("id");

// microCMS のニュース詳細エンドポイント
const ENDPOINT = `https://${SERVICE_DOMAIN}.microcms.io/api/v1/news/${newsId}`;

/**
 * ニュース詳細ページ用のデータを取得して、HTMLに反映する関数
 *
 * ## 処理の流れ
 * 1. HTML内の必要な要素を取得する（タイトル・日付・カテゴリ・本文・サムネイル）
 * 2. fetch API で microCMS から記事データを取得する
 * 3. JSON に変換して各要素に代入する
 *    - タイトルを表示
 *    - サムネイル画像を表示（なければダミー画像を利用）
 *    - 公開日を「YYYY-MM-DD」形式で表示
 *    - カテゴリを表示
 *    - 本文をそのまま HTML として挿入
 * 4. もし通信や変換に失敗したら、エラーを表示する
 *
 * @async
 * @function fetchDetail
 * @returns {Promise<void>} DOM にニュース詳細を反映するだけで返り値はなし
 */
async function fetchDetail() {
  // DOM 要素を取得
  const contentEl = document.getElementById("news-contents");  // 本文表示エリア

  contentEl.innerHTML = "<p>読み込み中...</p>";

  try {
    // microCMS API から記事データを取得
    const res = await fetch(ENDPOINT, {
      headers: { "X-API-KEY": API_KEY }
    });
    // レスポンスを JSON に変換
    const data = await res.json();

    // ダミーデータ
    /**
     * <!-- <h2 id="news-title">記事テスト - 2</h2>
        <div class="news-meta">
          <p class="news-date" id="news-date">公開日: 2025-10-02</p>
          <p class="news-category" id="news-category">カテゴリー: 更新情報</p>
        </div>
        <div class="news-thumbnail">
          <img id="news-thumbnail" src="https://dummyimage.com/960x600.jpg" alt="" width="960" height="600">
        </div>
        <div id="news-content" class="news-content">
          <h2 id="h56f7699da4">見出しが入ります</h2>
          <p>テキストが入ります</p>
          <p>テキストが入ります</p>
          <p>テキストが入ります</p>
        </div> -->
     */

    // 各要素にデータを反映
    contentEl.innerHTML = `
        <h2 id="news-title">${data.title}</h2>
        <div class="news-meta">
          <p class="news-date" id="news-date">公開日: ${data.publishedAt ? data.publishedAt.slice(0, 10) : "日付なし"}</p>
          <p class="news-category" id="news-category">カテゴリー: ${data.category ? data.category.name : "カテゴリーなし"}</p>
        </div>
        <div class="news-thumbnail">
          <img id="news-thumbnail" src="${data.thumbnail ? data.thumbnail.url : "https://dummyimage.com/960x600.jpg"}" alt="" width="960" height="600">
        </div>
        <div id="news-content" class="news-content">
          ${data.content}
        </div>
        `
  } catch (error) {
    // エラー発生時の処理
    console.error("詳細取得エラー:", error);
    contentEl.innerHTML = "<p>記事を読み込めませんでした。</p>";
  }
}

// fetchDetail();
