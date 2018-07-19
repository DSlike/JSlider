class JSlider {
  constructor(parentElement, userSettings) {
    this.version = 2.0;
    this._defaultSettings = {
      showElements: 1,
      rowsCount: 1,
      infinite: false,
      centered: false,
      startSlide: 1,
      currentSlideClass: 'jslider-current',
      previousButton: '#jslider-prev',
      nextButton: '#jslider-next',
      scrollDots: false,
      autoPlay: false,
      autoPlaySpeed: 1000,
      variableWidth: false,
      spotlightCurrent: true,
      touch: true,
      isPlaying: false
    };

    this.touchStart = 0;
    this.touchEnd = 0;

    this._settings = this._defaultSettings;
    this.mainElement = document.querySelector(parentElement);
    this.parentElementName = parentElement;

    this.updateSettings(userSettings);

    this.prepareHTMLStructure();
    this.currentSlide = this._settings.startSlide - 1;
    this.scrollTo();

    /* SLIDER AUTOPLAY */
    this._settings.autoPlay && this.initAutoPlay();
  }
  updateSettings(userSettings) {
    if (userSettings)
      Object.keys(userSettings).map((e, i) => {
        this._settings[e] = userSettings[e];
      });
  }
  /* PREPARE BASIC HTML STRUCTURE FOR SLIDER */
  prepareHTMLStructure() {
    this.mainElement.className += ' jslider';
    for (let i = 0; i < this.mainElement.children.length; i++) {
      this.mainElement.children[i].className += " jslider-slide";
    }
    let elements = this.mainElement.innerHTML;

    this.mainElement.innerHTML = `
      <div class="jslider-track">${elements}</div>
    `;

    this.trackElement = this.mainElement.children[0];
    this.slidesCount = this.trackElement.children.length;
    this.slidesCount = Math.ceil(this.trackElement.children.length / this._settings.rowsCount)
    this.styleElements();
    this._settings.scrollDots && this.addScrollDots();
    this.initSliderResizeEvent();
    this.initArrowButtons();
    this._settings.touch == true && this.initTouchEvents();
    this._settings.scrollDots == true && this.initScrollDots();


  }
  /* CHECK SLIDE INDEX AND FIX IT */
  fixSlideIndex() {
    let index = this.currentSlide;
    if (index >= 0) {
      if (this._settings.infinite) {
        if (this._settings.centered) {
          if (index > this.slidesCount - 1) index = 0;
        } else {
          if (index > this.slidesCount - this._settings.showElements)
            index = 0;
        }
      } else {
        if (this._settings.centered) {
          if (index > this.slidesCount - 1)
            index = this.slidesCount - 1;
        } else {
          if (index > this.slidesCount - this._settings.showElements)
            index = this.slidesCount - this._settings.showElements;
        }
      }
    } else {
      if (this._settings.infinite) {
        if (this._settings.centered) {
          index = this.slidesCount - 1;
        } else {
          index = this.slidesCount - this._settings.showElements;
        }
      } else {
        index = 0;
      }
    }
    this.currentSlide = index;
  }
  /* ADD SCROLL DOTS NEAR SLIDER */
  addScrollDots() {
    let dots = `<div class="jslider-dots">`;
    const dotsCount = this._settings.centered == false ?
      Math.floor(this.slidesCount / this._settings.showElements) * this._settings.showElements :
      this.slidesCount;
    for (let i = 0; i < dotsCount; i++) {
      dots += `<button class="jslider-dot" data-slide="${i}"></button>`;
    }
    dots += '</div>';
    this.mainElement.innerHTML += dots;
    this.trackElement = this.mainElement.children[0];
  }
  /* SET HEIGHT AND WIDTH OF TRACK AND SLIDER */
  styleElements() {
    this.sliderWidth = this.mainElement.offsetWidth;
    this.slideWidth = this.sliderWidth / this._settings.showElements;
    for (let i = 0; i < this.trackElement.children.length; i++) {
      this.trackElement.children[i].style.width = this.slideWidth;
    }
    this.trackElement.style.width = Math.ceil(this.trackElement.children.length / this._settings.rowsCount) * this.slideWidth + 100;
    this.mainElement.style.height = this.trackElement.offsetHeight;
  }
  /* ADD SPOTLIGHT CLASSES TO CURRENT SLIDE AND SCROLLING DOT */
  spotlightCurrentElements() {
    const self = this;

    /* SCROLLING DOTS */
    if (this._settings.scrollDots == true) {
      let dots = document.querySelectorAll(`${this.parentElementName} .jslider-dot`);

      [].forEach.call(dots, function(el, i) {
        i != self.currentSlide ?
          el.classList.remove("active") :
          el.classList.add('active');
      });
    }

    /* SPOTLIGHT CURRENT SLIDE */
    if (this._settings.spotlightCurrent == true) {
      let slides = document.querySelectorAll(`${this.parentElementName} .jslider-slide`);

      [].forEach.call(slides, function(el, i) {
        i != self.currentSlide ?
          el.classList.remove(self._settings.currentSlideClass) :
          el.classList.add(self._settings.currentSlideClass);
        i != self.currentSlide ?
          el.classList.remove('active') :
          el.classList.add('active');
      });
    }
  }
  /* SCROLL TO SLIDE */
  scrollTo() {
    this.fixSlideIndex();
    let trackPosition = 0 - this.slideWidth * (this.currentSlide);

    if (this._settings.centered == true) {
      trackPosition = (this.sliderWidth / 2) - this.slideWidth * this.currentSlide - this.slideWidth / 2;
    }

    this.trackElement.style.left = trackPosition;

    this.spotlightCurrentElements();
  }
  /* DETECT SLIDER SIZE CHANGES*/
  initSliderResizeEvent() {
    const self = this;
    window.addEventListener('resize', (e) => {
      self.styleElements();
      self.scrollTo();
    })
  }
  /* INIT AUTOPLAY EVENT */
  initAutoPlay() {
    this._settings.isPlaying = true;
    setInterval((e) => {
      if (this._settings.isPlaying == true) {
        this.currentSlide++;
        this.scrollTo();
      }
    }, this._settings.autoPlaySpeed);
  }
  /* TOUCH AND CLICK EVENTS */
  initArrowButtons() {
    const self = this;
    document.querySelector(self._settings.previousButton).addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();

      self.currentSlide--;
      self.scrollTo();
    });
    document.querySelector(self._settings.nextButton).addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();

      self.currentSlide++;
      self.scrollTo();
    });
  }
  initScrollDots() {
    const self = this;

    let dots = document.querySelectorAll(`${this.parentElementName} .jslider-dot`);

    [].forEach.call(dots, function(el, i) {
      el.addEventListener("click", (e) => {
        self.currentSlide = parseInt(e.target.dataset.slide);
        self.scrollTo();
      })
    });
  }
  initTouchEvents() {
    for (let i = 0; i < this.slidesCount; i++) {
      document.querySelectorAll('.jslider-slide')[i].addEventListener("touchstart", (e) => {
        this.touchStart = e.touches[0].clientX;
        this.touch = true;
      }, supportsPassive ? {
        passive: true
      } : false);
      document.querySelectorAll('.jslider-slide')[i].addEventListener("touchend", (e) => {
        this.touchEnd = 0;
        this.touch = false;
      }, supportsPassive ? {
        passive: true
      } : false);
      document.querySelectorAll('.jslider-slide')[i].addEventListener("touchmove", (e) => {
        try {
          if (this.touch == true) {
            this.touchEnd = this.touchStart - e.touches[0].clientX;
            if (Math.abs(this.touchEnd) >= this.slideWidth / 2) {
              this.touchEnd < 0 ? this.currentSlide-- : this.currentSlide++;
              this.touch = false;
            }
          }
        } catch (e) {}
        this.scrollTo();
      }, supportsPassive ? {
        passive: true
      } : false);
    }
  }
}
/* CHECK BROWSER SUPPORT FOR PASSIVE EVENT LISTENERS */
let supportsPassive = false;
try {
  let opts = Object.defineProperty({}, 'passive', {
    get: function() {
      supportsPassive = true;
    }
  });
  window.addEventListener("testPassive", null, opts);
  window.removeEventListener("testPassive", null, opts);
} catch (e) {}
