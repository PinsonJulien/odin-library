export default class Book {
  title = "";
  author = "";
  pages = "";
  read = false;
  
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }
}