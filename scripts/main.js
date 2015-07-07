function hasClass(el, cls) {
  return el.className && new RegExp("(\\s|^)" + cls + "(\\s|$)").test(el.className);
}

var body = document.body;
var demos = document.querySelectorAll('.classes_list a');

[].forEach.call(demos, function (button) {

  button.addEventListener('click', function () {

    var c = this.getAttribute('id');

    if ( hasClass(body, c)) {
      body.className = '';
      deactiveButton(this);
    } else {
      body.className = c;
      deactiveAllButtons();
      this.className += ' active ';
    }

  });

});

function deactiveAllButtons () {

  [].forEach.call(demos, function (button) {
    deactiveButton(button);
  });

}

function deactiveButton (elem) {
  elem.className = elem.className.replace(' active ', '');
}
