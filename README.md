[![General Assembly Logo](https://camo.githubusercontent.com/1a91b05b8f4d44b5bbfb83abac2b0996d8e26c92/687474703a2f2f692e696d6775722e636f6d2f6b6538555354712e706e67)](https://generalassemb.ly/education/web-development-immersive)

# Introduction to the Node API

## Prerequisites

- Familiarity with JavaScript as a language.
- Familiarity with JavaScript in the browser environment.

## Objectives

By the end of this, developers should be able to:

- Reference the Node API documentation for using JavaScript outside the
    browser.
- Reference the MDN JavaScript documentation for JavaScript language features.
- Write a Node script using the File System API.

## Preparation

1. Fork and clone this repository.
 [FAQ](https://git.generalassemb.ly/ga-wdi-boston/meta/wiki/ForkAndClone)
1. Create a new branch, `training`, for your work.
1. Checkout to the `training` branch.
1. Install dependencies with `npm install`.

## JavaScript, the Browser, and Node

- JavaScript: a language specified by ecma and implemented independently
- Browser: an environment for running JavaScript (among other things)
- Node: an environment for running JavaScript outside the browser

Somewhat valid equations:

```txt
Browser = JavaScript + Browser API + (other things)

Node = JavaScript + CLI/Server API
```

How are the two environments similar? How do they differ?

## Lab: Research the File System API

Take a few minutes to read the following API documentation for the Node File
System module.

While you're reading, imagine how you'd use each function. Write some example
code in your notebook. Try to explain what each function does in your own words,
including what sorts of arguments it takes and each argument's type.

If you finish early, look for other interesting functions in the File System
module.

1. [`fs.readdir(path, callback)`](https://nodejs.org/dist/latest-v4.x/docs/api/fs.html#fs_fs_readdir_path_callback)
1. [`fs.readdirSync(path)`](https://nodejs.org/dist/latest-v4.x/docs/api/fs.html#fs_fs_readdirsync_path)
1. [`fs.readFile(file[, options], callback)`](https://nodejs.org/dist/latest-v4.x/docs/api/fs.html#fs_fs_readfile_file_options_callback)
1. [`fs.writeFile(file, data[, options], callback)`](https://nodejs.org/dist/latest-v4.x/docs/api/fs.html#fs_fs_writefile_file_data_options_callback)

## Discussion

Use your developer skills to search for the relevant documentation on each
of the following; are these methods part of JavaScript, Node, or the browser?

- `readline`
- `Math.random`
- `fs.readFile`
- `http.ClientRequest`
- `alert`
- `new Promise`

## Demo: Simple Node Scripts

We'll start with a very simple Node script. The file `bin/hello-world.js`
contains only one meaningful line of JavaScript. It prints "Hello world!" to the
console. Normally, we would need a browser to execute this code. But if we run
the file with `node bin/hello-world.js`, it executes the file outside of the
browser.

**This is what Node is for.** It's a JavaScript runtime that isn't tied to a
browser. It lets us write Javascript and execute it like we would Ruby or any
other standard programming language.

We'll frequently need to pass some input into the scripts that we write with
Node. Think about `atom myFolderToOpen`, for example. It's not written in Node,
but it is essentially a script that accepts arguments from the command line. It
wouldn't be very useful if we couldn't tell it what to open! When we open files
or folders in atom we pass in a path to that file or folder as an _argument_.
Let's takea look at `bin/process-argv.js` to get a sense of how arguments
work in Node.

Because Node can run JavaScript on our local machines instead of the browser, it
can do things like read files from the filesystem. Watch as I code out a
simple script to read a file from the disk and print it to the console.

## Annotate-Along: `lib/copy-json.js`

## Code-Along: `hey-yall.js`

A more advanced "Hello, World!" with the Node file system API.

Write a Node.js command line function. It will take each line in from
`names.txt`, and output "Hey " plus the name from each line one at a time to
the command line.

## Lab: Write a Randomizer

Randomize the lines in a file.

1. Accept an input file and an output file name
2. Shuffle the contents of the input file
3. Create a **new file** to store the shuffled contents

How do you shuffle an array?

A common approach is called the Fisher-Yates Shuffle (aka the Knuth Shuffle).
Install the [knuth-shuffle](https://www.npmjs.com/package/knuth-shuffle) package
with `npm install knuth-shuffle`. Then use the `knuth-shuffle` package to
complete this lab.

Run your code using: `node bin/randomizer.js data/names.txt data/random_names.txt`

### Stretch Lab: Saving User Input

Write a Node script that prompts the user to enter some text into their terminal,
then writes that text to a file. You will need to create a bin file and a lib
file. The script should accept a filepath as an argument. This is where the text
will be saved. The script should not use process.argv to accept that text from
the user. Instead, you should research how to prompt the user for input in
Node.js.

## Additional Resources

- [Docs | Node.js](https://nodejs.org/en/docs/)
- [JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- [Awesome Node.js packages](https://github.com/sindresorhus/awesome-nodejs)
- [NodeSchool](http://nodeschool.io/)
- [Fisher-Yates shuffle](https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle),
 aka Knuth shuffle.
- [Callback Hell](http://www.callbackhell.com/)

## [License](LICENSE)

1. All content is licensed under a CC­BY­NC­SA 4.0 license.
1. All software code is licensed under GNU GPLv3. For commercial use or
    alternative licensing, please contact legal@ga.co.
