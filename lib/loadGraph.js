var fromJson = require('ngraph.fromjson');
var fs = require('fs');

module.exports = loadGraph;

function loadGraph(fileName) {
  var content = fs.readFileSync(fileName, 'utf8');
  return fromJson(content);
}
