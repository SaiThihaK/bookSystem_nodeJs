// Modules
const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
// Code
const app = express();
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "sai2002dec24",
  database: "booksystem",
});

// to receive client requests
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json("Hello This is from backend");
});

app.get("/books", (req, res) => {
  const q = "SELECT * from book";
  db.query(q, (data, err) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.post("/books", (req, res) => {
  const q = `INSERT INTO BOOK(book_title,book_desc,book_cover,book_price) VALUE(?)`;
  const value = [
    req.body.book_title,
    req.body.book_desc,
    req.body.book_cover,
    req.body.book_price,
  ];
  db.query(q, [value], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});
app.put("/books/:id", (req, res) => {
  const book_id = req.params.id;
  const q =
    "UPDATE  book SET book_title=?,book_desc=?,book_cover=?,book_price=?  WHERE book_id = ?";
  const value = [
    req.body.book_title,
    req.body.book_desc,
    req.body.book_cover,
    req.body.book_price,
  ];
  db.query(q, [...value, book_id], (err, data) => {
    if (err) return res.json(err);
    return res.json("The book is successfully deleted");
  });
});
app.delete("/books/:id", (req, res) => {
  const book_id = req.params.id;
  const q = "DELETE from book WHERE book_id = ?";
  db.query(q, [book_id], (err, data) => {
    if (err) return res.json(err);
    return res.json("The book is successfully updated");
  });
});
app.listen(8800, (req, res) => {
  console.log("sever connected");
});
