(function( $ ){

  $.fn.jslider = function( options ) {
    var settings = $.extend( {
      'showElements':'3',
      'scrollElements':'3',
      'rows':'1',
      'animSpeed':'500',
      'infinite':'true',
      'scrollDots':'true',
      'centered':'true',
      'centeredPadding':'20px',
      'lazyLoad':'false',
      'startSlide':'1'
    }, options);

      var $JSlideScrollElement = this.attr("class");
      $JSlideScrollElement = $("."+$JSlideScrollElement);
      var slides = $JSlideScrollElement.html();
      $JSlideScrollElement.addClass("jslider-slider");
      $JSlideScrollElement.html('<div class="jslider-track"></div>');
      $JSlideScrollElement.children('.jslider-track').html(slides);
      var trackWidth=0;
      var slidesCount=0;
      var mxHeight=0;
      var currentSlide=parseInt(settings.startSlide);
      MomentJSlideScroll(currentSlide);
      $JSlideScrollElement.children('.jslider-track').children().each(function(index, element){
        if($(element).height()>mxHeight) mxHeight = $(element).height();
        $(element).addClass("jslider-slide");
        slidesCount = index+1;
      });
      JSliderBlockSize();
      slidesCount /= settings.rows;
      if(settings.infinite=="true")
      {
        var slides = $JSlideScrollElement.children('.jslider-track').html();
        $JSlideScrollElement.children('.jslider-track').append(slides);
        $JSlideScrollElement.children('.jslider-track').prepend(slides);
        slides = $JSlideScrollElement.children('.jslider-track').width();
        $JSlideScrollElement.children('.jslider-track').css("width",slides*3);
        currentSlide+=slidesCount;
      }
      else if(settings.infinite=="false")
      {
        slidesCount-=parseInt(settings.showElements);
      }
      slidesCount = slidesCount.toFixed();
      console.log(slidesCount);
      MomentJSlideScroll(currentSlide);

      $("button.prev").click(function(){
        if(settings.infinite=="false")
        {
          if(currentSlide>0 && currentSlide-parseInt(settings.scrollElements)<0)
            currentSlide=0;
          else
            currentSlide-=parseInt(settings.scrollElements);
          if(currentSlide<0)
            currentSlide=slidesCount;
          JSlideScroll(currentSlide);
        }
        else if(settings.infinite=="true")
        {
          currentSlide-=parseInt(settings.scrollElements);
          JSlideScroll(currentSlide);
          if(currentSlide<=slidesCount-parseInt(settings.showElements))
          {
            currentSlide+=parseInt(slidesCount);
            MomentJSlideScroll(currentSlide);
          }
        }
      });

      $("button.next").click(function(){
        if(settings.infinite=="false")
        {
          currentSlide+=parseInt(settings.scrollElements);
          console.log(currentSlide);
          if(currentSlide>slidesCount)
            currentSlide=0;
          JSlideScroll(currentSlide);
        }
        if(settings.infinite=="true")
        {
          currentSlide+=parseInt(settings.scrollElements);
          JSlideScroll(currentSlide);
          if(currentSlide>=slidesCount*2)
          {
            currentSlide-=slidesCount;
            MomentJSlideScroll(currentSlide);
          }
        }
      });

      function JSlideScroll(to_element)
      {
        var position = $JSlideScrollElement.children('.jslider-track').children().eq(to_element).position();
        var positionLeft = position.left;
        position = $JSlideScrollElement.position();
        var trackPosition = position.left;
        $JSlideScrollElement.children(".jslider-track").animate({left:trackPosition-positionLeft}, parseInt(settings.animSpeed));
      }

      function MomentJSlideScroll(to_element)
      {
        var position = $JSlideScrollElement.children('.jslider-track').children().eq(to_element).position();
        var positionLeft = position.left;
        position = $JSlideScrollElement.position();
        var trackPosition = position.left;
        $JSlideScrollElement.children(".jslider-track").animate({left:trackPosition-positionLeft}, 0);
      }

      function JSliderBlockSize()
      {
        $JSlideScrollElement.children('.jslider-track').children('.jslider-slide').css("width",$JSlideScrollElement.width()/settings.showElements+"px");
        $JSlideScrollElement.children('.jslider-track').css("width",($JSlideScrollElement.width()/settings.showElements)*(slidesCount/settings.rows).toFixed());
        //$JSlideScrollElement.css("height",parseInt(mxHeight));
      }

      $(window).resize(function(){
        JSliderBlockSize();
      });
  };
})( jQuery );
