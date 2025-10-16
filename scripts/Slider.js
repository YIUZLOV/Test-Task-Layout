class Slider {
  selectors = {
    root: '[data-js-slider]',
    sliderList: '[data-js-slider-list]',
    sliderItems: '[data-js-slider-item]',
    sliderControlPrev: '[data-js-slider-control-prev]',
    sliderControlNext: '[data-js-slider-control-next]',
  }

  currentIndex = 0
  isTouching = false
  startX = 0
  currentX = 0

  constructor () {
    this.rootElement = document.querySelector(this.selectors.root)
    this.sliderList = this.rootElement.querySelector(this.selectors.sliderList)
    this.sliderItems = this.rootElement.querySelectorAll(this.selectors.sliderItems)
    this.sliderControlPrev = this.rootElement.querySelector(this.selectors.sliderControlPrev)
    this.sliderControlNext = this.rootElement.querySelector(this.selectors.sliderControlNext)
    this.bindEvents()
    this.addResizeListener()
  }

  addResizeListener() {
    window.addEventListener('resize', () => {
      this.currentIndex = 0
      this.updatePosition()
    });
  }

  updatePosition() {
    const itemWidth = window.innerWidth + 18
    this.sliderList.style.transform = `translateX(-${this.currentIndex * itemWidth}px)`
  }

  goToNext() {
    if (this.currentIndex < this.sliderItems.length - 1) {
      this.currentIndex++
      this.updatePosition()
    }
  }

  goToPrev() {
    if (this.currentIndex > 0) {
      this.currentIndex--
      this.updatePosition()
    }
  }

  handleTouchStart(e) {
    this.isTouching = true;
    this.startX = e.touches[0].clientX
  }

  handleTouchMove(e) {
    if (this.isTouching) {
      this.currentX = e.touches[0].clientX
    }
  }

  handleTouchEnd() {
    if (this.isTouching) {
      const diff = this.startX - this.currentX
      if (Math.abs(diff) > 50) {
        if (diff > 0) {
          this.goToNext()
        } else { 
          this.goToPrev()
        }
      }
      this.isTouching = false
    }
  }


  bindEvents() {
    this.sliderControlPrev.addEventListener('click', () => this.goToPrev())
    this.sliderControlNext.addEventListener('click', () => this.goToNext())

    // Сенсорное управление
    this.sliderList.addEventListener('touchstart', this.handleTouchStart.bind(this))
    this.sliderList.addEventListener('touchmove', this.handleTouchMove.bind(this))
    this.sliderList.addEventListener('touchend', this.handleTouchEnd.bind(this))
  }
}

export default Slider