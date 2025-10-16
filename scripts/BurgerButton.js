class BurgerButton {
  selectors = {
    root: '[data-js-header]',
    headerOverlay: '[data-js-header-overlay]',
    headerMenuItem: '[data-js-header-menu-item]',
    headerBurgerButton: '[data-js-header-burger-button]',
  }

  stateClasses = {
    isActive: 'is-active',
    isShow: 'is-show',
  }

  constructor() {
    this.rootElement = document.querySelector(this.selectors.root)
    this.headerOverlayElement = this.rootElement.querySelector(this.selectors.headerOverlay)
    this.headerMenuItem = this.rootElement.querySelectorAll(this.selectors.headerMenuItem)
    this.headerBurgerButtonElement = this.rootElement.querySelector(this.selectors.headerBurgerButton)
    this.bindEvents()
    
  }

  showMenu() {
    this.headerOverlayElement.classList.toggle(this.stateClasses.isShow)
    this.headerBurgerButtonElement.classList.toggle(this.stateClasses.isActive)
  }

  bindEvents() { 
    this.headerBurgerButtonElement.addEventListener('click', () => {
      this.showMenu()
    })
  }
}

export default BurgerButton