<header role="header">

<div class="align">

# Acce<span>CSS</span>

## A Sass Mixin

### That debugs & checks the accessibility of your designs

</div>

</header>

<div class="content">

<div class="menu"><span id="openMenu"></span>

*   [API](#api)
*   [Usage](#usage)
*   [Demo](#demo)
*   [Infos](#infos)
*   [?](#questions)

</div>

<div class="introduction">

<div class="panel">

This mixin will allow you to get an overview of all the zones of your layout, get a grayscaled version to check the contrast, as well as 8 different filters to emulate the most common coloblindness types

Find it on [Github](https://github.com/LukyVj/accecss/)!

</div>

</div>

<div class="content_api panel" id="api">

<header>

### Simple API

</header>

<section>

What we can call "The API" is the few parameters you will be able to change or combine to use the AcceCSS mixin, it's composed of 4 paramters so far

    @include accecss( false, false , false , false );
                       ^       ^        ^        ^
               selector | css zones | grayscale | colorblind filter

<span class="divider"></span>

<div class="table">

<header>

### API parameters

</header>

<div class="table-rows">

<div class="row">

<div class="col">selector</div>

<div class="col">You must use quotes (`'`), ex: `'.selector'`</div>

</div>

<div class="row">

<div class="col">CSS Zones</div>

<div class="col">Can be `true` or `false`</div>

</div>

<div class="row">

<div class="col">Grayscale</div>

<div class="col">Can be `true` or `false`</div>

</div>

<div class="row">

<div class="col">Colorblind filter</div>

<div class="col">Any of the filters on the list below, ex: `deuteranopia`</div>

</div>

</div>

</div>

<span class="divider"></span>

#### Filters list

*   protanopia
*   protanomaly
*   deuteranopia
*   deuteranomaly
*   tritanopia
*   tritanomaly
*   achromatopsia
*   achromatomaly

<span class="divider"></span>

#### Browser compatibility

The AcceCSS mixin will work in any major evergreen brother :

*   [![](dist/images/chrome-icon.svg)Google Chrome](http://caniuse.com/#feat=svg-filters)
*   [![](dist/images/safari-icon.svg)Safari](http://caniuse.com/#feat=svg-filters)
*   [![](dist/images/firefox-icon.svg)Mozilla Firefox](http://caniuse.com/#feat=svg-filters)
*   [![](dist/images/ie-icon.svg)IE (partial)](http://caniuse.com/#feat=svg-filters)

</section>

</div>

<div class="howto panel" id="usage">

<header>

### How to use it

</header>

<section>

#### 1 - Download

First, go on [Github](https://github.com/LukyVj/accecss), and download the [accecss.scss](https://github.com/LukyVj/accecss/blob/gh-pages/css/accecss.scss) file along with the [filter.svg](https://github.com/LukyVj/accecss/blob/gh-pages/css/filters.svg)

<span class="divider"></span>

#### 2 - @import

Now, you have to import the mixin into your main stylesheet.

To keep things clear, I recommand using a **main.scss** file, and import both your **styles** and **accecss** mixin into it

    @import 'style.scss';
    @import 'accecss.scss';

<span class="divider"></span>

#### 3 - Use it

Once **[1](#one)** & **[2](#two)** are done, you're ready to use the mixin, here is how looks an inactive Accecss mixin, note that by default, all the settings are set to false

    @include accecss( 
      false,  // ELEMENT       | False
      false,  // CSS ZONE      | False
      false,  // GRAYSCALE     | False
      false   // COLORBLIND    | False
    );

<span class="divider"></span>

Let's say you want to debug your whole document, and, for example, let's say you want to get your elements outlined

    @include accecss( 
      'html body',
      true,
      false,
      false
    );

<span class="divider"></span>

To add a grayscaled effect :

    @include accecss( 
      'html body',
      false,
      true,
      false
    );

<span class="divider"></span>

And finally, add a blindness color filter :

    @include accecss( 
      'html body',
      false,
      false,
      protanopia // You can use all filters listed over
    );

<div class="warning">

You will have to give the proper path to your **filter.svg**, for this, use the `$path-to-filter` variable, in the **accecss.scss** file.

</div>

</section>

</div>

<div class="content_demos panel" id="demo">

<header>

### Demos :

</header>

<div class="classes_list">

<div class="row">

#### Outlining :

[CSS zones](javascript:void(0))</div>

<div class="row">

#### Contrasts :

[grayscale](javascript:void(0))</div>

<div class="row">

#### Colorblindness filters :

[protanopia](javascript:void(0)) [protanomaly](javascript:void(0)) [deuteranopia](javascript:void(0)) [deuteranomaly](javascript:void(0)) [tritanopia](javascript:void(0)) [tritanomaly](javascript:void(0)) [achromatopsia](javascript:void(0)) [achromatomaly](javascript:void(0))</div>

</div>

<div>

### With text

Lorem ipsum dolor sit amet, consectetur adipisicing elit. [foo](#) Repudiandae alias, ex porro eaque explicabo eligendi iusto nulla dolore laboriosam voluptatibus commodi [bar](#) quaerat animi, doloribus et quam [baz](#) vitae nobis obcaecati. Assumenda.

</div>

<div>

### With images

*   ![](http://thecatapi.com/api/images/get?format=src&type=jpg)
*   ![](http://thecatapi.com/api/images/get?format=src&type=png)
*   ![](http://thecatapi.com/api/images/get?format=src&type=jpg)
*   ![](http://thecatapi.com/api/images/get?format=src&type=gif)

</div>

</div>

<div class="content_informations panel" id="infos">

<header>

### Informations about Colorblindness

</header>

<section>

This project was born essentially because of this article :

[https://medium.com/@aaron10buuren/designing-for-and-with-color-blindness-48392aab3d87](https://medium.com/@aaron10buuren/designing-for-and-with-color-blindness-48392aab3d87)

<span class="divider"></span>

After some researches I discovered this information :

> Colour (color) blindness (colour vision deficiency, or CVD) affects approximately **1 in 12 men** (**8%**) and **1 in 200 women** in the world. In Britain this means that there are approximately 2.7 million colour blind people (about 4.5% of the entire population), most of whom are male.

<small>- [Source (http://www.colourblindawareness.org/colour-blindness/)](#)</small></section>

</div>

<div class="content_question panel" id="questions">

<header>

### Question ?

</header>

<section>

For any further informations, feel free to ping me on twitter : [@LukyVj](http://twitter.com/lukyVj)

</section>

</div>

</div>

<div class="share">[![](dist/images/twitter-icon.svg)](https://twitter.com/home?status=AcceCSS+-+A+Sass+mixin+That+debugs+%26+checks+the+accessibility+of+your+designs+http%3A%2F%2Flukyvj.github.io%2Faccecss%2F+via+%40lukyvj)</div>

<footer role="footer"><small>2015   -    [@LukyVj](http://twitter.com/LukyVj)   -    [github](http://github.com/lukyvj/accecss)</small>   
<small>For a better, more open & accessible web</small></footer>