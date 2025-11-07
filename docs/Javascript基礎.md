# 💡 microCMS連携の前に理解しておきたいこと（JavaScript基礎） - 15 min

microCMSを使う前に、まずは以下の基本的なJavaScriptの知識をおさえておきましょう。  
これらを理解しておくと、APIとのやり取りやデータ表示の流れがスムーズになります。

---

## 1. APIとは

### 🔸 API（Application Programming Interface）とは？

他のサービスと**データを受け渡しするための仕組み**です。  

たとえば次のような場面で使われます。

- microCMS：記事データを取得する  
- Weather API：天気情報を取得する  
- Google Maps API：地図情報を取得する　など

Web制作では「外部サービスから情報をもらう」ことが多く、  
APIはそのための“データの受け渡し”のような役割を持っています。

--> たとえば、ブログの記事をmicroCMSのAPIから取得して一覧表示する、というのが典型的な例です。

> よく言われるのは、レストランの中で「メニューを注文する」イメージです。
> お客さん（フロントエンド）がウェイター（API）に注文を伝え、
> ウェイターがキッチン（サーバー）に伝えて料理（データ）を持ってくる、というイメージです。
> APIはこのウェイターの役割を果たします。

![APIの仕組み](/assets/images/api_howto.png)

---

## 2. 非同期処理について

APIを使用する際に重要なのが**非同期処理**の理解です。  
APIからデータを取得するには時間がかかるため、JavaScriptでは**非同期処理**を使ってデータを取得します。

参考：
https://cybozu.dev/ja/tutorials/hello-js/promise/

## 同期処理とは

> JavaScriptは、一度に複数の処理を実行できない言語です。
> プログラミングの世界では、複数の処理をひとつずつ順番に実行することを、同期処理と呼びます。

大前提として**APIを使った通信処理は時間がかかります。**

同期処理で実行すると他の処理が止まってしまうことがあります。

試しに、長時間処理を行う同期関数を見てみましょう。

```javascript
/**
 * 同期的に指定ミリ秒だけ待機する関数
 * ⚠️ 実行中はブラウザやNode.jsの処理がすべて止まります
 *
 * @param {number} ms - 停止する時間（ミリ秒）
 */
function blockSleep(ms) {
  const start = Date.now();

  // 指定時間に達するまで空ループを続ける
  while (Date.now() - start < ms) {
    // ここでCPUを消費しながら待機
    return;
  }
}

console.log('🚀 処理を開始します');
blockSleep(10000); // 10秒間ブロック
console.log('✅ 処理が再開されました');
```

-> 実行すると最初のログを出力した後10秒間画面が停止し、操作を受け付けなくなる。
このままでは、ユーザー体験が非常に悪くなってしまいます。

## 非同期処理とは

この問題を解決するために、JavaScriptでは**非同期処理**という仕組みが用意されています。

非同期処理では、時間のかかる処理を**バックグラウンドで実行し、完了したら結果を受け取る**ことができます。

`settimeout()` は非同期処理の代表例です。

```javascript
console.log('1. 処理を開始します');

setTimeout(() => {
  console.log('10秒後に実行されました');
}, 10000); // 10秒後にコールバック関数を実行

console.log('2. 処理を終了します');

```

![settimeout使用例](/assets/images/settimeout.png)

-> 1と2のログがすぐに出力され、10秒後にコールバック関数（引数として渡される関数）が実行される。

🔸 料理に例えると

同期処理だったら：

1. 具材をオーブンに入れる（時間のかかる処理を開始）
2. **オーブンの作業が終わるまで待つ（他の処理が止まる）**
3. 2が完了したら、他の料理を作る
4. 完成した料理を食べる（結果を利用する）

非同期処理だったら：

1. 具材をオーブンに入れる（時間のかかる処理を開始）
2. **オーブンの作業中に、他の料理を作る（他の処理を実行）**
3. 完成した料理を食べる（結果を利用する）

![同期処理と非同期処理の違い](/assets/images/async.png)

---

### 🔸 Fetch と Promise

JavaScriptでAPIを呼び出すには `fetch()` を使います。  
この関数は「すぐに結果を返さず、**後で結果を渡すよ**」という**Promiseオブジェクト**を返します。

```javascript
const res = fetch('https://randomuser.me/api/')
console.log(res) // Promise { <pending> } ← 結果は“あとで届く”状態
```

Promise（プロミス）は「後で結果を渡すという約束」だと考えると分かりやすいです。
ただし、ただPromiseオブジェクトを返されただけで期待するデータは取り出せません。

### 🔸 async / await

そこで登場するのが `async / await` です。   
これは「結果が届くまで少しだけ待ってから次に進む」ための書き方です。


```javascript
/**
 * 一定時間待機する関数
 * @param {number} ms - 待機する時間（ミリ秒）
 * @returns {Promise<void>} 指定時間後に解決されるPromise
 */
const wait = (ms) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`✅ ${ms}ミリ秒経過しました`);
      resolve();
    }, ms);
  });
};

(async () => {
  console.log('🚀 処理を開始');

  await wait(1500);

  console.log('🎉 完了');
})();
```

