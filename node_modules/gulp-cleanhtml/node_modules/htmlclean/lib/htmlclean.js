/*
 * htmlclean
 * https://github.com/anseki/htmlclean
 *
 * <!--[htmlclean-protect]-->This text is protected.<!--[/htmlclean-protect]-->
 *
 * Copyright (c) 2014 anseki
 * Licensed under the MIT license.
 */

'use strict';

/*
  1. Inline-elements (HTML 4, XHTML-1.0-Frameset, XHTML 1.1)
  2. Phrasing content Category(HTML 5.1)
  empty:      Empty-Element
  hasBlock:   Element can include Block level elements / Non-Phrasing content
  embed:      The line-breaks will not be used for margins of this element
*/
var PHRASING_ELEMENTS = {
a:{},abbr:{},acronym:{},applet:{hasBlock:true,embed:true},audio:{hasBlock:true,embed:true},b:{},basefont:{empty:true,embed:true},bdi:{},bdo:{},big:{},br:{empty:true},button:{hasBlock:true},canvas:{hasBlock:true,embed:true},cite:{},code:{},data:{},datalist:{hasBlock:true,embed:true},del:{},dfn:{},em:{},embed:{empty:true,embed:true},font:{},i:{},iframe:{hasBlock:true,embed:true},img:{empty:true},input:{empty:true},ins:{},kbd:{},keygen:{empty:true,embed:true},label:{},map:{hasBlock:true,embed:true},mark:{},math:{embed:true},meter:{},noscript:{hasBlock:true,embed:true},object:{hasBlock:true,embed:true},output:{},progress:{},q:{},ruby:{hasBlock:true},s:{},samp:{},script:{embed:true},select:{hasBlock:true},small:{},span:{},strike:{},strong:{},sub:{},sup:{},svg:{hasBlock:true},template:{hasBlock:true},textarea:{},time:{},tt:{},u:{},var:{},video:{hasBlock:true,embed:true},wbr:{empty:true}
};

