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


var apiURL = 'https://api.github.com/repos/LukyVj/accecss/commits?per_page=6&sha='

var demo = new Vue({

  el: '#commits',

 data: {
    branches: ['gh-pages'],
    currentBranch: 'gh-pages',
    commits: null
  },

  created: function () {
    this.fetchData()
    this.$watch('currentBranch', function () {
      this.fetchData()
    })
  },

  filters: {
    truncate: function (v) {
      var newline = v.indexOf('\n')
      return newline > 0 ? v.slice(0, newline) : v
    },
    formatDate: function (v) {
      return v.replace(/T|Z/g, ' ')
    }
  },

  methods: {
    fetchData: function () {
      var xhr = new XMLHttpRequest()
      var self = this
      xhr.open('GET', apiURL + self.currentBranch + '&client_id=769085192c10d1669bee&client_secret=36220dd0aaff915490f4c7b3b1aa70ce4a0bac3f')
      xhr.onload = function () {
        self.commits = JSON.parse(xhr.responseText)
      }
      xhr.send()
    }
  }
})
