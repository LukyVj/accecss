function hasClass(el, cls) {
  return el.className && new RegExp("(\\s|^)" + cls + "(\\s|$)").test(el.className);
}


document.getElementById('zones').addEventListener('click', function () {
  if (document.body.classList.contains('zones')) {
    document.body.className = "";
    document.body.classList.remove('zones');
  } else {
   document.body.classList.add('zones');
 }
});

document.getElementById('grayscale').addEventListener('click', function () {
  if (document.body.classList.contains('grayscale')) {
    document.body.className = "";
    document.body.classList.remove('grayscale');
  } else {
   document.body.classList.add('grayscale');
 }
});

document.getElementById('colorblind1').addEventListener('click', function () {
  if (document.body.classList.contains('colorblind1')) {
    document.body.className = "";
    document.body.classList.remove('colorblind1');
  } else {
   document.body.classList.add('colorblind1');
 }
});

document.getElementById('colorblind2').addEventListener('click', function () {
  if (document.body.classList.contains('colorblind2')) {
    document.body.className = "";
    document.body.classList.remove('colorblind2');
  } else {
   document.body.classList.add('colorblind2');
 }
});

document.getElementById('colorblind3').addEventListener('click', function () {
  if (document.body.classList.contains('colorblind3')) {
    document.body.className = "";
    document.body.classList.remove('colorblind3');
  } else {
   document.body.classList.add('colorblind3');
 }
});

document.getElementById('colorblind4').addEventListener('click', function () {
  if (document.body.classList.contains('colorblind4')) {
    document.body.className = "";
    document.body.classList.remove('colorblind4');
  } else {
   document.body.classList.add('colorblind4');
 }
});

document.getElementById('colorblind5').addEventListener('click', function () {
  if (document.body.classList.contains('colorblind5')) {
    document.body.className = "";
    document.body.classList.remove('colorblind5');
  } else {
   document.body.classList.add('colorblind5');
 }
});

document.getElementById('colorblind6').addEventListener('click', function () {
  if (document.body.classList.contains('colorblind6')) {
    document.body.className = "";
    document.body.classList.remove('colorblind6');
  } else {
   document.body.classList.add('colorblind6');
 }
});


document.getElementById('colorblind7').addEventListener('click', function () {
  if (document.body.classList.contains('colorblind7')) {
    document.body.className = "";
    document.body.classList.remove('colorblind7');
  } else {
   document.body.classList.add('colorblind7');
 }
});


document.getElementById('colorblind8').addEventListener('click', function () {
  if (document.body.classList.contains('colorblind8')) {
    document.body.className = "";
    document.body.classList.remove('colorblind8');
  } else {
   document.body.classList.add('colorblind8');
 }
});


function toggleClass(element, className){
    if (!element || !className){
        return;
    }

    var classString = element.className, nameIndex = classString.indexOf(className);
    if (nameIndex == -1) {
        classString += ' ' + className;
    }
    else {
        classString = classString.substr(0, nameIndex) + classString.substr(nameIndex+className.length);
    }
    element.className = classString;
}

var t = 10;
document.getElementById('zones').addEventListener('click', function() {
    toggleClass(document.getElementById('zones'), 'active');
});
document.getElementById('grayscale').addEventListener('click', function() {
    toggleClass(document.getElementById('grayscale'), 'active');
});
document.getElementById('colorblind1').addEventListener('click', function() {
    toggleClass(document.getElementById('colorblind1'), 'active');
});
document.getElementById('colorblind2').addEventListener('click', function() {
    toggleClass(document.getElementById('colorblind2'), 'active');
});
document.getElementById('colorblind3').addEventListener('click', function() {
    toggleClass(document.getElementById('colorblind3'), 'active');
});
document.getElementById('colorblind4').addEventListener('click', function() {
    toggleClass(document.getElementById('colorblind4'), 'active');
});
document.getElementById('colorblind5').addEventListener('click', function() {
    toggleClass(document.getElementById('colorblind5'), 'active');
});
document.getElementById('colorblind6').addEventListener('click', function() {
    toggleClass(document.getElementById('colorblind6'), 'active');
});
document.getElementById('colorblind7').addEventListener('click', function() {
    toggleClass(document.getElementById('colorblind7'), 'active');
});
document.getElementById('colorblind8').addEventListener('click', function() {
    toggleClass(document.getElementById('colorblind8'), 'active');
});


