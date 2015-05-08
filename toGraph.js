var fs = require('fs');
var inputFileName = process.argv[2] || './gems.json';
var graph = require('ngraph.graph')({uniqueLinkId: false});
var tojson = require('ngraph.tojson');
var emptyArray = [];

var packages = require(inputFileName);
for (var i = 0; i < packages.length; ++i) {
  var pkg = packages[i];
  var source = pkg.name;
  graph.addNode(source);
  var targets = getDeps(pkg);
  for (var j = 0; j < targets.length ; j++) {
    var target = targets[j].name;
    if (target) graph.addLink(source, target);
  }
}

fs.writeFileSync('graph.out', tojson(graph), 'utf8');
console.log('Saved '  + graph.getNodesCount() + ' nodes; ' + graph.getLinksCount() + ' edges');
console.log('Now you can run the layouter:');
console.log(' node layout.js ./graph.out');

function getDeps(pkg) {
  return (pkg.dependencies && pkg.dependencies.runtime) || emptyArray;
}

