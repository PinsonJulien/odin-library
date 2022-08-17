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

addNewBookCard(new Book("1984", "George Orwell", 376, true));
addNewBookCard(new Book("Industrial Society and Its Future", "Theodore John Kaczynski", 162, false))

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

  addNewBookCard(new Book(title, author, pages, read));
  
  // Hide the modal and reset the form.
  modal.toggle(false);
  form.reset();
});

function addNewBookCard (book) {
  const bookCard = new BookCard(book);

  bookCard.addEventListener('removed', (e) => {
    books.removeChild(e.target);
  })

  books.append(bookCard);
}