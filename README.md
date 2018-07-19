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

# JSlider V1.0

> Lihtweight (24kb / 11kb), JQuery plugin for fast and easy make a slideshow on your page. Includes full and min version.

## DEMO
[demo project on codepen](http://codepen.io/D_Slike/full/JKjaeL/)

## Using:

### CDN
Full version (24kb)
```html
<script type="text/javascript" src="https://rawgit.com/DSlike/JSlider/master/JSlider.min.js"></script>
```
Min version (11kb)
```html
<script type="text/javascript" src="https://rawgit.com/DSlike/JSlider/master/JSlider.min.js"></script>
```

CSS file
```html
<link rel="stylesheet" href="https://rawgit.com/DSlike/JSlider/master/JSlider.css" />
```

### Connect

For connect an plugin, just include one of connection strings and css link. Create initializing js file, or write in html file.

```javascript
$(document).ready(function(){
  $(".your-slides-wrapper").jslider();
});
```

## Settings
This plugin may the few settings:

Value|Explanation
--- | ---
showElements|how much elements you wannt to show on screen
scrollElements|how much elements you want to scroll
rowsCount|count of slides rows
animSpeed|speed of scrolling animation
infinite|infinite scrolling **(true/false)**
centered|current element be in center **(true/false)**
startSlide|start with in initializing
currentSlideClass|html class of current slide
previousButton|class of "previous" button
nextButton|class of "next" button
scrollDots|create scroll dots for fast scrolling **(true/false)**
autoPlay|start scrolling automatically with initializing **(true/false)**
autoPlaySpeed|delay of auto scrolling
variableWidth|change slides width for place "showElements" on screen **(true/false)**
highlightCurrent|add special "currentSlideClass" to current slides **(true/false)**
touch|scrolling by using finger or mouse **(true/false)**
turn|you can disable plugin or connect it again ('on'/'off')

### Defaults

Setting|Adjustment
--- | ---
showElements|1
scrollElements|1
rowsCount|1
animSpeed|500
infinite|false
centered|false
startSlide|1
currentSlideClass|'jslider-current'
previousButton|'.jslider-prev'
nextButton|'.jslider-next'
scrollDots|false
autoPlay|false
autoPlaySpeed|1000
variableWidth|false
highlightCurrent|true
touch|true
turn|'on'

### Responsive

>You can create breakpoints with initializing, for changing some of slider parameters for different screen sizes

***Example***
```javascript
$(document).ready(function(){
  $(".your-slides-wrapper").jslider({
    responsive: [
      {
        breakpoint: 480,
        settings: {
          showElements:4,
          scrollElements:2,
          turn:'off'
        }
      },
      {
        breakpoint: 600,
        settings: {
          showElements:2,
          scrollElements:1,
          turn:"on"
        }
      }
    ]
  });
});
```
## Fixes

>For better UX, plugin automatically change some settings

```javascript
if(touch==true)
{
  highlightCurrent=false;
}
if(variableWidth==true)
{
  centered=true;
}
if(centered==true)
{
  infinite=true;
  scrollElements=1;
}
if(infinite==true)
{
  scrollDots=false;
  highlightCurrent=true;
}
if(rowsCount > 1)
{
  infinite=false;
  centered=false;
}
```
