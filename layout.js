var loadGraph = require('./lib/loadGraph.js');
var graph = loadGraph(process.argv[2] || 'graph.out');

var layout = require('ngraph.offline.layout')(graph);
console.log('Starting layout. This will take a while...');
layout.run();
console.log('Done. Now export this to binary format:');
console.log('node toBinary.js');
