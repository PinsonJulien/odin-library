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
const availableStorageSpan = document.getElementById("local-space");

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

// Refresh local space
updateAvailableStorageSpace();

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

  // Refresh local space
  updateAvailableStorageSpace();
  
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

    // Refresh local space
    updateAvailableStorageSpace();
  });

  bookCard.addEventListener('updated', (e) => {
    // Save locally
    setLocalStorageBookSet();

    // Refresh local space
    updateAvailableStorageSpace();
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

function updateAvailableStorageSpace() {
  const remainingSpace = getRemainingLocalStorageSpace();

  let value;
  let unit;

  if (remainingSpace > 100000) {
    value = Number(remainingSpace / 1000000).toFixed(2);
    unit = "mb";
  }

  else if (remainingSpace > 10000) {
    value = Number(remainingSpace / 1000).toFixed(2);
    unit = "kb";
  }

  else {
    value = remainingSpace;
    unit = "b";
  }

  availableStorageSpan.textContent = `${value} ${unit}`;
}

function byteSize(str) {
  return new Blob([str]).size
}

function getRemainingLocalStorageSpace() {
  // 5mb
  const storageLimit = 5000000;

  return storageLimit - byteSize(JSON.stringify(window.localStorage));
}