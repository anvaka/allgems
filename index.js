var rp = require('request-promise');
var fs = require('fs');
var outputFileName = 'gems.json';
var query = 'http://rubygems.org/api/v1/search.json?query=%25&page=';
var lastIndex = 0;
var totalWorkers = 10;
var activeWorkers = 0;
var all = [];
var done = false;

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
    console.log('saved ' + all.length + ' packages into ' + outputFileName);
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
    if (all.length % 1000 === 0) {
      console.log('Downloaded ' + all.length + ' packages');
    }
  }
  done = res.length === 0;
  getNext();
}
