(function( $ ){

  $.fn.jslider = function( options ) {
    var start = Date.now();
    var _DefSettings = $.extend( {
      showElements:1,
      scrollElements:1,
      rowsCount:1,
      animSpeed:500,
      infinite:false,
      centered:false,
      startSlide:1,
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
    }, options);

    var _JSSettings = {
      showElements:_DefSettings.showElements,
      scrollElements:_DefSettings.scrollElements,
      rowsCount:_DefSettings.rowsCount,
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
      variableWidth:_DefSettings.variableWidth,
      highlightCurrent:_DefSettings.highlightCurrent,
      touch:_DefSettings.touch,
      turn:_DefSettings.turn
    }

    var $JSlideScrollElement = $(this);
    var $JSlideTrack = $(this);
    var $JSlides = $(this);
    var slidesCount = 0;
    var zeroSlide = 0;
    var lastSlide = 1;
    var currentSlide = _JSSettings.startSlide-1;
    var slides = "";
    var touchX = 0;
    var ABSslidesCount = 0;

    _JSS_CheckSettings();
    _JSS_Initialization();
    $(window).resize(function(){
      _JSS_CheckSettings();
      _JSS_ReInitialization();
    });

    if(_JSSettings.autoPlay==true)
      setTimeout(function () {
        JSliderPlay(_JSSettings.autoPlaySpeed);
    }, parseInt(_JSSettings.autoPlaySpeed));

    function _JSS_CheckSettings()
    {
      if(_DefSettings.responsive!=undefined)
      {
      _DefSettings.responsive.forEach(function(element, index){
        if(parseInt($(window).width()+17)>=_DefSettings.responsive[index].breakpoint)
        {
          if(_DefSettings.responsive[index].settings.showElements != undefined) _JSSettings.showElements = _DefSettings.responsive[index].settings.showElements;
          if(_DefSettings.responsive[index].settings.scrollElements != undefined) _JSSettings.scrollElements = _DefSettings.responsive[index].settings.scrollElements;
          if(_DefSettings.responsive[index].settings.rowsCount != undefined) _JSSettings.rowsCount = _DefSettings.responsive[index].settings.rowsCount;
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
          if(_DefSettings.responsive[index].settings.turn != undefined) _JSSettings.turn = _DefSettings.responsive[index].settings.turn;
          if(_DefSettings.responsive[index].settings.highlightCurrent != undefined) _JSSettings.highlightCurrent = _DefSettings.responsive[index].settings.highlightCurrent;
          if(_DefSettings.responsive[index].settings.touch != undefined) _JSSettings.touch = _DefSettings.responsive[index].settings.touch;
        }
        else if(parseInt($(window).width()+17)<_DefSettings.responsive[0].breakpoint)
        {
          _JSSettings.showElements = _DefSettings.showElements;
          _JSSettings.scrollElements = _DefSettings.scrollElements;
          _JSSettings.rowsCount = _DefSettings.rowsCount;
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
          _JSSettings.turn = _DefSettings.turn;
          _JSSettings.highlightCurrent = _DefSettings.highlightCurrent;
          _JSSettings.touch = _DefSettings.touch;
        }
      });
    }

      if(_JSSettings.touch==true)
      {
        _JSSettings.highlightCurrent=false;
      }
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
        _JSSettings.highlightCurrent=true;
      }
      if(_JSSettings.rowsCount > 1)
      {
        _JSSettings.infinite=false;
        _JSSettings.centered=false;
      }
    }

    function _JSS_Initialization()
    {
      slides = $JSlideScrollElement.html();
      if(_JSSettings.turn=="on")
      {
        $JSlideScrollElement.addClass("jslider");
        $JSlideScrollElement.html('<div class="jslider-track"></div>');
        $JSlideTrack = $JSlideScrollElement.children('.jslider-track');
        $JSlideTrack.html(slides);

        $JSlideTrack.children().each(function(index, element){
          $(element).addClass("jslider-slide");
          $(element).attr("data-slide",index);
          slidesCount++;
        });
        ABSslidesCount=slidesCount;
        if(slidesCount % 2 != 0)
        {
          ABSslidesCount=slidesCount+1;
        }
        if(slidesCount<=_JSSettings.showElements*_JSSettings.rowsCount)
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

        lastSlide = (slidesCount / parseInt(_JSSettings.rowsCount)) - _JSSettings.showElements;
        if(_JSSettings.infinite==true)
        {
          zeroSlide = slidesCount;
          lastSlide+=slidesCount;
          currentSlide+=slidesCount;
        }
        $JSlides = $JSlideTrack.children(".jslider-slide");
        lastSlide = Math.floor(lastSlide);
        if(_JSSettings.centered==true)
          lastSlide++;
        _JSS_Resizing();
        if(_JSSettings.scrollDots==true)
          CreateDots($JSlideScrollElement);
        JSlideScroll(currentSlide, 0);
        if(_JSSettings.touch==true)
          touchUX();
      }
    }

    function _JSS_ReInitialization()
    {
      if(_JSSettings.turn=="on")
      {
        $JSlideScrollElement.html('<div class="jslider-track"></div>');
        $JSlideTrack = $JSlideScrollElement.children('.jslider-track');
        $JSlideTrack.html(slides);
        slidesCount=0;
        $JSlideTrack.children().each(function(index, element){
          $(element).addClass("jslider-slide");
          $(element).attr("data-slide",index);
          slidesCount++;
        });

        if(slidesCount<=_JSSettings.showElements*_JSSettings.rowsCount)
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

        lastSlide = (slidesCount / parseInt(_JSSettings.rowsCount)) - _JSSettings.showElements;
        if(_JSSettings.infinite==true)
        {
          zeroSlide = slidesCount;
          lastSlide+=slidesCount;
          if(currentSlide<zeroSlide)
            currentSlide+=slidesCount;
        }
        else if(_JSSettings.infinite==false)
        {
          zeroSlide = 0;
          if(currentSlide>lastSlide+_JSSettings.showElements)
            currentSlide=zeroSlide;
        }
        $JSlides = $JSlideTrack.children(".jslider-slide");
        lastSlide = Math.floor(lastSlide);
        if(_JSSettings.centered==true)
          lastSlide++;
        _JSS_Resizing();
        if(currentSlide<zeroSlide)
          currentSlide += slidesCount;
        else if(currentSlide>=slidesCount)
          currentSlide -= slidesCount;
        if(_JSSettings.infinite==false)
        {
          if(currentSlide<=lastSlide)
            JSlideScroll(currentSlide, 0);
          else if(currentSlide>lastSlide)
          {
            JSlideScroll(lastSlide, 0);
            $JSlideTrack.children().removeClass(_JSSettings.currentSlideClass);
            $JSlideTrack.children().eq(currentSlide-1).addClass(_JSSettings.currentSlideClass);
          }
          else if(currentSlide == lastSlide+parseInt(_JSSettings.showElements))
          {
            currentSlide=zeroSlide;
            JSlideScroll(currentSlide, 0);
          }
        }
        else if(_JSSettings.infinite==true)
        {
          JSlideScroll(currentSlide, 0);
          if(currentSlide==lastSlide+parseInt(_JSSettings.showElements))
          {
            currentSlide=zeroSlide;
            JSlideScroll(currentSlide, 0);
          }
        }
        if(_JSSettings.scrollDots==true)
          CreateDots($JSlideScrollElement);
        $JSlideScrollElement.children(".dots-wrapper").children(".jslider-dot").removeClass("current-dot");
        $JSlideScrollElement.children(".dots-wrapper").children(".jslider-dot[data-slide="+currentSlide+"]").addClass("current-dot");
        if(_JSSettings.touch==true)
          touchUX();
      }
      else if(_JSSettings.turn=="off")
      {
        $JSlideScrollElement.html(slides);
      }
    }

    function _JSS_Resizing()
    {
      var trackWidth = 0;
      if(_JSSettings.variableWidth==false)
      {
        $JSlides.css("width", $JSlideScrollElement.width() / _JSSettings.showElements);
        trackWidth = ABSslidesCount * $JSlides.outerWidth();
        trackWidth+=10;
      }
      else if(_JSSettings.variableWidth==true)
      {
        $JSlideTrack.children().each(function(index, element){
          trackWidth+=$JSlideTrack.children().eq(index).outerWidth();
        });
      }
      trackWidth/=_JSSettings.rowsCount;
      trackWidth = Math.ceil(trackWidth);
      if(_JSSettings.infinite==true)
        trackWidth*=3;
      if(_JSSettings.rowsCount==1)
        trackWidth+=500;
      $JSlideTrack.width(trackWidth);
      delete(trackWidth);
    }

    function JSlideScroll(to_element, speed)
    {
      to_element = Math.ceil(to_element);
      var position = $JSlideTrack.children().eq(to_element).position();
      $JSlideTrack.children().removeClass(_JSSettings.currentSlideClass);
      if(_JSSettings.highlightCurrent==true)
       $JSlideTrack.children().eq(to_element).addClass(_JSSettings.currentSlideClass);
      var positionLeft = position.left;
      position = $JSlideScrollElement.position();
      var trackPosition = position.left;
      var to = trackPosition-positionLeft;
      if(_JSSettings.centered==true)
      {
        to = to + ($JSlideScrollElement.innerWidth()/2)-($JSlideTrack.children().eq(to_element).outerWidth()/2);
      }
      $JSlideTrack.animate({left:to}, parseInt(speed));
      $JSlideScrollElement.children(".dots-wrapper").children(".jslider-dot").removeClass("current-dot");
      $JSlideScrollElement.children(".dots-wrapper").children(".jslider-dot[data-slide="+currentSlide+"]").addClass("current-dot");
      delete(to);
    }

    function JSliderPlay(speed)
    {
      if(_JSSettings.infinite==false)
      {
        currentSlide+=parseInt(_JSSettings.scrollElements);
        if(currentSlide<=lastSlide)
          JSlideScroll(currentSlide, parseInt(_JSSettings.animSpeed));
        else if(currentSlide>lastSlide)
        {
          if(_JSSettings.highlightCurrent==true)
          {
            $JSlideTrack.children().removeClass(_JSSettings.currentSlideClass);
            $JSlideTrack.children().eq(currentSlide).addClass(_JSSettings.currentSlideClass);
          }
          else if(_JSSettings.highlightCurrent==false)
          {
            currentSlide=zeroSlide;
            JSlideScroll(currentSlide, parseInt(_JSSettings.animSpeed));
          }
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
        JSliderPlay(speed);
      }, parseInt(speed));
    }

    function CreateDots(parrent_element)
    {
      var dotsCount = Math.ceil((slidesCount/parseInt(_JSSettings.rowsCount))/_JSSettings.scrollElements);
      if(_JSSettings.highlightCurrent==false)
        dotsCount-=(_JSSettings.showElements-1);
      parrent_element.append("<div class=dots-wrapper></div>");
      parrent_element.children(".dots-wrapper").empty();
      if(dotsCount>0)
        for(var dot = 0; dot<dotsCount; dot++)
          parrent_element.children(".dots-wrapper").append("<li class=jslider-dot data-slide="+dot*parseInt(_JSSettings.scrollElements)+" ><button></button</li>");

      $JSlideScrollElement.children(".dots-wrapper").on('click','.jslider-dot', function(){
        currentSlide = $(this).attr("data-slide");
        if(currentSlide <= lastSlide)
          JSlideScroll(currentSlide, parseInt(_JSSettings.animSpeed));
        else if(currentSlide > lastSlide)
        {
          JSlideScroll(lastSlide, parseInt(_JSSettings.animSpeed));
          $JSlideTrack.children().removeClass(_JSSettings.currentSlideClass);
          if(_JSSettings.highlightCurrent==true)
            $JSlideTrack.children().eq(currentSlide).addClass(_JSSettings.currentSlideClass);
        }
        if(currentSlide>=slidesCount/parseInt(_JSSettings.rowsCount))
        {
          currentSlide=zeroSlide;
          JSlideScroll(currentSlide, parseInt(_JSSettings.animSpeed));
        }
      });
    }
    $(_JSSettings.previousButton).click(function(){
      currentSlide-=parseInt(_JSSettings.scrollElements);
      if(_JSSettings.infinite == false)
      {
        if(currentSlide < zeroSlide)
        {
          if(_JSSettings.highlightCurrent==true)
          {
            currentSlide=lastSlide+_JSSettings.showElements-_JSSettings.scrollElements;
            JSlideScroll(lastSlide, parseInt(_JSSettings.animSpeed));
            $JSlideTrack.children().removeClass(_JSSettings.currentSlideClass);
            $JSlideTrack.children().eq(currentSlide).addClass(_JSSettings.currentSlideClass);
          }
          else if(_JSSettings.highlightCurrent==false)
          {
            currentSlide=lastSlide;
            JSlideScroll(lastSlide, parseInt(_JSSettings.animSpeed));
          }
        }
        else if(currentSlide >= lastSlide)
        {
          currentSlide=lastSlide;
          JSlideScroll(lastSlide, parseInt(_JSSettings.animSpeed));
          $JSlideTrack.children().removeClass(_JSSettings.currentSlideClass);
          if(_JSSettings.highlightCurrent==true)
            $JSlideTrack.children().eq(currentSlide).addClass(_JSSettings.currentSlideClass);
        }
        else if(currentSlide < lastSlide)
        {
          JSlideScroll(currentSlide, parseInt(_JSSettings.animSpeed));
        }
      }
      else if(_JSSettings.infinite==true)
      {
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
    $(_JSSettings.nextButton).click(function(){
      currentSlide =parseInt(currentSlide) + parseInt(_JSSettings.scrollElements);
      if(_JSSettings.infinite==false)
      {
        if(currentSlide < lastSlide)
        {
          JSlideScroll(currentSlide, parseInt(_JSSettings.animSpeed));
        }
        else if(currentSlide>=lastSlide)
        {
          if(_JSSettings.highlightCurrent==true)
          {
            JSlideScroll(lastSlide, parseInt(_JSSettings.animSpeed));
            $JSlideTrack.children().removeClass(_JSSettings.currentSlideClass);
            $JSlideTrack.children().eq(currentSlide).addClass(_JSSettings.currentSlideClass);
          }
          else if(_JSSettings.highlightCurrent==false)
          {
            if(currentSlide==lastSlide)
              JSlideScroll(currentSlide, parseInt(_JSSettings.animSpeed));
            else if(currentSlide>lastSlide)
            {
              currentSlide=zeroSlide;
              JSlideScroll(currentSlide, parseInt(_JSSettings.animSpeed));
            }
          }
        }
        if(currentSlide >= Math.ceil(slidesCount/parseInt(_JSSettings.rowsCount)))
        {
          currentSlide=0;
          JSlideScroll(zeroSlide, parseInt(_JSSettings.animSpeed));
        }
      }
      else if(_JSSettings.infinite==true)
      {
        JSlideScroll(currentSlide, parseInt(_JSSettings.animSpeed));
        if(currentSlide>=lastSlide+parseInt(_JSSettings.showElements))
        {
          currentSlide=zeroSlide;
          JSlideScroll(currentSlide, 0);
        }
      }
    });

    function touchUX()
    {
      var touched=false;
      var posLeft=0;

      $JSlideTrack.on('mousedown touchstart','div', function(){
        touchX = event.pageX;
        if(touchX==undefined)
          touchX = event.touches[0].pageX;
        touched=true;
        var position = $JSlideTrack.position();
        posLeft = position.left;
      });
      $JSlideTrack.on('mousemove touchmove','div', function(){
        if(touched==true)
        {
          tcx = event.pageX;
          if(tcx==undefined)
            tcx = event.touches[0].pageX;
          var scrollLeft = tcx - touchX;
          scrollTo = posLeft + scrollLeft;
          $JSlideTrack.animate({left:scrollTo}, 0);
          slideLimit = $JSlideTrack.children(".jslider-slide").outerWidth();
          slideLimit = slideLimit/2;
          if(scrollLeft>=slideLimit)
          {
            currentSlide--;
            if(currentSlide<zeroSlide)
            {
              currentSlide++;
            }
            else if(currentSlide>lastSlide)
            {
              JSlideScroll(lastSlide, parseInt(_JSSettings.animSpeed));
              $JSlideTrack.children().removeClass(_JSSettings.currentSlideClass);
              $JSlideTrack.children().eq(currentSlide).addClass(_JSSettings.currentSlideClass);
            }
            touchX = event.pageX;
            if(touchX==undefined)
              touchX = event.touches[0].pageX;
            touched=true;
            var position = $JSlideTrack.position();
            posLeft = position.left;
          }
          else if(scrollLeft<=(1-slideLimit))
          {
            if(currentSlide<lastSlide+_JSSettings.showElements-1)
              currentSlide++;
            if(currentSlide>lastSlide)
            {
              JSlideScroll(lastSlide, parseInt(_JSSettings.animSpeed));
              $JSlideTrack.children().removeClass(_JSSettings.currentSlideClass);
              $JSlideTrack.children().eq(currentSlide).addClass(_JSSettings.currentSlideClass);
            }
            if(currentSlide>parseInt(lastSlide)+parseInt(_JSSettings.showElements))
            {
              currentSlide--;
            }
            touchX = event.pageX;
            if(touchX==undefined)
              touchX = event.touches[0].pageX;
            touched=true;
            var position = $JSlideTrack.position();
            posLeft = position.left;
          }
          $JSlideTrack.children().removeClass(_JSSettings.currentSlideClass);
          $JSlideTrack.children().eq(currentSlide).addClass(_JSSettings.currentSlideClass);
        }
      });
      $JSlideTrack.on('mouseup touchend','div', function(){
        touched=false;
        if(currentSlide>=lastSlide)
        {
          if(_JSSettings.highlightCurrent==true)
          {
            JSlideScroll(lastSlide, parseInt(_JSSettings.animSpeed));
            $JSlideTrack.children().removeClass(_JSSettings.currentSlideClass);
            $JSlideTrack.children().eq(currentSlide).addClass(_JSSettings.currentSlideClass);
          }
          else if(_JSSettings.highlightCurrent==false)
          {
            if(currentSlide==lastSlide)
              JSlideScroll(currentSlide, parseInt(_JSSettings.animSpeed));
            else if(currentSlide>lastSlide)
            {
              currentSlide=zeroSlide;
              JSlideScroll(currentSlide, parseInt(_JSSettings.animSpeed));
            }
          }
        }
        else {
          JSlideScroll(currentSlide, parseInt(_JSSettings.animSpeed));
        }
      });
    }
    console.log("%cCongratulations! The JSlider initialized in " + parseInt(Date.now()-start) + " miliseconds",'color:white; background:black; font-weight:bold; padding:5px;');
  };
})( jQuery );
