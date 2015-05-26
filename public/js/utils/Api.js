var demo = {
  editor: {
    html:'<div class="banner">\n\t<div class="avatar">\n\t\t<div class="img"></div>\n\t</div>\n</div>\n\n<div class="list">\n\t<ul id="wrap"></ul>\n</div>\n',
    script:"var wrap = document.getElementById('wrap');\n\nfor (var i=0; i<30; i++) {\n wrap.innerHTML += '<li>item n°'+ (i+1) +'</li>';\n}",
    style:"body {\n  margin: 0;\n font: 14px 'Lucida Grande',Helvetica,Arial,sans-serif;\n}" 
  },
  settings: {
    title: 'Demo',
    description: 'This is a test!',
    reset: false,
    sass: true,
    preview: false,
    ressources: [],
  },
  view: {
    tab1: true,
    tab2: false,
    tab3: false,
  }
};

module.exports = demo;
