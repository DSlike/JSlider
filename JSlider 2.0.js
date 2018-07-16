// jslider = (parentElement, userSettings) => {

  // const _defaultSettings = {
  //   showElements:1,
  //   scrollElements:1,
  //   rowsCount:1,
  //   animSpeed:500,
  //   infinite:false,
  //   centered:false,
  //   startSlide:0,
  //   currentSlideClass:'jslider-current',
  //   previousButton:'.jslider-prev',
  //   nextButton:'.jslider-next',
  //   scrollDots:false,
  //   lazyLoad:false,
  //   autoPlay:false,
  //   autoPlaySpeed:1000,
  //   variableWidth:false,
  //   highlightCurrent:true,
  //   touch:true,
  //   turn:'on'
  // };
  //
  // let _settings = _defaultSettings;
  //
  // if(userSettings)
  //   userSettings.map((e,i)=>{
  //     _settings[e] = userSettings[e];
  //   });
// }

class JSlider{
  constructor(parentElement, userSettings){
    this._defaultSettings = {
      showElements:1,
      scrollElements:1,
      rowsCount:1,
      animSpeed:500,
      infinite:false,
      centered:false,
      startSlide:0,
      currentSlideClass:'jslider-current',
      previousButton:'.jslider-prev',
      nextButton:'.jslider-next',
      scrollDots:false,
      lazyLoad:false,
      autoPlay:false,
      autoPlaySpeed:1000,
      variableWidth:false,
      highlightCurrent:true,
      touch:true,
      turn:'on'
    };

    this._settings = this._defaultSettings;
    this.mainElement = parentElement;
    console.log(this);

    this.updateSettings(userSettings);
    this.prepareHTMLStructure();
  }
  updateSettings(userSettings){
    if(userSettings)
      Object.keys(userSettings).map((e,i)=>{
        this._settings[e] = userSettings[e];
      });
  }
  prepareHTMLStructure(){
    let elements = document.getElementById(this.mainElement).innerHTML;
    document.getElementById(this.mainElement).innerHTML = `
      <div class="jslider-track">${elements}</div>
    `;
    console.log(document.getElementById(this.mainElement).children[0].children);
      // document.getElementById(this.mainElement).innerHTML = elements;
  }
}
