var showdown  = require('showdown'),
    converter = new showdown.Converter(),
    text      = '#hello, markdown!',
    html      = converter.makeHtml(text);

var fs = require('fs');

exports.mdpublic = function(req, res){
  
  try {
    text = fs.readFileSync('./README.md');
    html      = converter.makeHtml(text.toString())
    res.send(html);
  } catch(err) {
    console.warn('No README founded: ' + err);
    res.send(err);
  }

};
