'use strict';

// microCMS のサービスドメインと API キーを環境変数から取得
const SERVICE_DOMAIN = window.ENV.MICROCMS_SERVICE_DOMAIN;
const API_KEY = window.ENV.MICROCMS_API_KEY;
// microCMS の「news」エンドポイント
const ENDPOINT = `https://${SERVICE_DOMAIN}.microcms.io/api/v1/news`;

/**
 * ニュース記事を microCMS から取得し、HTML のリストに表示する関数
 *
 * ## 処理の流れ
 * 1. DOM から「news-list」という id の要素を取得する
 * 2. fetch API を使って microCMS のエンドポイントからデータを取得する
 * 3. 取得に成功したら JSON に変換する
 * 4. データ内の contents 配列を1件ずつ <li> タグとして生成し、リストに追加する
 *    - タイトルをリンクとして表示（記事詳細ページへ飛べるようにする）
 *    - 公開日（publishedAt）を「YYYY-MM-DD」の形式で表示
 * 5. もし記事が0件なら「現在お知らせはありません。」と表示する
 * 6. 取得エラーが発生した場合は、エラーメッセージをリストに表示する
 *
 * @async
 * @function fetchNews
 * @returns {Promise<void>} 非同期処理で DOM にリストを反映するだけなので返り値はなし
 */
async function fetchNews() {
  // 1. DOM からリスト要素を取得
  const listEl = document.getElementById('news-list');
  // ローディングメッセージを表示
  listEl.innerHTML = "<li id='loading'>読み込み中...</li>";

  // 2. microCMS からデータを取得
  try {
    // microCMS からデータを取得
    const res = await fetch(ENDPOINT, {
      headers: { "X-API-KEY": API_KEY }
    });

    // レスポンスを JSON に変換
    const data = await res.json();

    // contents が存在すれば 1件ずつリストを作成
    data.contents.forEach((item, idx) => {
      const li = document.createElement("li");
      /**
       * 使用する場合は、こちらのinnerHTMLの内容を適当に変えてください
       * id: 記事ID
       * title: 記事名
       * publishedAt: 公開日
       * ダミーのHTML↓ ↓ ↓
       * <li>
       *  <a href="/news/post/?id=記事ID" aria-label="記事名 詳細へ">記事名</a>
       *  <small>公開日</small>
       * </li>
       */

      // クエリパラメータで記事IDを渡すリンクを生成
      // 例： /news/post/?id=xxxx
      // slice で日付部分だけ切り出し（YYYY-MM-DD） 元のデータが ISO 形式なので先頭10文字を取得
      li.innerHTML = `
        <a href="/news/post/?id=${item.id}" aria-label="${item.title} 詳細へ">${item.title}</a>
        <small>${item.publishedAt?.slice(0, 10) || "日付未定"}</small>
      `;

      //　最後の要素なら読み込み中メッセージを削除
      if (idx === data.contents.length - 1) {
        document.querySelector('#loading')?.remove(); // 読み込み中メッセージを削除
      }

      listEl.appendChild(li);
    });
    // データが空ならメッセージ表示
    if (data.contents.length === 0) {
      listEl.innerHTML = "<li>現在お知らせはありません。</li>";
    }
  } catch (error) {
    // 通信や JSON 変換に失敗した場合など
    console.error("取得エラー:", error);
    listEl.innerHTML = "<li>データの取得に失敗しました。</li>";
  }
}

// 関数を実行してページ読み込み時にニュースを表示する
// fetchNews();
