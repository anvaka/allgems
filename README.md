# allgems

Crawls rubygems dependencies graph

# usage

First, clone the repository:

```
git clone https://github.com/anvaka/allgems
cd ./allgems
npm install
```

Now you can crawl:

1. Index all gems into file: `node index.js`. This will use rubygems search
api and download all packages into `gems.json` file. Most likely this will take
~2-3 hours.
2. Convert it to graph: `node toGraph ./gems.json`

# license

MIT
