class JSlider {
  constructor(parentElement, userSettings) {
    this._defaultSettings = {
      showElements: 1,
      scrollElements: 1,
      rowsCount: 1,
      infinite: false,
      centered: false,
      startSlide: 0,
      currentSlideClass: 'jslider-current',
      previousButton: 'jslider-prev',
      nextButton: 'jslider-next',
      scrollDots: false,
      lazyLoad: false,
      autoPlay: false,
      autoPlaySpeed: 1000,
      variableWidth: false,
      highlightCurrent: true,
      touch: true,
      turn: 'on'
    };

    this.touchStart = 0;
    this.touchEnd = 0;

    this._settings = this._defaultSettings;
    this.mainElement = document.getElementById(parentElement);

    this.updateSettings(userSettings);
    this.prepareHTMLStructure();
    this.currentSlide = this._settings.startSlide - 1;
    this.scrollTo(this._settings.currentSlide);
    this.initControls();
    this._settings.touch == true && this.initTouchEvents();
  }
  updateSettings(userSettings) {
    if (userSettings)
      Object.keys(userSettings).map((e, i) => {
        this._settings[e] = userSettings[e];
      });
  }
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

    this.styleElements();
  }
  styleElements() {
    this.sliderWidth = this.mainElement.offsetWidth;
    this.slideWidth = this.sliderWidth / this._settings.showElements;
    for (let i = 0; i < this.trackElement.children.length; i++) {
      this.trackElement.children[i].style.width = this.slideWidth;
    }
    this.trackElement.style.width = this.trackElement.children.length * this.slideWidth;
    this.mainElement.style.height = this.trackElement.offsetHeight;
  }
  scrollTo(slideNumber) {
    this.trackElement.style.left = 0 - this.slideWidth * (slideNumber);
  }
  initControls() {
    const self = this;
    document.getElementById(self._settings.previousButton).addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();

      if (self._settings.infinite == true)
        self.currentSlide = self.currentSlide - 1 < 0 ?
          self.slidesCount - this._settings.showElements : self.currentSlide - 1;
      else if (self._settings.infinite == false)
        self.currentSlide = self.currentSlide - 1 < 0 ?
          0 : self.currentSlide - 1;
      self.scrollTo(self.currentSlide);
    });
    document.getElementById(self._settings.nextButton).addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();

      if (self._settings.infinite == true)
        self.currentSlide = self.currentSlide + 1 == self.slidesCount-1 ?
          0 : self.currentSlide + 1;
      else if (self._settings.infinite == false)
        self.currentSlide = self.currentSlide + 1 >= self.slidesCount-this._settings.showElements ?
          self.slidesCount-this._settings.showElements : self.currentSlide + 1;
      self.scrollTo(self.currentSlide);
    });
  }
  initTouchEvents(){
    for(let i=0; i<this.slidesCount; i++){
      document.getElementsByClassName('jslider-slide')[i].addEventListener("touchstart", (e) => {
        this.touchStart = e.touches[0].clientX;
        this.touch = true;
      });
      document.getElementsByClassName('jslider-slide')[i].addEventListener("touchend", (e) => {
        this.touchEnd = 0;
        this.touch = false;
      });
      document.getElementsByClassName('jslider-slide')[i].addEventListener("touchmove", (e) => {
        try{
          if(this.touch == true){
            this.touchEnd = this.touchStart - e.touches[0].clientX;
            console.log(Math.abs(this.touchEnd), this.slideWidth/2);
            if(Math.abs(this.touchEnd) >= this.slideWidth/2){
              this.touchEnd < 0 ? this.currentSlide-- : this.currentSlide++;
              this.touch = false;
            }
          }
        } catch (e) {}
        if(this._settings.infinite == true){
          if(this.currentSlide < 0) this.currentSlide=this.slidesCount-this._settings.showElements;
          if(this.currentSlide > this.slidesCount-this._settings.showElements) this.currentSlide=0;
        } else {
          if(this.currentSlide < 0) this.currentSlide=0;
          if(this.currentSlide > this.slidesCount-this._settings.showElements) this.currentSlide=this.slidesCount-this._settings.showElements;
        }
        this.scrollTo(this.currentSlide);
      });
    }
  }
}
