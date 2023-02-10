function getModalNode(hasHeader = true, hasFooter = true) {
  const modalNode = document.createElement("dialog");
  modalNode.classList.add("modal");

  const modalContent = document.createElement("div");
  modalContent.classList.add("modal__content");

  // Header

  if (hasHeader) {
    const modalHeader = document.createElement("div");
    modalHeader.classList.add("modal__header");
    modalContent.appendChild(modalHeader);
  }

  // Body

  const modalBody = document.createElement("div");
  modalBody.classList.add("modal__body");
  modalContent.appendChild(modalBody);

  // Footer

  if (hasFooter) {
    const modalFooter = document.createElement("div");
    modalFooter.classList.add("modal__header");
    modalContent.appendChild(modalFooter);
  }

  modalNode.appendChild(modalContent);

  return modalNode;
}

export default getModalNode;
