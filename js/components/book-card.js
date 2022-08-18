import Component from "../components/component.js";
import Button from "../components/button.js";
import Book from "../models/book.js";

export default class BookCard extends Component {
  book = new Book();

  titleElement;
  authorElement;
  pagesElement;
  readButton;
  removeButton;

  constructor(book) {
    super (
      /*css*/`
        .container {
          display: grid;
          grid-template-columns: 1fr;
          grid-template-rows: repeat(5, 1fr);
          padding: 1em 2em 1em 2em;
          gap: 1em;
          background-color: var(--neutral-100);
          border-radius: 15px;
          font-size: 1.2em;
          font-weight: 500;
          text-align: center;
          box-shadow: 3px 3px 0px var(--neutral-300);
        }

        p {
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
        }

        #read-button {
          background-color: var(--red-300);
        }

        #read-button:hover {
          background-color: var(--red-400);
        }

        button-component {
          border-radius: 15px;
          background-color: var(--neutral-200);
        }

        button-component.read {
          background-color: var(--green-300) !important;
        }

        button-component.read:hover {
          background-color: var(--green-400) !important;
        }
        
      `,
      /*html*/`
        <div class="container" part="card">
          <p class="title"></p>
          <p>
            by <span class="author"></span>
          </p>
          <p>
            <span class="pages"></span> pages
          </p>

        </div>
      `
    );

    this.book = new Proxy(book, {
      set: (target, prop, value) => {
        target[prop] = value;

        switch(prop) {
          case 'title':
            this.refreshTitle();
            break;
          case 'author':
            this.refreshAuthor();
            break;
          case 'pages':
            this.refreshPages();
            break;
          case 'read':
            this.refreshRead();
            break;
        }

        return true;
      }
    });

    this.titleElement = this.shadowRoot.querySelector(".title");
    this.authorElement = this.shadowRoot.querySelector(".author");
    this.pagesElement = this.shadowRoot.querySelector(".pages");

    this.readButton = new Button();
    this.readButton.setAttribute('id', 'read-button')
    this.readButton.onClick = () => {
      this.book.read = !this.book.read;
    }

    this.removeButton = new Button();
    this.removeButton.innerHTML = `Remove`;
    this.removeButton.onClick = () => {
      this.dispatchEvent(new Event('removed'));
    }

    this.shadowRoot
      .querySelector('.container')
      .append(
        this.readButton, 
        this.removeButton
      );
    
    this.refreshAll();
  }

  refreshTitle() {
    this.titleElement.textContent = this.book.title;
  }

  refreshAuthor() {
    this.authorElement.textContent = this.book.author;
  }

  refreshPages() {
    this.pagesElement.textContent = this.book.pages;
  }

  refreshRead() {
    const read = this.book.read;
    this.readButton.textContent = (read) ? "Read" : "Not read";
    
    const classList = this.readButton.classList;
    if (read) {
      classList.add("read");
    } else {
      classList.remove("read");
    }
  }

  refreshAll() {
    this.refreshTitle();
    this.refreshAuthor();
    this.refreshPages();
    this.refreshRead();
  }
}