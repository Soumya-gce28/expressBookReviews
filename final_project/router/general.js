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

  // Validate input
  if (!username || !password) {
    return res.status(400).json({ message: "Username and password required" });
  }

  // Check if user already exists
  if (isValid(username)) {
    return res.status(409).json({ message: "Username already exists" });
  }

  // Register user
  users.push({ username, password });
  return res.status(200).json({ message: "User registered successfully" });
});

/**
 * Get the complete list of books
 */
public_users.get('/', (req, res) => {
  return res.status(200).json(books); // No need for async or Promise here
});

/**
 * Get book details by ISBN
 */
public_users.get('/isbn/:isbn', (req, res) => {
  const isbn = req.params.isbn;

  if (books[isbn]) {
    return res.status(200).json(books[isbn]);
  } else {
    return res.status(404).json({ message: "Book not found" });
  }
});

/**
 * Get books by author (case-insensitive)
 */
public_users.get('/author/:author', (req, res) => {
  const author = req.params.author.toLowerCase();
  const result = Object.values(books).filter(
    b => b.author.toLowerCase() === author
  );

  if (result.length === 0) {
    return res.status(404).json({ message: "No books found for this author" });
  }

  return res.status(200).json(result);
});

/**
 * Get books by title (case-insensitive)
 */
public_users.get('/title/:title', (req, res) => {
  const title = req.params.title.toLowerCase();
  const result = Object.values(books).filter(
    b => b.title.toLowerCase() === title
  );

  if (result.length === 0) {
    return res.status(404).json({ message: "No books found with this title" });
  }

  return res.status(200).json(result);
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
