# Usage

First, make sure you have all the dependencies installed:
```sh
npm install && bower install
```

To prepare your front dependencies, required once time, run tasks vendorJS and vendorCSS with:

```sh
gulp vendorJS vendorCSS
```


And to start application in development environment, run task default from gulp:

```sh
gulp
```

If you want open on browser automatically, use flag open, like below:
```sh
gulp --open
```
Browser is editable on gulpfile.


Scripts on package.json

Start process with Nodemon:
```sh
npm start
```

Running test specs (start application before, then):
```sh
npm test
```
