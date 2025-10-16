class Modal {
  selectors = {
    root: '[data-js-body]',
    modalOverlay: '[data-js-modal-overaly]',
    modalButtonOpen: '[data-js-modal-button-open]',
    modalButtonClose: '[data-js-modal-button-close]',
  }

  stateClasses = {
    isShow: 'is-show',
    isOpenModal: 'is-open-modal'
  }

  constructor() {
    this.rootElement = document.querySelector(this.selectors.root)
    this.modalOverlayElement = this.rootElement.querySelector(this.selectors.modalOverlay)
    this.modalButtonOpenElement = this.rootElement.querySelector(this.selectors.modalButtonOpen)
    this.modalButtonCloseElement = this.rootElement.querySelector(this.selectors.modalButtonClose)
    this.bindEvents()
  }

  openModal() {
    this.rootElement.classList.add(this.stateClasses.isOpenModal)
    this.modalOverlayElement.classList.add(this.stateClasses.isShow)
  }

  closeModal() {
    this.rootElement.classList.remove(this.stateClasses.isOpenModal)
    this.modalOverlayElement.classList.remove(this.stateClasses.isShow)
  }


  bindEvents() { 
    this.modalButtonOpenElement.addEventListener('click', () => this.openModal())
    this.modalButtonCloseElement.addEventListener('click', () => this.closeModal())
    this.modalOverlayElement.addEventListener('click', (e) => {
      if (e.target === this.modalOverlayElement) {
        this.closeModal()
      }
    })
  }
}

export default Modal