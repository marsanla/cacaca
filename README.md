# Casumo task (Angularjs + webpack)
### By Marcos Sanz Latorre


## How to generate 1 million random items?
I develop a module to generate a bunch of elements. I am supporting Open-source so I uploaded to NPM, to allow the rest of the users to download. Find it here:

```shell
npm install -g faking
```

## Let's come back to the task?

### Install
Download or clone the repository:

    git clone https://github.com/marsanla/cacaca

Install global:

    sudo npm install -g gulp-cli

Install libraries:

    cd cacaca
    npm install

    cd server
    npm install


Launch the dev server

    gulp serve

Launch API

    gulp api

Generate fake data

    npm install -g faking
    gulp fake


### Notes

* To manage a huge list of elements in an infinite scroll, i used a virtual repeater for angularjs.
