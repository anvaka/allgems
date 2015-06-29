var loadGraph = require('./lib/loadGraph.js');
var graph = loadGraph(process.argv[2] || 'graph.out');

var save = require('ngraph.tobinary');
save(graph, { outDir: './data' });

console.log('Done.');
console.log('Copy `links.bin`, `labels.bin` and positions.bin into vis folder');
