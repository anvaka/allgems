var rp = require('request-promise');
var fs = require('fs');
var outputFileName = 'gems.json';
var query = 'http://rubygems.org/api/v1/search.json?query=%25&page=';
var lastIndex = 0;
var totalWorkers = 10;
var activeWorkers = 0;
var all = [];
var done = false;

console.log('Starting index. This will probably take couple hours...');
getNext();

function getNext() {
  if (!done) {
    for (var i = activeWorkers; i < totalWorkers; ++i) {
      startWorker();
    }
  }
  if (done && activeWorkers === 0) {
    // everybody is done
    fs.writeFileSync(outputFileName, JSON.stringify(all), 'utf8');
    console.log('Done!');
    console.log('Saved ' + all.length + ' packages into ' + outputFileName);
    console.log('Convert the downloaded file into graph format:');
    console.log(' node toGraph.js ./' + outputFileName);
  }
}

function startWorker() {
  lastIndex += 1;
  activeWorkers += 1;
  rp(query + lastIndex)
    .then(join)
    .catch(reportError);
}

function reportError(err) {
  console.error(err);
  throw err;
}

function join(res) {
  activeWorkers -= 1;
  res = JSON.parse(res);
  for (var i = 0; i < res.length; ++i) {
    all.push(res[i]);
    if (all.length % 500 === 0) {
      console.log('Downloaded ' + all.length + ' packages');
    }
  }
  done = res.length === 0;
  getNext();
}
