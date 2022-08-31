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
// Empty the element (text issue.)
books.replaceChildren();

// Read all locally stored books and generate their cards.
const bookList = getLocalStorageBookList();

bookList.forEach((book) => {
  addNewBookCard(book);
});

// Refresh local space
updateAvailableStorageSpace();

const newBookFormError = document.getElementById("new-book-form-error");
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

  // If the new book is too big for the storage, shows an error message.
  if (byteSize(JSON.stringify(book)) >= getRemainingLocalStorageSpace()) {
    newBookFormError.textContent =  "There's not enough space available.";
    return;
  }

  // Add in html  
  addNewBookCard(book);

  // Add and sort in list
  bookList.push(book);
  sortBookList();

  // Place the element properly if it's not the last.
  // This allows to avoid sorting the whole array of DOM elements.
  const id = getBookId(book);
  if (books.childNodes.length - 1 != id ) {
    // Get the element on supposed new element position
    const afterElement = books.childNodes[id];
    // Get last element added (the new one)
    const beforeElement = books.childNodes[books.childNodes.length - 1];

    afterElement.before(beforeElement);
  }
  
  // Save locally
  setLocalStorageBookList();

  // Refresh local space
  updateAvailableStorageSpace();
  
  // Hide the modal and reset the form.
  modal.toggle(false);
  form.reset();
  newBookFormError.textContent = "";
});

function addNewBookCard (book) {
  const bookCard = new BookCard(book);

  bookCard.addEventListener('removed', (e) => {
    const card = e.target;
    const book = Object.getPrototypeOf(card.book);

    // Removes from html
    books.removeChild(card);

    // Removes from list
    bookList.splice(getBookId(book), 1);

    // Save locally
    setLocalStorageBookList();

    // Refresh local space
    updateAvailableStorageSpace();
  });

  bookCard.addEventListener('updated', (e) => {
    // Save locally
    setLocalStorageBookList();
  });

  books.appendChild(bookCard);
}

function getBookId(book) {
  return bookList.findIndex((e) => e === book);
}

function sortBookList() {
  bookList.sort((a, b) => {
    return a.title.localeCompare(b.title); 
  });
}

function getLocalStorageData(key) {
  const data =  window.localStorage.getItem(key);
  return data;
}

function setLocalStorageData(key, value) {
  window.localStorage.setItem(key, value);
}

function getLocalStorageBookList() {
  const str = getLocalStorageData('books');
  if (str) return convertStringToArray(str);

  return [];
}

function setLocalStorageBookList() {
  setLocalStorageData('books', convertArrayToString(bookList));
}

function convertArrayToString(array) {
  return JSON.stringify(array); 
}

function convertStringToArray(string) {
  return JSON.parse(string);
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
  return new Blob([str]).size;
}

function getRemainingLocalStorageSpace() {
  // 5mb
  const storageLimit = 5000000;

  return storageLimit - byteSize(JSON.stringify(window.localStorage));
}