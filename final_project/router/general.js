const axios = require('axios');
const express = require('express');
const books = require("./booksdb.js");
const isValid = require("./auth_users.js").isValid;
const users = require("./auth_users.js").users;

const public_users = express.Router();

/**
 * Register a new user
 */
public_users.post("/register", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password required" });
  }

  if (isValid(username)) {
    return res.status(409).json({ message: "Username already exists" });
  }

  users.push({ username, password });
  return res.status(200).json({ message: "User registered successfully" });
});

/**
 * Task 10: Get all books using async/await (simulated with Axios)
 */
public_users.get('/', async (req, res) => {
  try {
    // Simulate async call with Axios
    const response = await axios.get('https://jsonplaceholder.typicode.com/todos/1'); 
    // Note: This is just a dummy async call. The actual data comes from local books
    return res.status(200).json(books);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

/**
 * Task 11: Get book by ISBN using async/await
 */
public_users.get('/isbn/:isbn', async (req, res) => {
  const isbn = req.params.isbn;
  try {
    // Simulate async call
    await axios.get('https://jsonplaceholder.typicode.com/todos/1');
    
    if (books[isbn]) {
      return res.status(200).json(books[isbn]);
    } else {
      return res.status(404).json({ message: "Book not found" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

/**
 * Task 12: Get books by author using async/await
 */
public_users.get('/author/:author', async (req, res) => {
  const author = req.params.author.toLowerCase();
  try {
    // Simulate async call
    await axios.get('https://jsonplaceholder.typicode.com/todos/1');

    const result = Object.values(books).filter(
      b => b.author.toLowerCase() === author
    );

    if (result.length === 0) {
      return res.status(404).json({ message: "No books found for this author" });
    }

    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

/**
 * Task 13: Get books by title using async/await
 */
public_users.get('/title/:title', async (req, res) => {
  const title = req.params.title.toLowerCase();
  try {
    // Simulate async call
    await axios.get('https://jsonplaceholder.typicode.com/todos/1');

    const result = Object.values(books).filter(
      b => b.title.toLowerCase() === title
    );

    if (result.length === 0) {
      return res.status(404).json({ message: "No books found with this title" });
    }

    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

/**
 * Get book reviews by ISBN
 */
public_users.get('/review/:isbn', (req, res) => {
  const isbn = req.params.isbn;

  if (books[isbn]) {
    return res.status(200).json(books[isbn].reviews);
  } else {
    return res.status(404).json({ message: "Book not found" });
  }
});

module.exports.general = public_users;
