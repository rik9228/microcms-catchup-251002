# 💡 microCMS連携の前に理解しておきたいこと（JavaScript基礎）

microCMSを使用する上で、以下の知識を必要とします。

- **API**
- **非同期処理**
- 基本的な配列操作
- オブジェクトの扱い
- DOM操作の基礎

## 1. API
🔸 API（Application Programming Interface）とは

-> 他のサービスとデータを取得・送信するために必要な仕組み
例：microCMSやWeather API、GitHub APIなど

Web制作では、コンテンツ・記事取得周りにおいて、ブログ運営などで使用するケースが多いです。

また、アプリケーションでも天気情報や電車の遅延情報などを取得して使いたい

といった場合に、国や自治体などが公開しているデータを取得して有効活用できます。

🔸 リクエストとレスポンス

API通信をリクエスト（送信）することで、レスポンス（返事）が返されます。

-> 通常のWebサイトを表示することと大枠は同じ。

## 2. 非同期処理 （async / await）

🔸 非同期処理とは？

WebサイトでAPIを使うとき、データのやり取り（通信）には少し時間がかかります。

たとえば microCMS から記事を取得するときも、

ネットワークの状態によっては 0.5 秒〜2 秒 ほどかかることがあります。

この「時間がかかる処理」を待たずに進める仕組みが、JavaScriptの「非同期処理」です。

🧠 例えるなら：「友達に買い物を頼んで、その間に掃除を進める」ようなもの

<br>

🔸 なぜ非同期処理が必要なのか？

もしJavaScriptが **すべての処理を順番にしか実行できない（同期処理）** だけだったら、
通信中はアプリ全体が止まってしまいます。

```javascript
// 仮に同期的な世界だったら…
const data = fetchSync('https://example.microcms.io/api/v1/news') // ← 通信完了まで停止
console.log('データ取得完了:', data)
```

この場合、通信が終わるまでユーザーは何もできません。

ボタンも押せないし、画面もスクロールできません。

それを防ぐために JavaScript は **非同期処理** を使い、「通信が終わるまで他の処理を進める」ことができるようになっています。（そういう設計になっている）

<br>

🔸 fetch() は非同期で動く

JavaScriptでAPI通信を行う際によく使うのが `fetch()` です。

->  `Promiseオブジェクト` を返します。

ここでは`https://randomuser.me/api/` を例にAPIを叩いてみます。

```javascript
const res = fetch('https://randomuser.me/api/')
console.log(res) // Promise { <pending> } ← “まだ結果が届いていません”
```

-> この時点では「結果は後で渡すね」という“約束（Promise）”の状態がとりあえず返されます。

<br>

🔸 async / await の基本構文

async と await を使うと、
「通信が終わるのを一時的に待ってから次の処理へ進む」ことができます。

`fetch()` の結果は**Promise（未確定のデータ）**なので、

実際の中身を使うには await で“解凍”（するようなイメージ）してから扱う必要があります。

```javascript
async function getUsers() {
  // 通信が終わるまでこの行で一時停止
  const res = await fetch('https://randomuser.me/api/');
  // レスポンスデータをJSONに変換（ここも非同期処理）
  const data = await res.json()
  console.log(data)
}
getUsers()
```

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
      "login": {
        "uuid": "8944e4dd-cad3-4ecf-becf-b780fe9bcec8",
        "username": "smallzebra761",
        "password": "treasure",
        "salt": "VPZm3V08",
        "md5": "61fa6ee0cff1b9502af181ef20ae50ff",
        "sha1": "0de1afb168ace8924967a6f31aff13a16e7636d0",
        "sha256": "d9c46fbc4727bc8805eb4e07e777f52855e4bf56d81eb01fca495b4dc071ce34"
      },
      "dob": {
        "date": "1972-01-19T18:13:02.963Z",
        "age": 53
      },
      "registered": {
        "date": "2013-03-26T09:01:06.744Z",
        "age": 12
      },
      "phone": "(995)-788-8541",
      "cell": "(987)-037-1481",
      "id": {
        "name": "",
        "value": null
      },
      "picture": {
        "large": "https://randomuser.me/api/portraits/men/2.jpg",
        "medium": "https://randomuser.me/api/portraits/med/men/2.jpg",
        "thumbnail": "https://randomuser.me/api/portraits/thumb/men/2.jpg"
      },
      "nat": "TR"
    }
  ],
  "info": {
    "seed": "c3b9e90230262975",
    "results": 1,
    "page": 1,
    "version": "1.4"
  }
}
```
</details>

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

[microCMS との繋ぎこみ](/docs/microCMSを使ってみる.md)