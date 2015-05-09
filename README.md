# allgems

Crawls rubygems dependencies graph

# usage

First, clone the repository:

``` shell
git clone https://github.com/anvaka/allgems
cd ./allgems
npm install
```

Now you can crawl:

1. Index all gems into file: `node index.js`. This will use rubygems search
api and download all packages into `gems.json` file. Most likely this will take
~2-3 hours. It is slow because the search API limits results to 30 per page.
2. Convert it to graph: `node toGraph ./gems.json`

Once the graph is ready you will have a `graph.out` file in the folder. Use it
to run the layouter:

``` shell
node layout.js ./graph.out
```

This will take around one hour and produce position files in the `data` folder.
Finally you need to convert the positions into binary format, which can be
understood by visualization:

``` shell
node toBinary ./graph.out
```

This will produce two files:

* `labels.json` - records all package names in a flat array
* `links.bin` - records all graph connections in a binary format.

These two files and the last positions file (`./data/100.pos`) needs to be copied
into the data folder of the visualization.

# license

MIT
