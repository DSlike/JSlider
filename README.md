# JSlider V2.0

> Lihtweight (8kb / 5kb), Pure JS plugin for fast and easy make a slideshow on your page. Includes full and min version.


## Using:

For connect an plugin, just include one of connection strings and css link. Create initializing js file, or write in html file.

```javascript
new JSlider('.your_slider_element', {});
```

## Settings
This plugin has the few settings:

Value|Explanation
--- | ---
showElements|How much elements will be shown at time
rowsCount|How many rown you need to show on each "slide"
infinite|Infinite scrolling (start from first when you on last)
centered|Show current slide in center of slider wrapper
startSlide|Start sliding from slider number...
currentSlideClass|HTML class to spotlight current slide
previousButton|HTML class or ID for previous slide button
nextButton|HTML class or ID for next slide button
scrollDots|Show scroll dots or not
autoPlay|Does slider need to start scrolling automatically
autoPlaySpeed|Speed of auto sliding
spotlightCurrent|Add "currentSlideClass" for current slide or not
touch|Allow touch events or not

### Defaults

Setting|Adjustment
--- | ---
showElements|1
rowsCount|1
infinite|false
centered|false
startSlide|1
currentSlideClass|jslider-current
previousButton|#jslider-prev
nextButton|#jslider-next
scrollDots|false
autoPlay|false
autoPlaySpeed|1000
variableWidth|false
spotlightCurrent|true
touch|true
isPlaying|false
