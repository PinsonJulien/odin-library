import Component from "../components/component.js";
import Button from "../components/button.js";

export default class BookCard extends Component {
  onClick = (e) => null;
  title = "";
  author = "";
  read = false;
  pages = 0;

  titleElement;
  authorElement;
  pagesElement;
  readButton;
  removeButton;

  constructor(title, author, pages, read) {
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

        #read-button {
          background-color: var(--red-300);
        }

        #read-button:hover {
          background-color: var(--red-400);
        }

        button-component {
          border-radius: 15px;
          background-color: var(--neutral-200)
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

    this.titleElement = this.shadowRoot.querySelector(".title");
    this.authorElement = this.shadowRoot.querySelector(".author");
    this.pagesElement = this.shadowRoot.querySelector(".pages");

    this.readButton = new Button();
    this.readButton.setAttribute('id', 'read-button')
    this.readButton.onClick = () => {
      this.setRead(!this.read);
    }

    this.removeButton = new Button();
    this.removeButton.innerHTML = `Remove`;

    this.shadowRoot
      .querySelector('.container')
      .append(
        this.readButton, 
        this.removeButton
      );

    this.setTitle(title);
    this.setAuthor(author);
    this.setPages(pages);
    this.setRead(read);
  }

  set title (title) { this.setTitle(title); }
  set author (author) { this.setAuthor(author); }
  set pages (pages) { this.setPages(pages); }
  set read (read) { this.setRead(read); }

  setTitle(title) {
    this.title = title;
    this.titleElement.textContent = title;
  }

  setAuthor(author) {
    this.author = author;
    this.authorElement.textContent = author;
  }

  setPages(pages) {
    this.pages = pages;
    this.pagesElement.textContent = pages;
  }

  setRead(read) {
    this.read = read;
    this.readButton.textContent = (read) ? "Read" : "Not read";
    
    const classList = this.readButton.classList;
    if (read) {
      classList.add("read");
    } else {
      classList.remove("read");
    }
  }
}