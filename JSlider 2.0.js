jslider = (parentElement, userSettings) => {

  const _defaultSettings = {
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

  let _settings = _defaultSettings;

  if(userSettings)
    userSettings.map((e,i)=>{
      _settings[e] = userSettings[e];
    });

  

  console.log(parentElement.children);
}
