"use strict";
import Modal from "../js/components/modal.js";
import Button from "../js/components/button.js";

// Custom components definition
customElements.define('modal-component', Modal);
customElements.define('button-component', Button);


const modal = document.getElementById("modal");

const addButton = document.getElementById("add-button");
addButton.onClick = (() => {
  modal.toggle(true);
});