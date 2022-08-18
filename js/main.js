"use strict";
import Modal from "../js/components/modal.js";
import Button from "../js/components/button.js";
import BookCard from "../js/components/book-card.js";
import Book from "../js/models/book.js";

// Custom components definition
customElements.define('modal-component', Modal);
customElements.define('button-component', Button);
customElements.define('book-card', BookCard);

const modal = document.getElementById("modal");

const addButton = document.getElementById("add-button");
addButton.onClick = (() => {
  modal.toggle(true);
});

const books = document.getElementById("books");

// Read all locally stored books and generate their cards.
const bookSet = getLocalStorageBookSet();

bookSet.forEach((book, id) => {
  addNewBookCard(book);
});

const newBookForm = document.getElementById("new-book-form");
newBookForm.addEventListener("submit", (e) => {
  const form = e.target;
  const getInputValue = (name) => {
    return form[name].value;
  }

  // Get each values from the form and create a new book from it.
  const title = getInputValue("title");
  const author = getInputValue("author");
  const pages = getInputValue("pages");
  const read = getInputValue("read");

  const book = new Book(title, author, pages, read);
  
  // Add in html  
  addNewBookCard(book);
  
  // Add in set
  bookSet.add(book);

  // Save locally
  setLocalStorageBookSet();
  
  // Hide the modal and reset the form.
  modal.toggle(false);
  form.reset();
});

function addNewBookCard (book) {
  const bookCard = new BookCard(book);

  bookCard.addEventListener('removed', (e) => {
    const card = e.target;
    const book = Object.getPrototypeOf(card.book);

    // Removes from html
    books.removeChild(card);

    // Removes from set
    bookSet.delete(book);

    // Save locally
    setLocalStorageBookSet();
  });

  bookCard.addEventListener('updated', (e) => {
    // Save locally
    setLocalStorageBookSet();
  });

  books.append(bookCard);
}

function getLocalStorageData(key) {
  return window.localStorage.getItem(key);
}

function setLocalStorageData(key, value) {
  window.localStorage.setItem(key, value);
}

function getLocalStorageBookSet() {
  const str = getLocalStorageData('books');
  return convertStringToSet(str);
}

function setLocalStorageBookSet() {
  setLocalStorageData('books', convertSetToString(bookSet));
}

function convertSetToString(set) {
  const array = [...set];
  return JSON.stringify(array); 
}

function convertStringToSet(string) {
  const array = JSON.parse(string);
  return new Set(array);
}