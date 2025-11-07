'use strict';

const SERVICE_DOMAIN = window.ENV.MICROCMS_SERVICE_DOMAIN;
const API_KEY = window.ENV.MICROCMS_API_KEY;

// microCMS のニュース一覧エンドポイント
const ENDPOINT = `https://${SERVICE_DOMAIN}.microcms.io/api/v1/news`;

/**
 * ニュース一覧を取得して HTML のリストに表示する関数
 *
 * ## 処理の流れ
 * 1. HTML内の「news-list」という id を持つ要素を取得する
 * 2. fetch API を使って microCMS からニュース一覧データを取得
 * 3. JSON に変換し、内容を一旦クリアしてからループでリストを作成
 *    - 本文 (content) の HTMLタグを取り除き、80文字程度に抜粋して「概要文」を作る
 *    - タイトル・公開日・カテゴリー・抜粋を li 要素として組み立てる
 * 4. データが 0 件なら「現在お知らせはありません」と表示
 * 5. 通信エラーなどが発生した場合は「データ取得失敗」のメッセージを表示
 *
 * @async
 * @function fetchNews
 * @returns {Promise<void>} 非同期処理でリストを書き換えるため、返り値はなし
 */
async function fetchNews() {
  // ニュース一覧を表示する ul（または ol）要素
  const listEl = document.getElementById("news-list");
  // ローディングメッセージを表示
  listEl.innerHTML = "<li id='loading'>読み込み中...</li>";

  try {
    // microCMS API からデータを取得
    const res = await fetch(ENDPOINT, {
      headers: { "X-API-KEY": API_KEY }
    });

    // JSON に変換
    const data = await res.json();

    // 各ニュース記事をリストとして表示
    data.contents.forEach((item, idx) => {
      // 本文からタグを除去してテキストだけにする
      const plainText = item.content
        .replace(/<[^>]*>?/gm, "") // HTMLタグ除去
        .replace(/\s+/g, " ")      // 余計な空白を整形
        .trim();

      // 80文字を超えたら省略（抜粋文）
      const excerpt = plainText.length > 80 ? plainText.slice(0, 80) + "…" : plainText;

      // li 要素を生成
      const li = document.createElement("li");
      li.className = "news-item";
      /**
       * 使用する場合は、こちらのinnerHTMLの内容を適当に変えてください
       * id: 記事ID
       * title: 記事名
       * publishedAt: 公開日
       * category.name: カテゴリー名
       * excerpt: 抜粋文
       * ダミーのHTML↓ ↓ ↓
       * <li>
       *  <a href="/news/post/?id=記事ID" aria-label="記事名 詳細へ">記事名</a>
       *   <small>公開日</small>
       *  <span>カテゴリー名</span>
       *  <p>本文からの抜粋文</p>
       * </li>
       */
      li.innerHTML = `
        <a href="/news/post/?id=${item.id}" class="news-link">
          <div class="news-meta">
            <time datetime="${item.publishedAt}">
              ${item.publishedAt ? item.publishedAt.slice(0, 10) : "日付未定"}
            </time>
            ${item.category ? `<span class="category">${item.category.name}</span>` : ""}
          </div>
          <h3 class="news-title">${item.title}</h3>
          <p class="news-excerpt">${excerpt}</p>
        </a>
      `;

      //　最後の要素なら読み込み中メッセージを削除
      if(idx === data.contents.length - 1) {
        document.querySelector('#loading')?.remove(); // 読み込み中メッセージを削除
      }

      listEl.appendChild(li);
    });

    // 記事が 0 件のとき
    if (data.contents.length === 0) {
      listEl.innerHTML = "<li>現在お知らせはありません。</li>";
    }
  } catch (error) {
    // エラー発生時
    console.error("取得エラー:", error);
    listEl.innerHTML = "<li>データの取得に失敗しました。</li>";
  }
}

// ページ読み込み時に実行
// fetchNews();