-> `settimeout()`では、前後の処理が連続して実行されましたが、
`async / await` を使うと、await部分で一時停止し、処理が完了するまで待機します。

※画面操作は止まりません。

### 🔸 実際にAPIを呼び出してみる

[ramdomuser.me](https://randomuser.me/) はランダムなユーザーデータを返すAPIです。試しに使ってみましょう。

```javascript
async function getUsers() {
  // 通信が終わるまで一時的にストップ
  const res = await fetch('https://randomuser.me/api/')
  // 取得したデータをJSON形式に変換
  const data = await res.json()
  console.log(data)
}
getUsers()
```

- await：結果が届くまで待つ
- async：この関数の中で await が使えるようにする宣言

つまり await は「約束の箱（Promise）」を開けるための合言葉のようなものです。
データが届くと、次の行に進みます。

<details>
  <summary>実際に返される取得データ</summary>

```json
{
  "results": [
    {
      "gender": "male",
      "name": {
        "title": "Mr",
        "first": "Kerim",
        "last": "Köybaşı"
      },
      "location": {
        "street": {
          "number": 2507,
          "name": "Mevlana Cd"
        },
        "city": "Erzurum",
        "state": "Bayburt",
        "country": "Turkey",
        "postcode": 86015,
        "coordinates": {
          "latitude": "72.8081",
          "longitude": "-19.2113"
        },
        "timezone": {
          "offset": "-4:00",
          "description": "Atlantic Time (Canada), Caracas, La Paz"
        }
      },
      "email": "kerim.koybasi@example.com",
      ...
    }
  ]
}
```
</details>

<br />

非同期処理はとっても複雑な概念です！

個人的にこちらの動画がわかりやすいので、時間があればお目通しくださいませ👀

<a href="https://www.youtube.com/watch?v=OBqj4I5NAEg" target="_blank">非同期処理とは何か？【超入門編/JavaScript/プログラミング】</a>

---

## 3. 基本的な配列操作
🔸 配列とは？

配列（Array）は、複数のデータをひとまとめにして管理するための箱です。

```javascript
const fruits = ['apple', 'banana', 'orange']
console.log(fruits[0]) // apple
```

📦「同じ種類のデータを並べて扱う」イメージです。

microCMSから取得した「記事一覧」も、実は配列の形で返ってきます。

```javascript
// microCMSのレスポンス例
data.contents = [
  { title: 'お知らせ1', publishedAt: '2025-01-01' },
  { title: 'お知らせ2', publishedAt: '2025-02-01' }
]
```

🔸 よく使う配列メソッド

| メソッド        | 説明               | 使用例                                              |
| ----------- | ---------------- | ------------------------------------------------ |
| `forEach()` | すべての要素を順に処理      | `fruits.forEach(f => console.log(f))`            |
| `map()`     | 各要素を変換して新しい配列を作る | `const upper = fruits.map(f => f.toUpperCase())` |
| `filter()`  | 条件に合う要素だけ残す      | `const long = fruits.filter(f => f.length > 5)`  |
| `find()`    | 条件に合う最初の要素を返す    | `fruits.find(f => f === 'banana')`               |


## 4. オブジェクトの扱い
🔸 オブジェクトとは？

オブジェクトは「1つのものに関する情報をまとめた構造」です。
**{キー: 値}** のペアでデータを持ちます。

```javascript
const article = {
  title: 'microCMS講座開催！',
  date: '2025-11-04',
  category: 'お知らせ'
}

console.log(article.title) // microCMS講座開催！
```


🔸 配列とオブジェクトの組み合わせ

APIのデータはたいてい 「配列の中にオブジェクト」 という形で返ってきます。

```javascript
const articles = [
  { title: 'お知らせ1', date: '2025-01-01' },
  { title: 'お知らせ2', date: '2025-02-01' }
]

console.log(articles[0].title) // お知らせ1
```

## 5. DOM操作の基礎
🔸 DOMとは？

DOM（Document Object Model）は、
HTMLをJavaScriptから操作できるようにした仕組みです。

たとえば「記事タイトルをHTMLに表示したい」ときに使います。

🔸 要素を取得する

```javascript
const list = document.getElementById('news-list')
```

これで、HTML内の `<ul id="news-list">` をJavaScriptから扱えるようになります。

🔸 要素を作って追加する
```javascript
const li = document.createElement('li')
li.textContent = 'microCMS講座開催！'
list.appendChild(li)
```

これでHTMLに新しい `<li>` 要素が追加されます。


| 概念     | 説明             | microCMSでの活用               |
| ------ | -------------- | -------------------------- |
| 配列     | 複数データをまとめて扱う   | 記事一覧 (`data.contents`)     |
| オブジェクト | 1つの情報のまとまり     | 記事1件 (`{title, date, id}`) |
| DOM操作  | HTML要素を動的に変更する | 取得したデータを画面に表示              |

---

[microCMSを使ってみる](/docs/microCMSを使ってみる.md)