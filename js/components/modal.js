import Component from "../components/component.js";

export default class Modal extends Component {
  modal;

  constructor() {
    super (
      /*css*/`
        .modal {
          display: none;
          position: fixed;
          z-index: 999;
          left: 0;
          top: 0;
          width: 100vw;
          height: 100vh;
          overflow: auto;
        }

        .modal-content {
          margin: auto;
          max-width: 100%;
          max-height: 100%;
          align-self: center;
        }
      `,
      /*html*/`
        <div class="modal">
          <div class="modal-content">
            <slot></slot>
          </div>
        </div>
      `
    );
    
    this.modal = this.shadowRoot.querySelector('.modal');
    // Hide the modal when not clicking on content.
    this.modal.addEventListener("click", (e) => {
      if (e.target === this.modal) {
        this.toggle(false);
      }
    });
  }

  toggle (active) {
    this.modal.style.display = (active) ? "flex" : "";
  }
}