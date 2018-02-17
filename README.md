# Auto Form

This project is an experiment in finding the best automated way of completing an HTML form.

I'm using [CasperJS](http://docs.casperjs.org/en/latest/index.html) a navigation scripting & testing utility for the [PhantomJS](http://phantomjs.org/) headless browser.

Although I could get a JS script to complete the form within the browser (see `autoForm.js`). I really wanted a way of working with an existing application independently.

So, I created two steps. The first creates JSON data from [randomuser.me](https://randomuser.me/), the second imports that data and enters it to complete the form.

I'm using my [ng-queue-app](https://github.com/russellf9/ng-queue-app) to provide the form.


## Installation and Deployment

    npm install

    # Run each of the following in separate terminal tabs

    # create the data
    node exportData.js

    # Build the ng2-queue application
    ng build --watch

    # Run the ng2-queue application in a localhost browser
    cd ng2-simple-queue
    npm run serve

    # To add Users from the generated data
    cd ng2-simple-queue
    casperjs ng2-queue.js



## Issues

I wasn't able to fully implement ES6 within CasperJS despite adding a polyfill:

    const casper = require('casper').create({
        clientScripts: 'node_modules/babel-polyfill/dist/polyfill.js',
        verbose: true,
        logLevel: "debug"
    });

----

 PhantomJS uses it's own version of Filestream so running the `ng2-queue` App will cause an error:

     CasperError: Can't find module fs

So currently I've been adding and removing the fs dependency like so:

    # to run the `exportData` App
    npm install fs
    node exportData.js

    # to run the `ng2-queue` runApp
    npm uninstall fs
    casperjs ng2-queue.js


## Further improvements

* [ ] Make the exporting of data more dynamic
* [ ] Fix the fs issue

## License

The MIT License (MIT)

Copyright (c) 2018 Russell Wenban

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
