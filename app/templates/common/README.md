# Usage

First, make sure you have all the dependencies installed:
```sh
npm install && bower install
```

To start application, running:

```sh
gulp<% if (scriptType === 'coffeescript') { %> --require coffee-script/register<% } %>
```

If you want open on browser automatically, use flag open, like below:
```sh
gulp<% if (scriptType === 'coffeescript') { %> --require coffee-script/register<% } %> --open
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
