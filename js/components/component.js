export default class Component extends HTMLElement {
  style = document.createElement('style');
  template = document.createElement('template');
  
  constructor (style, template) {
    super();

    // Shadow DOM
    this.attachShadow(
      { 
        mode: 'open'
      }
    );

    this.style.innerHTML = style || /*css*/`
      h1 {
        color: red;
      }
    `;

    this.template.innerHTML = template || /*html*/`
      <slot></slot>
    `;
    
    this.shadowRoot.appendChild(this.template.content.cloneNode(true));
    this.shadowRoot.appendChild(this.style);
  }

  // Consts
  set style (styleElement) { return; }
  set templateElement (templateElement) { return; }
}