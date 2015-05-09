var fs = require('fs');
var path = require('path');
var loadGraph = require('./lib/loadGraph.js');
var graph = loadGraph(process.argv[2] || 'graph.out');
var layout = require('ngraph.forcelayout3d')(graph);

var i = 0;
console.log('Starting layout. This will take ~60-120 minutes');

while (i < 501) {
  console.log('Step ' + i);
  layout.step();
  if (i % 5 === 0) {
    saveIteration(Math.round(i/5));
  }
  ++i;
}

console.log('Done. Convert results to binary format now:');
console.log(' node toBinary.js ./graph.out');

function saveIteration(name) {
  var fname = path.join('data', name + '.pos');

  console.log("Saving: ", fname);
  var nodesLength = graph.getNodesCount();
  var buf = new Buffer(nodesLength * 4 * 3);
  var i = 0;

  graph.forEachNode(function (node) {
    var idx = i * 4 * 3;
    var pos = layout.getNodePosition(node.id);
    buf.writeInt32LE(pos.x, idx);
    buf.writeInt32LE(pos.y, idx + 4);
    buf.writeInt32LE(pos.z, idx + 8);
    i++;
  });

  fs.writeFileSync(fname, buf);
}
