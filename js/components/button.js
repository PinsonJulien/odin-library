import Component from "../components/component.js";

export default class Button extends Component {
  onClick = (e) => null;
  
  constructor() {
    super (
      /*css*/`
        button {
          cursor: pointer;
          background-color: inherit;
          width: 100%;
          height: 100%;
          border: inherit;
          border-radius: inherit;
          color: inherit;
          font-size: inherit;
        }
      `,
      /*html*/`
        <button part="button">
          <slot></slot>
        </button>
      `
    );
    this.shadowRoot.addEventListener("click", (e) => this.onClick(e));
  }

  set onClick (onClick) {
    this.onClick = onClick;
  }
}