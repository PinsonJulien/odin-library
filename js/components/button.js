import Component from "../components/component.js";

export default class Button extends Component {
  onClick = (e) => null;
  
  constructor() {
    super (
      /*css*/`
        button {
          cursor: pointer;
        }
      `,
      /*html*/`
        <button>
          <slot></slot>
        </button>
      `
    );
    
    this.parent.addEventListener("click", (e) => this.onClick(e));
  }

  set onClick (onClick) {
    this.onClick = onClick;
  }
}