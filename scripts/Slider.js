class Slider {
  selectors = {
    root: '[data-js-slider]',
    sliderList: '[data-js-slider-list]',
    sliderItems: '[data-js-slider-item]',
    sliderControlPrev: '[data-js-slider-control-prev]',
    sliderControlNext: '[data-js-slider-control-next]',
  }

  currentIndex = 0

  constructor () {
    this.rootElement = document.querySelector(this.selectors.root)
    this.sliderList = this.rootElement.querySelector(this.selectors.sliderList)
    this.sliderItems = this.rootElement.querySelectorAll(this.selectors.sliderItems)
    this.sliderControlPrev = this.rootElement.querySelector(this.selectors.sliderControlPrev)
    this.sliderControlNext = this.rootElement.querySelector(this.selectors.sliderControlNext)
    this.bindEvents()
    this.addResizeListener()
    this.addTouchEvents();
  }

  addResizeListener() {
    window.addEventListener('resize', () => {
      this.currentIndex = 0
      this.updatePosition()
    });
  }

  updatePosition() {
    const itemWidth = window.innerWidth + 18;
    this.sliderList.style.transform = `translateX(-${this.currentIndex * itemWidth}px)`
    this.sliderList.style.transition = `transform ${this.swipeSpeed}ms ease`
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


  bindEvents() {
    this.sliderControlPrev.addEventListener('click', () => this.goToPrev())
    this.sliderControlNext.addEventListener('click', () => this.goToNext())
  }

  addTouchEvents() {
    this.sliderList.addEventListener('touchstart', (e) => {
      this.isTouching = true;
      this.startX = e.touches[0].clientX;
    });

    this.sliderList.addEventListener('touchend', (e) => {
      this.isTouching = false;
      const endX = e.changedTouches[0].clientX;
      
      if (this.startX > endX + 50) { // свайп вправо
        this.goToNext();
      } else if (this.startX < endX - 50) { // свайп влево
        this.goToPrev();
      }
    });
  }
}

export default Slider