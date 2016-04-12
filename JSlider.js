(function( $ ){

  $.fn.jslider = function( options ) {

    // Создаём настройки по-умолчанию, расширяя их с помощью параметров, которые были переданы
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
      var currentSlide=parseInt(settings.startSlide)-1;
    //  JSlideScroll(currentSlide);
      $JSlideScrollElement.children('.jslider-track').children().each(function(index, element){
        $(element).addClass("jslider-slide");
        slidesCount = index+1;
      });
      JSliderBlockSize();
      slidesCount/=settings.rows;
      slidesCount = slidesCount.toFixed();
      JSlideScroll(currentSlide);

      $("button.prev").click(function(){
        if(currentSlide>0 && currentSlide-parseInt(settings.scrollElements)<0)
          currentSlide=0;
        else if(currentSlide==0)
          currentSlide=slidesCount-parseInt(settings.showElements);
        else
          currentSlide-=parseInt(settings.scrollElements);
        JSlideScroll(currentSlide);
      });

      $("button.next").click(function(){
        console.log(currentSlide);
        if(slidesCount-(currentSlide+parseInt(settings.scrollElements))<parseInt(settings.scrollElements))
          if(slidesCount-(currentSlide+parseInt(settings.showElements))>0)
            currentSlide = slidesCount-parseInt(settings.showElements);
          else
            currentSlide=0;
        else
          currentSlide += parseInt(settings.scrollElements);

        JSlideScroll(currentSlide);
      });

      function JSlideScroll(to_element)
      {
        var position = $JSlideScrollElement.children('.jslider-track').children().eq(to_element).position();
        var positionLeft = position.left;
        position = $JSlideScrollElement.position();
        var trackPosition = position.left;
        $JSlideScrollElement.children(".jslider-track").animate({left:trackPosition-positionLeft}, parseInt(settings.animSpeed));
      }

      function JSliderBlockSize()
      {
        $JSlideScrollElement.children('.jslider-track').children('.jslider-slide').css("width",$JSlideScrollElement.width()/settings.showElements+"px");
        $JSlideScrollElement.children('.jslider-track').css("width",($JSlideScrollElement.width()/settings.showElements)*(slidesCount/settings.rows).toFixed());
      }

      $(window).resize(function(){
        JSliderBlockSize();
      });
  };
})( jQuery );
