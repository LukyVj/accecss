# AcceCSS
## A Sass Mixin that debugs & checks the accessibility of your designs

[![Join the chat at https://gitter.im/LukyVj/accecss](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/LukyVj/accecss?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

This mixin will allow you to get an overview of all the zones of your layout, get a grayscaled version to check the contrast, as well as 8 different filters to emulate the most common coloblindness types


## Simple API
What we can call "The API" is the few parameters you will be able to change or combine to use the AcceCSS mixin, it's composed of 4 paramters so far

```sass
@include accecss( false, false , false , false );
                   ^       ^        ^        ^
           selector | css zones | grayscale | colorblind filter
``` 

## API PARAMETERS
| PARAMETER | POSSIBLE VALUE |
|--------------|:------------:|
| selector | You must use quotes ('), ex: '.selector' | 
| CSS Zones | Can be true or false | 
| Grayscale | Can be true or false | 
| Colorblind filter | Any of the filters on the list below, ex: deuteranopia| 

## Browser compatibility
The AcceCSS mixin will work in any major evergreen brother :
- Google Chrome
- Safari
- Mozilla Firefox
- IE (partial)

*For more informations, see [Caniuse : SVG filters](http://caniuse.com/#feat=svg-filters)*

## How to use it

### 1 - Download
First, go on Github, and download the [accecss.scss](https://github.com/LukyVj/accecss/blob/gh-pages/css/accecss.scss) file along with the [filter.svg](https://github.com/LukyVj/accecss/blob/gh-pages/css/filters.svg)

### 2 - @import
Now, you have to import the mixin into your main stylesheet.

To keep things clear, I recommand using a main.scss file, and import both your styles and accecss mixin into it
```sass
@import 'style.scss';
@import 'accecss.scss';
```

### 3 - Use it
Once 1 & 2 are done, you're ready to use the mixin, here is how looks an inactive Accecss mixin, note that by default, all the settings are set to false
```sass
@include accecss( 
  false,  // ELEMENT       | False
  false,  // CSS ZONE      | False
  false,  // GRAYSCALE     | False
  false   // COLORBLIND    | False
);
```

Let's say you want to debug your whole document, and, for example, let's say you want to get your elements outlined
```sass
@include accecss( 
  'html body',
  true,
  false,
  false
);
```

To add a grayscaled effect :
```sass
@include accecss( 
  'html body',
  false,
  true,
  false
);
```

And finally, add a blindness color filter :
```sass
@include accecss( 
  'html body',
  false,
  false,
  protanopia // You can use all filters listed over
);
```

__You will have to give the proper path to your filter.svg, for this, use the `$path-to-filter` variable, in the accecss.scss file.__


## Informations about Colorblindness

This project was born essentially because of this article :

[Designing For (and With) Color Blindness](https://medium.com/@aaron10buuren/designing-for-and-with-color-blindness-48392aab3d87)

After some researches I discovered this information :

_Colour (color) blindness (colour vision deficiency, or CVD) affects approximately 1 in 12 men (8%) and 1 in 200 women in the world. In Britain this means that there are approximately 2.7 million colour blind people (about 4.5% of the entire population), most of whom are male._
- Source (http://www.colourblindawareness.org/colour-blindness/)_

## Thank you 
 - A big thank you to [@dervondenbergen](http://twitter.com/dervondenbergen) for his precious help, and his advices.
 - Thank you to [@bullgit](http://twitter.com/bullgit) for being awesome and provide me priceless feedbacks.
 - A huge thank you to [thecatapi.com](http://thecatapi.com), for the awesome.. Cat API!
 
## Question ?

For any further informations, feel free to ping me on twitter : [@LukyVj](http://twitter.com/lukyvj)


[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/LukyVj/accecss/trend.png)](https://bitdeli.com/free "Bitdeli Badge")

