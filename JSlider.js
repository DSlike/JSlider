(function( $ ){

  $.fn.jslider = function( options ) {
    var start = Date.now();
    var _DefSettings = $.extend( {
      showElements:1,
      scrollElements:1,
      rows:1,
      animSpeed:500,
      infinite:false,
      centered:false,
      startSlide:1,
      currentSlideClass:'JSoft-current',
      previousButton:'.prev',
      nextButton:'.next',
      scrollDots:false,
      lazyLoad:false,
      autoPlay:false,
      autoPlaySpeed:1000,
      variableWidth:false
    }, options);

    var _JSSettings = {
      showElements:_DefSettings.showElements,
      scrollElements:_DefSettings.scrollElements,
      rows:_DefSettings.rows,
      animSpeed:_DefSettings.animSpeed,
      infinite:_DefSettings.infinite,
      centered:_DefSettings.centered,
      startSlide:_DefSettings.startSlide,
      currentSlideClass:_DefSettings.currentSlideClass,
      previousButton:_DefSettings.previousButton,
      nextButton:_DefSettings.nextButton,
      scrollDots:_DefSettings.scrollDots,
      lazyLoad:_DefSettings.lazyLoad,
      autoPlay:_DefSettings.autoPlay,
      autoPlaySpeed:_DefSettings.autoPlaySpeed,
      variableWidth:_DefSettings.variableWidth
    }

    var $JSlideScrollElement = $(this);
    var $JSlideTrack = $(this);
    var $JSlides = $(this);
    var slidesCount = 0;
    var zeroSlide = 0;
    var lastSlide = 1;
    var currentSlide = _JSSettings.startSlide;
    var slides = "";

    _JSS_CheckSettings();
    _JSS_Initialization();

    $(window).resize(function(){
      _JSS_CheckSettings();
      _JSS_Resizing();
      _JSS_ReInitialization();
      JSlideScroll(currentSlide, parseInt(_JSSettings.animSpeed));
    });

    if(_JSSettings.autoPlay==true)
      setTimeout(function () {
        JSoftPlay(_JSSettings.autoPlaySpeed);
    }, parseInt(_JSSettings.autoPlaySpeed));

    function _JSS_CheckSettings()
    {
      _DefSettings.responsive.forEach(function(element, index){
        if($(window).width()>=_DefSettings.responsive[index].breakpoint)
        {
          if(_DefSettings.responsive[index].settings.showElements != undefined) _JSSettings.showElements = _DefSettings.responsive[index].settings.showElements;
          if(_DefSettings.responsive[index].settings.scrollElements != undefined) _JSSettings.scrollElements = _DefSettings.responsive[index].settings.scrollElements;
          if(_DefSettings.responsive[index].settings.rows != undefined) _JSSettings.rows = _DefSettings.responsive[index].settings.rows;
          if(_DefSettings.responsive[index].settings.animSpeed != undefined) _JSSettings.animSpeed = _DefSettings.responsive[index].settings.animSpeed;
          if(_DefSettings.responsive[index].settings.infinite != undefined) _JSSettings.infinite = _DefSettings.responsive[index].settings.infinite;
          if(_DefSettings.responsive[index].settings.centered != undefined) _JSSettings.centered = _DefSettings.responsive[index].settings.centered;
          if(_DefSettings.responsive[index].settings.startSlide != undefined) _JSSettings.startSlide = _DefSettings.responsive[index].settings.startSlide;
          if(_DefSettings.responsive[index].settings.currentSlideClass != undefined) _JSSettings.currentSlideClass = _DefSettings.responsive[index].settings.currentSlideClass;
          if(_DefSettings.responsive[index].settings.previousButton != undefined) _JSSettings.previousButton = _DefSettings.responsive[index].settings.previousButton;
          if(_DefSettings.responsive[index].settings.nextButton != undefined) _JSSettings.nextButton = _DefSettings.responsive[index].settings.nextButton;
          if(_DefSettings.responsive[index].settings.scrollDots != undefined) _JSSettings.scrollDots = _DefSettings.responsive[index].settings.scrollDots;
          if(_DefSettings.responsive[index].settings.lazyLoad != undefined) _JSSettings.lazyLoad = _DefSettings.responsive[index].settings.lazyLoad;
          if(_DefSettings.responsive[index].settings.autoPlay != undefined) _JSSettings.autoPlay = _DefSettings.responsive[index].settings.autoPlay;
          if(_DefSettings.responsive[index].settings.autoPlaySpeed != undefined) _JSSettings.autoPlaySpeed= _DefSettings.responsive[index].settings.autoPlaySpeed;
          if(_DefSettings.responsive[index].settings.variableWidth != undefined) _JSSettings.variableWidth = _DefSettings.responsive[index].settings.variableWidth;
        }
        else if($(window).width()<_DefSettings.responsive[0].breakpoint)
        {
          _JSSettings.showElements = _DefSettings.showElements;
          _JSSettings.scrollElements = _DefSettings.scrollElements;
          _JSSettings.rows = _DefSettings.rows;
          _JSSettings.animSpeed = _DefSettings.animSpeed;
          _JSSettings.infinite = _DefSettings.infinite;
          _JSSettings.centered = _DefSettings.centered;
          _JSSettings.startSlide = _DefSettings.startSlide;
          _JSSettings.currentSlideClass = _DefSettings.currentSlideClass;
          _JSSettings.previousButton = _DefSettings.previousButton;
          _JSSettings.nextButton = _DefSettings.nextButton;
          _JSSettings.scrollDots = _DefSettings.scrollDots;
          _JSSettings.lazyLoad = _DefSettings.lazyLoad;
          _JSSettings.autoPlay = _DefSettings.autoPlay;
          _JSSettings.autoPlaySpeed= _DefSettings.autoPlaySpeed;
          _JSSettings.variableWidth = _DefSettings.variableWidth;
        }
      });

      if(_JSSettings.variableWidth==true)
      {
        _JSSettings.centered=true;
      }
      if(_JSSettings.centered==true)
      {
        _JSSettings.infinite=true;
        _JSSettings.scrollElements=1;
      }
      if(_JSSettings.infinite==true)
      {
        _JSSettings.scrollDots=false;
      }
    }

    function _JSS_Initialization()
    {
      slides = $JSlideScrollElement.html();
      $JSlideScrollElement.addClass("jsoft-slider");
      $JSlideScrollElement.html('<div class="jslider-track"></div>');
      $JSlideTrack = $JSlideScrollElement.children('.jslider-track');
      $JSlideTrack.html(slides);

      $JSlideTrack.children().each(function(index, element){
        $(element).addClass("jslider-slide");
        slidesCount++;
      });

      if(slidesCount<=_JSSettings.showElements*_JSSettings.rows)
      {
        $(".dots-wrapper").fadeOut();
        $(_JSSettings.previousButton).fadeOut();
        $(_JSSettings.nextButton).fadeOut();
      }
      else {
        $(".dots-wrapper").fadeIn();
        $(_JSSettings.previousButton).fadeIn();
        $(_JSSettings.nextButton).fadeIn();
      }

      if(_JSSettings.infinite == true)
      {
        var copySlides = $JSlideTrack.html();
        $JSlideTrack.append(copySlides);
        $JSlideTrack.prepend(copySlides);
        copySlides = $JSlideTrack.width();
      }

      lastSlide = slidesCount - _JSSettings.showElements;
      lastSlide /= parseInt(_JSSettings.rows);
      if(_JSSettings.infinite==true)
      {
        zeroSlide = slidesCount;
        lastSlide+=slidesCount;
        currentSlide+=slidesCount;
      }
      $JSlides = $JSlideTrack.children(".jslider-slide");
      lastSlide = parseInt(lastSlide.toFixed());
      if(_JSSettings.rows>1)
        lastSlide--;
      _JSS_Resizing();
      if(_JSSettings.scrollDots==true)
        CreateDots($JSlideScrollElement);
      JSlideScroll(currentSlide, 0);
    }

    function _JSS_ReInitialization()
    {
      $JSlideScrollElement.html('<div class="jslider-track"></div>');
      $JSlideTrack = $JSlideScrollElement.children('.jslider-track');
      $JSlideTrack.html(slides);

      $JSlideTrack.children().each(function(index, element){
        $(element).addClass("jslider-slide");
        slidesCount++;
      });

      if(slidesCount<=_JSSettings.showElements*_JSSettings.rows)
      {
        $(".dots-wrapper").fadeOut();
        $(_JSSettings.previousButton).fadeOut();
        $(_JSSettings.nextButton).fadeOut();
      }
      else {
        $(".dots-wrapper").fadeIn();
        $(_JSSettings.previousButton).fadeIn();
        $(_JSSettings.nextButton).fadeIn();
      }

      if(_JSSettings.infinite == true)
      {
        var copySlides = $JSlideTrack.html();
        $JSlideTrack.append(copySlides);
        $JSlideTrack.prepend(copySlides);
        copySlides = $JSlideTrack.width();
      }

      lastSlide = slidesCount - _JSSettings.showElements;
      lastSlide /= parseInt(_JSSettings.rows);
      if(_JSSettings.infinite==true)
      {
        zeroSlide = slidesCount;
        lastSlide=slidesCount*2-parseInt(_JSSettings.showElements);
      }
      else {
        zeroSlide=0;
        lastSlide=slidesCount*2;
      }
      $JSlides = $JSlideTrack.children(".jslider-slide");
      lastSlide = parseInt(lastSlide.toFixed());
      console.log(lastSlide);
      console.log(zeroSlide);
      if(_JSSettings.rows>1)
        lastSlide--;
      _JSS_Resizing();
      if(_JSSettings.infinite==false)
      {
        if(currentSlide<=lastSlide)
          JSlideScroll(currentSlide, parseInt(_JSSettings.animSpeed));
        else if(currentSlide>lastSlide)
        {
          $JSlideTrack.children().removeClass("JSoft-current");
          $JSlideTrack.children().eq(currentSlide).addClass("JSoft-current");
        }
        if(currentSlide == lastSlide+parseInt(_JSSettings.showElements))
        {
          currentSlide=zeroSlide;
          JSlideScroll(currentSlide, parseInt(_JSSettings.animSpeed));
        }
      }
      else if(_JSSettings.infinite==true)
      {
        JSlideScroll(currentSlide, parseInt(_JSSettings.animSpeed));
        if(currentSlide==lastSlide+parseInt(_JSSettings.showElements))
        {
          currentSlide=zeroSlide;
          JSlideScroll(currentSlide, 0);
        }
      }
      //if(_JSSettings.scrollDots==true)
      //  CreateDots($JSlideScrollElement);
    }

    function _JSS_Resizing()
    {
      var trackWidth = 0;
      if(_JSSettings.variableWidth==false)
      {
        $JSlides.css("width", $JSlideScrollElement.width() / _JSSettings.showElements);
        trackWidth = slidesCount * $JSlides.outerWidth();
      }
      else if(_JSSettings.variableWidth==true)
      {
        $JSlideTrack.children().each(function(index, element){
          trackWidth+=$JSlideTrack.children().eq(index).outerWidth();
        });
      }
      trackWidth/=_JSSettings.rows;
      if(_JSSettings.infinite==true)
      {
        trackWidth*=3;
      }
      //for safety )
      trackWidth+=500;
      $JSlideTrack.width(trackWidth);
      delete(trackWidth);
    }

    function JSlideScroll(to_element, speed)
    {
      to_element = Math.ceil(to_element);
      var position = $JSlideTrack.children().eq(to_element).position();
      $JSlideTrack.children().removeClass("JSoft-current");
      $JSlideTrack.children().eq(to_element).addClass("JSoft-current");
      var positionLeft = position.left;
      position = $JSlideScrollElement.position();
      var trackPosition = position.left;
      var to = trackPosition-positionLeft;
      if(_JSSettings.centered==true)
      {
        to = to + ($JSlideScrollElement.innerWidth()/2)-($JSlideTrack.children().eq(to_element).outerWidth()/2);
      }
      $JSlideTrack.animate({left:to}, parseInt(speed));
      delete(to);
    }

    function JSoftPlay(speed)
    {
      if(_JSSettings.infinite==false)
      {
        currentSlide+=parseInt(_JSSettings.scrollElements);
        if(currentSlide<=lastSlide)
          JSlideScroll(currentSlide, parseInt(_JSSettings.animSpeed));
        else if(currentSlide>lastSlide)
        {
          $JSlideTrack.children().removeClass("JSoft-current");
          $JSlideTrack.children().eq(currentSlide).addClass("JSoft-current");
        }
        if(currentSlide == lastSlide+parseInt(_JSSettings.showElements))
        {
          currentSlide=zeroSlide;
          JSlideScroll(currentSlide, parseInt(_JSSettings.animSpeed));
        }
      }
      else if(_JSSettings.infinite==true)
      {
        currentSlide+=parseInt(_JSSettings.scrollElements);
        JSlideScroll(currentSlide, parseInt(_JSSettings.animSpeed));
        if(currentSlide==lastSlide+parseInt(_JSSettings.showElements))
        {
          currentSlide=zeroSlide;
          JSlideScroll(currentSlide, 0);
        }
      }
      setTimeout(function () {
        JSoftPlay(speed);
      }, parseInt(speed));
    }

    function CreateDots(parrent_element)
    {
      var dotsCount = Math.ceil((slidesCount)/parseInt(_JSSettings.scrollElements));
      parrent_element.append("<div class=dots-wrapper></div>");
      if(dotsCount>0)
        for(var dot = 0; dot<dotsCount; dot++)
          parrent_element.children(".dots-wrapper").append("<li data-slide="+dot+"></li>");
    }

    //when user click dot
    $JSlideScrollElement.children(".dots-wrapper").children("li").click(function(){
      currentSlide = $(this).attr("data-slide");
      currentSlide = currentSlide*parseInt(_JSSettings.scrollElements);
      if(currentSlide <= lastSlide)
        JSlideScroll(currentSlide, parseInt(_JSSettings.animSpeed));
      else if(currentSlide > lastSlide)
      {
        JSlideScroll(lastSlide, parseInt(_JSSettings.animSpeed));
        $JSlideTrack.children().removeClass("JSoft-current");
        $JSlideTrack.children().eq(currentSlide).addClass("JSoft-current");
      }
      if(currentSlide>=slidesCount/parseInt(_JSSettings.rows))
      {
        currentSlide=zeroSlide;
        JSlideScroll(currentSlide, parseInt(_JSSettings.animSpeed));
      }
    });
    //when user click "prev" button
    $(_JSSettings.previousButton).click(function(){
      if(_JSSettings.infinite==false)
      {
        currentSlide-=parseInt(_JSSettings.scrollElements);
        if(currentSlide<zeroSlide)
        {
          currentSlide=slidesCount;
          JSlideScroll(currentSlide-parseInt(_JSSettings.showElements), parseInt(_JSSettings.animSpeed));
        }
        if(currentSlide>lastSlide)
        {
          $JSlideTrack.children().removeClass("JSoft-current");
          $JSlideTrack.children().eq(currentSlide-1).addClass("JSoft-current");
        }
        else
        {
          JSlideScroll(currentSlide, parseInt(_JSSettings.animSpeed));
        }
      }
      else if(_JSSettings.infinite==true)
      {
        currentSlide-=parseInt(_JSSettings.scrollElements);
        if(currentSlide<zeroSlide)
        {
          JSlideScroll(currentSlide, parseInt(_JSSettings.animSpeed));
          currentSlide+=slidesCount;
          JSlideScroll(currentSlide, 0);
        }
        else
        {
          JSlideScroll(currentSlide, parseInt(_JSSettings.animSpeed));
        }
      }
    });
    // when user click "next" button
    $(_JSSettings.nextButton).click(function(){
      if(_JSSettings.infinite==false)
      {
        currentSlide += parseInt(_JSSettings.scrollElements);
        if(currentSlide <= lastSlide)
          JSlideScroll(currentSlide, parseInt(_JSSettings.animSpeed));
        else if(currentSlide > lastSlide)
        {
          JSlideScroll(lastSlide, parseInt(_JSSettings.animSpeed));
          $JSlideTrack.children().removeClass("JSoft-current");
          $JSlideTrack.children().eq(currentSlide).addClass("JSoft-current");
        }
        if(currentSlide>=slidesCount/parseInt(_JSSettings.rows))
        {
          currentSlide=zeroSlide;
          JSlideScroll(currentSlide, parseInt(_JSSettings.animSpeed));
        }
      }
      else if(_JSSettings.infinite==true)
      {
        currentSlide+=parseInt(_JSSettings.scrollElements);
        JSlideScroll(currentSlide, parseInt(_JSSettings.animSpeed));
        if(currentSlide==lastSlide+parseInt(_JSSettings.showElements))
        {
          currentSlide=zeroSlide;
          JSlideScroll(currentSlide, 0);
        }
      }
    });
    console.log("Congratulations! The JSlider initialized in " + parseInt(Date.now()-start) + " miliseconds");
  };
})( jQuery );
