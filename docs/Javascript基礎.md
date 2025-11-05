# 💡 microCMS連携の前に理解しておきたいこと（JavaScript基礎） - 10 min

microCMSを使う前に、まずは以下の基本的なJavaScriptの知識をおさえておきましょう。  
これらを理解しておくと、APIとのやり取りやデータ表示の流れがスムーズになります。

---

## 1. APIとは

### 🔸 API（Application Programming Interface）とは？
他のサービスと**データを受け渡しするための仕組み**です。  
たとえば次のような場面で使われます。

- microCMS：記事データを取得する  
- Weather API：天気情報を取得する  
- GitHub API：リポジトリ情報を取得する  

Web制作では「外部サービスから情報をもらう」ことが多く、  
APIはそのための“データの受け渡し”のような役割を持っています。

💡 たとえば、ブログの記事をmicroCMSのAPIから取得して一覧表示する、  
というのが典型的な例です。

---

## 2. 非同期処理 （async / await）

### 🔸 なぜ「非同期処理」が必要なの？
APIを使ってデータを取得するとき、通信には少し時間がかかります。  
もし通信が終わるまでプログラム全体が止まってしまったら、  
ボタンも押せず、画面も動かない状態になってしまいます。

そこで登場するのが **非同期処理（Asynchronous Processing）**。  
「時間がかかる処理（通信など）を待っている間に、他の処理を進める」仕組みです。

### 🔸 fetch() は非同期で動く

JavaScriptでAPIを呼び出すには `fetch()` を使います。  
この関数は「すぐに結果を返さず、**後で結果を渡すよ**」という**Promiseオブジェクト**を返します。

```javascript
const res = fetch('https://randomuser.me/api/')
console.log(res) // Promise { <pending> } ← 結果は“あとで届く”状態
```

Promise（プロミス）は「後で結果を渡すという約束」だと考えると分かりやすいです。
ただし、このままでは結果を取り出せません。

### 🔸 async / await の基本構文

そこで登場するのが `async / await` です。   
これは「結果が届くまで少しだけ待ってから次に進む」ための書き方です。

※ ramdomuser.me はランダムなユーザーデータを返すAPIです。試しに使ってみましょう。

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

<br />

非同期処理はとっても複雑な概念です！

個人的にこちらの動画がわかりやすいので、時間があればお目通しくださいませ👀

<a href="https://www.youtube.com/watch?v=OBqj4I5NAEg" target="_blank">非同期処理とは何か？【超入門編/JavaScript/プログラミング】</a>

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