module.exports = function(html, options) {
  var protectedText = [], embedElms,
    htmlWk = '', lastLeadSpace = '', lastTrailSpace = '', lastPhTags = '', lastIsEnd = true;

  // USAGE: marker = protectedTextAdd(protectText);
  function protectedTextAdd(text) {
    if (typeof text !== 'string' || text === '') { return ''; }
    protectedText.push(text);
    return '\f' + (protectedText.length - 1) + '\f';
  }

  if (typeof html !== 'string') { return ''; }
  html = html.replace(/\f/g, ' '); // \f is used as marker.

  // [^\S\f] The RegExp pattern except \f from \s

  // <!--[htmlclean-protect]-->
  html = html.replace(/<[^\S\f]*\![^\S\f]*--[^\S\f]*\[[^\S\f]*htmlclean-protect[^\S\f]*\][^\S\f]*--[^\S\f]*>([\s\S]*?)<[^\S\f]*\![^\S\f]*--[^\S\f]*\[[^\S\f]*\/[^\S\f]*htmlclean-protect[^\S\f]*\][^\S\f]*--[^\S\f]*>/ig,
    function(str, p1) { return protectedTextAdd(p1); });

  // Apache SSI tags
  html = html.replace(/(<[^\S\f]*\![^\S\f]*--[^\S\f]*\#[\s\S]*?--[^\S\f]*>)/g, // Not [^>]. '>' may be included.
    function(str, p1) { return protectedTextAdd(p1); });

  // IE conditional comments
  // The line-breaks will not be used for margins of these elements.
  /*
    <![if expression]>
    <!--[if expression]>
    <!--[if expression]>-->
    <!--[if expression]><!-->
  */
  html = html.replace(/(?:[\t ]*[\n\r][^\S\f]*)?(<[^\S\f]*\![^\S\f]*(?:--)?[^\S\f]*\[[^\S\f]*if\b[^>]*>(?:(?:<[^\S\f]*\!)?[^\S\f]*--[^\S\f]*>)?)(?:[\t ]*[\n\r][^\S\f]*)?/ig,
    function(str, p1) { return protectedTextAdd(p1); });
  /*
    <![endif]>
    <![endif]-->
    <!--<![endif]-->
  */
  html = html.replace(/(?:[\t ]*[\n\r][^\S\f]*)?((?:<[^\S\f]*\![^\S\f]*--[^\S\f]*)?<[^\S\f]*\![^\S\f]*\[[^\S\f]*endif\b[^>]*>)(?:[\t ]*[\n\r][^\S\f]*)?/ig,
    function(str, p1) { return protectedTextAdd(p1); });

  // HTML elements which include CDATA/preformatted text
  html = html.replace(/(<[^\S\f]*(textarea|script|style|pre)\b[^>]*>)([\s\S]*?)(<[^\S\f]*\/[^\S\f]*\2\b[^>]*>)/ig,
    function(str, startTag, tagName, innerHtml, endTag) {
      var splitHtml;
      if (innerHtml !== '') {
        if (tagName.toLowerCase() === 'pre') { // Allow nesting tags.
          splitHtml = '';
          innerHtml = innerHtml.replace(/([\s\S]*?)(<[^>]+>)/g,
            function(str, text, tag) {
              splitHtml += protectedTextAdd(text) + tag;
              return '';
            });
          splitHtml += protectedTextAdd(innerHtml); // Last text.
          return startTag + splitHtml + endTag;
        } else {
          return startTag + protectedTextAdd(innerHtml) + endTag;
        }
      } else { return startTag + endTag; }
    });

  // Additional protected texts
  if (options && options.protect) {
    (Array.isArray(options.protect) ? options.protect : [options.protect]).forEach(function(re) {
      if (re instanceof RegExp) {
        html = html.replace(re, function(str) { return protectedTextAdd(str); });
      }
      // Now, ECMAScript doesn't support lookbehind pattern of RegExp. e.g. (?<=...)
      // Alternative solution: Accept { re: /(pre)(needed)/g, capture: 2 }
      // But, ECMAScript doesn't support offset of submatches. (Like Perl @LAST_MATCH_START)
      // Example problem: /(<(div|span)>)(.+?)(<\/\1>)/
      /*
      else if (typeof re === 'object' && re.regexp instanceof RegExp) {
        re.capture = parseInt(re.capture, 10) || 1;
        if (re.capture < 1) { return; } // Invalid parameter
        var capIndex = re.capture - 1; // Capturing position to index of Array
        html = html.replace(re.regexp, function(str) {
          var caps;
          // replace(str, p1, p2, offset, s) capturing parentheses = arguments.length - 3
          if (capIndex > arguments.length - 4) { return str; } // Invalid parameter (Don't change)
          caps = Array.prototype.slice.call(arguments, 1, -2); // To Array
          if (caps[capIndex] === '') { return str; }
          return (capIndex > 0 ? caps.slice(0, capIndex).join('') : '') +
            protectedTextAdd(caps[capIndex]) +
            (capIndex < caps.length - 1 ? caps.slice(capIndex + 1).join('') : '');
        });
      }
      */
    });
  }

  // HTML comments
  // Texts in CDATA (not HTML) or preformatted are excepted.
  html = html.replace(/<[^\S\f]*\![^\S\f]*--[\s\S]*?--[^\S\f]*>/g, '');

  // Attributes of tags
  html = html.replace(/<([^>]+)>/g,
    function(str, tagInner) {
      tagInner = tagInner.replace(/("|')([\s\S]*?)\1/g,
        function(str, quot, innerQuot) {
          return quot + protectedTextAdd(innerQuot) + quot;
        });
      return '<' + tagInner + '>';
    });

  // embed
  embedElms = Object.keys(PHRASING_ELEMENTS)
    .filter(function(tagName) { return PHRASING_ELEMENTS[tagName].embed; }).join('|');
  html = html.replace(new RegExp('(?:[\\t ]*[\\n\\r][^\\S\\f]*)?(<[^\\S\\f]*\\/?[^\\S\\f]*(?:' + embedElms + ')\\b[^>]*>)(?:[\\t ]*[\\n\\r][^\\S\\f]*)?', 'ig'), '$1');

  // The [\n\r\t ] may be used for separator of the words or for margins of the elements.
  html = html.replace(/[\n\r\t ]+/g, ' '); // \s includes many others
  html = html.replace(/^ +| +$/g, ''); // Not .trim() that removes \f.

  // Whitespaces between HTML tags
  html = html.replace(/( *)([\s\S]*?)( *)(< *(\/)? *([^ >\/]+)[^>]*>)/g,
    function(str, leadSpace, text, trailSpace, tag, isEnd, tagName) {
      tagName = tagName.toLowerCase();
      if (tagName === 'br' || tagName === 'wbr') {
        // Break
        htmlWk += (text ? (lastIsEnd ?
            lastPhTags + (lastTrailSpace || leadSpace) + text :
            (lastLeadSpace || leadSpace) + lastPhTags + text) : lastPhTags) +
          tag;
        lastLeadSpace = lastTrailSpace = lastPhTags = '';
        lastIsEnd = true;
      } else if (PHRASING_ELEMENTS[tagName]) {
        if (PHRASING_ELEMENTS[tagName].hasBlock) {
          // Break
          if (isEnd) {
            htmlWk += (text ? (lastIsEnd ?
                lastPhTags + (lastTrailSpace || leadSpace) + text :
                (lastLeadSpace || leadSpace) + lastPhTags + text) : lastPhTags) +
              tag;
          } else {
            htmlWk += (lastIsEnd ?
                lastPhTags + (lastTrailSpace || leadSpace) + text :
                (lastLeadSpace || leadSpace) + lastPhTags + text) +
              (text ? trailSpace : '') + tag;
          }
          lastLeadSpace = lastTrailSpace = lastPhTags = '';
          lastIsEnd = true;
        } else if (PHRASING_ELEMENTS[tagName].empty) {
          // Break
          htmlWk += (lastIsEnd ?
              lastPhTags + (lastTrailSpace || leadSpace) + text :
              (lastLeadSpace || leadSpace) + lastPhTags + text) +
            (text ? trailSpace : '') + tag;
          lastLeadSpace = lastTrailSpace = lastPhTags = '';
          lastIsEnd = true;
        } else {
          if (isEnd) {
            if (text) {
              // Break
              htmlWk += lastIsEnd ?
                lastPhTags + (lastTrailSpace || leadSpace) + text :
                (lastLeadSpace || leadSpace) + lastPhTags + text;
              lastLeadSpace = '';
              lastTrailSpace = trailSpace;
              lastPhTags = tag;
            } else {
              if (lastIsEnd) {
                lastTrailSpace = lastTrailSpace || leadSpace;
                lastPhTags += tag;
              } else {
                // Break
                htmlWk += lastPhTags;
                lastTrailSpace = lastLeadSpace || leadSpace;
                lastLeadSpace = '';
                lastPhTags = tag;
              }
            }
          } else {
            if (text) {
              // Break
              htmlWk += lastIsEnd ?
                lastPhTags + (lastTrailSpace || leadSpace) + text :
                (lastLeadSpace || leadSpace) + lastPhTags + text;
              lastLeadSpace = trailSpace;
              lastTrailSpace = '';
              lastPhTags = tag;
            } else {
              if (lastIsEnd) {
                // Break
                htmlWk += lastPhTags;
                lastLeadSpace = lastTrailSpace || leadSpace;
                lastTrailSpace = '';
                lastPhTags = tag;
              } else {
                lastLeadSpace = lastLeadSpace || leadSpace;
                lastPhTags += tag;
              }
            }
          }
          lastIsEnd = isEnd;
        }
      } else {
        // Break
        htmlWk += (text ? (lastIsEnd ?
            lastPhTags + (lastTrailSpace || leadSpace) + text :
            (lastLeadSpace || leadSpace) + lastPhTags + text) : lastPhTags) +
          tag;
        lastLeadSpace = lastTrailSpace = lastPhTags = '';
        lastIsEnd = true;
      }
      return '';
    });
  // Text after last tag (But, it's wrong HTML)
  html = html.replace(/^( *)([\s\S]*)$/,
    function(str, leadSpace, text) {
      htmlWk += (text ? (lastIsEnd ?
          lastPhTags + (lastTrailSpace || leadSpace) + text :
          (lastLeadSpace || leadSpace) + lastPhTags + text) : lastPhTags);
      return '';
    });
  html = htmlWk;

  // Additional editing
  if (options && typeof options.edit === 'function') {
    html = options.edit(html);
    if (typeof html !== 'string') { html = ''; }
  }

  // Restore protected texts
  html = html.replace(/\f(\d+)\f/g,
    function(str, p1) { return protectedText[p1] || ''; });

  return html;
};
