(function( $ ){

  $.fn.jslider = function( options ) {
    var settings = $.extend( {
      showElements:3,
      scrollElements:3,
      rows:1,
      animSpeed:500,
      infinite:true,
      centered:true,
      startSlide:1,
      currentSlideClass:'JSoft-current',
      previousButton:'.prev',
      nextButton:'.next',
      scrollDots:true,
      doEffectTo:'parrent',
      lazyLoad:false,
      autoPlay:false,
      autoPlaySpeed:1000,
      effect:'none'
    }, options);
      //check and change settings for best experience
      checkSettings();
      //parrent variable
      var $JSlideScrollElement = $(this);
      //get slides
      var slides = $JSlideScrollElement.html();
      $JSlideScrollElement.addClass("jslider-slider");
      //add the track block into parrent
      $JSlideScrollElement.html('<div class="jslider-track"></div>');
      var $JSlideTrack = $(this).children('.jslider-track');
      //add slides
      $JSlideTrack.html(slides);
      delete(slides);
      //variables
      var trackWidth=0;
      var slidesCount=0;
      var mxHeight=0;
      var currentSlide=parseInt(settings.startSlide);
      // scroll to start slide with animation speed 0
      JSlideScroll(currentSlide,0);
      //add plugin class to inner blocks
      $JSlideTrack.children().each(function(index, element){
        $(element).addClass("jslider-slide");
        slidesCount = index+1;
      });
      //call function to calculate the inner blocks size
      JSliderBlockSize();
      slidesCount /= settings.rows;

      $JSlideScrollElement.height($JSlideTrack.height());
      //infinite setting
      if(settings.infinite==true)
      {
        var slides = $JSlideTrack.html();
        $JSlideTrack.append(slides);
        $JSlideTrack.prepend(slides);
        slides = $JSlideTrack.width();
        $JSlideTrack.css("width",slides*3);
        currentSlide+=slidesCount;
      }
      else if(settings.infinite==false)
      {
        slidesCount-=parseInt(settings.showElements);
      }
      // calculate the count of slides
      slidesCount = Math.ceil(slidesCount);
      // Add slides dots
      if(settings.dscrollDots==true)
        CreateDots($JSlideScrollElement);
      // scroll to slide
      JSlideScroll(currentSlide, 0);
      //autoplay start
      if(settings.autoPlay==true)
        setTimeout(function () {
          JSoftPlay(settings.autoPlaySpeed);
        }, parseInt(settings.autoPlaySpeed));

      //when user click dot
      $JSlideScrollElement.children(".dots-wrapper").children("li").click(function(){
        if(settings.infinite==false)
        {
          currentSlide = $(this).attr("data-slide");
          currentSlide = currentSlide*parseInt(settings.scrollElements);
          if(currentSlide == parseInt(slidesCount)+parseInt(settings.scrollElements))
            currentSlide=0;
          else if(currentSlide>slidesCount)
            currentSlide=parseInt(slidesCount);
          JSlideScroll(currentSlide, parseInt(settings.animSpeed));
        }
        else if(settings.infinite==true)
        {
          slide_to = $(this).attr("data-slide")*parseInt(settings.scrollElements);
          currentSlide = slidesCount + slide_to;
          JSlideScroll(currentSlide, parseInt(settings.animSpeed));
          if(currentSlide>=slidesCount*2)
          {
            currentSlide-=slidesCount;
            JSlideScroll(currentSlide, 0);
          }
        }
      });
      //when user click "prev" button
      $(settings.previousButton).click(function(){
        if(settings.infinite==false)
        {
          if(currentSlide>0 && currentSlide-parseInt(settings.scrollElements)<0)
            currentSlide=0;
          else
            currentSlide-=parseInt(settings.scrollElements);
          if(currentSlide<0)
            currentSlide=slidesCount;
          JSlideScroll(currentSlide, parseInt(settings.animSpeed));
        }
        else if(settings.infinite==true)
        {
          currentSlide-=parseInt(settings.scrollElements);
          JSlideScroll(currentSlide, parseInt(settings.animSpeed));
          if(currentSlide<=slidesCount-parseInt(settings.showElements))
          {
            currentSlide+=parseInt(slidesCount);
          JSlideScroll(currentSlide, 0);
          }
        }
      });
      // when user click "next" button
      $(settings.nextButton).click(function(){
        if(settings.infinite==false)
        {
          currentSlide+=parseInt(settings.scrollElements);
          if(currentSlide == parseInt(slidesCount)+parseInt(settings.scrollElements))
            currentSlide=0;
          else if(currentSlide>slidesCount)
            currentSlide=parseInt(slidesCount);
          JSlideScroll(currentSlide, parseInt(settings.animSpeed));
        }
        if(settings.infinite==true)
        {
          currentSlide+=parseInt(settings.scrollElements);
          JSlideScroll(currentSlide, parseInt(settings.animSpeed));
          if(currentSlide>=slidesCount*2)
          {
            currentSlide-=slidesCount;
            JSlideScroll(currentSlide, 0);
          }
        }
      });
      // scroll slider to "to_element" width "speed" in miliseconds
      function JSlideScroll(to_element, speed)
      {
        to_element = Math.ceil(to_element);
        var position = $JSlideTrack.children().eq(to_element).position();
        $JSlideTrack.children().removeClass("JSoft-current");
        $JSlideTrack.children().eq(to_element).addClass("JSoft-current");
        var positionLeft = position.left;
        console.log(positionLeft);
        position = $JSlideScrollElement.position();
        var trackPosition = position.left;
        var to = trackPosition-positionLeft;
        if(settings.centered==true)
        {
          to = to + ($JSlideScrollElement.width()/2)-($JSlideTrack.children('.jslider-slide').width()/2);
        }
        if(settings.doEffectTo == "parrent")
          var doEffectTo = $JSlideTrack;
        else if(settings.doEffectTo == "slides")
          var doEffectTo = $JSlideTrack.children(".jslider-slide");
        switch (settings.effect)
        {
          case 'fade':
            doEffectTo.fadeOut(parseInt(speed));
            setTimeout(function () {
              $JSlideTrack.animate({left:to}, 0);
            }, parseInt(speed));
            setTimeout(function () {
              doEffectTo.fadeIn(parseInt(speed));
            }, parseInt(speed));
          break;
          case 'slide':
            doEffectTo.slideUp(parseInt(speed));
            setTimeout(function () {
              $JSlideTrack.animate({left:to}, 0);
            }, parseInt(speed));
            setTimeout(function () {
              doEffectTo.slideDown(parseInt(speed));
            }, parseInt(speed));
          break;
          default:
            $JSlideTrack.animate({left:to}, parseInt(speed));
          break;
        }
        delete(to);
      }
      // Calculate the inner blocks size
      function JSliderBlockSize()
      {
        $JSlideTrack.children('.jslider-slide').css("width",$JSlideScrollElement.width()/settings.showElements+"px");
        var trackWidth = ($JSlideScrollElement.width()/settings.showElements)*Math.ceil(slidesCount/settings.rows);
        trackWidth*=1.5;
        $JSlideTrack.css("width",trackWidth);
      }
      //autoplay
      function JSoftPlay(speed)
      {
        if(settings.infinite==false)
        {
          currentSlide+=parseInt(settings.scrollElements);
          if(currentSlide == parseInt(slidesCount)+parseInt(settings.scrollElements))
            currentSlide=0;
          else if(currentSlide>slidesCount)
            currentSlide=parseInt(slidesCount);
          JSlideScroll(currentSlide, parseInt(settings.animSpeed));
        }
        if(settings.infinite==true)
        {
          currentSlide+=parseInt(settings.scrollElements);
          JSlideScroll(currentSlide, parseInt(settings.animSpeed));
          if(currentSlide>=slidesCount*2)
          {
            currentSlide-=slidesCount;
            JSlideScroll(currentSlide, 0);
          }
        }
        setTimeout(function () {
          JSoftPlay(speed);
        }, parseInt(speed));
      }
      // Change settings for best experience
      function checkSettings()
      {
        if(settings.centered==true)
        {
          settings.infinite=true;
          settings.scrollElements=1;
        }
        if(settings.infinite==true)
        {
          settings.scrollDots=false;
        }
      }
      function CreateDots(parrent_element)
      {
        var dotsCount = Math.ceil((slidesCount)/parseInt(settings.scrollElements));
        if(settings.infinite==false)
          dotsCount++;
        parrent_element.append("<div class=dots-wrapper></div>");
        if(dotsCount>0)
          for(var dot = 0; dot<dotsCount; dot++)
            parrent_element.children(".dots-wrapper").append("<li data-slide="+dot+"></li>");
      }
      $(window).resize(function(){
        JSliderBlockSize();
      });
  };
})( jQuery );
