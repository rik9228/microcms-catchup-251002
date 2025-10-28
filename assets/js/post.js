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
 *    - 公開日を「YYYY-MM-DD」形式で表示
 *    - カテゴリを表示
 *    - 本文をそのまま HTML として挿入
 *    - サムネイル画像を表示（なければダミー画像を利用）
 * 4. もし通信や変換に失敗したら、エラーを表示する
 *
 * @async
 * @function fetchDetail
 * @returns {Promise<void>} DOM にニュース詳細を反映するだけで返り値はなし
 */
async function fetchDetail() {
  // DOM 要素を取得
  const titleEl = document.getElementById("news-title");      // 記事タイトル表示エリア
  const dateEl = document.getElementById("news-date");        // 公開日表示エリア
  const categoryEl = document.getElementById("news-category");// カテゴリ表示エリア
  const contentEl = document.getElementById("news-content");  // 本文表示エリア
  const thumbnailEl = document.getElementById("news-thumbnail"); // サムネイル画像

  try {
    // microCMS API から記事データを取得
    const res = await fetch(ENDPOINT, {
      headers: { "X-API-KEY": API_KEY }
    });

    // レスポンスを JSON に変換
    const data = await res.json();

    // タイトルを表示
    titleEl.textContent = data.title;

    // 公開日を表示（YYYY-MM-DD の形式）
    dateEl.textContent = `公開日: ${data.publishedAt?.slice(0,10)}`;

    // カテゴリを表示（カテゴリー名が入っている想定）
    categoryEl.innerHTML = `カテゴリー: ${data.category.name}`;

    // 本文を HTML として表示（microCMS 側で HTML として保存されているため innerHTML を使用）
    contentEl.innerHTML = data.content;

    // サムネイル画像を表示（なければダミー画像に置き換え）
    thumbnailEl.src = data.thumbnail ? data.thumbnail.url : "https://dummyimage.com/960x600.jpg";

  } catch (error) {
    // エラー発生時の処理
    console.error("詳細取得エラー:", error);
    contentEl.innerHTML = "<p>記事を読み込めませんでした。</p>";
  }
}

// ページ読み込み時に詳細データを取得して表示
fetchDetail();
