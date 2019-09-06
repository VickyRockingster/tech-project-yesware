'use strict'
// In order to run a file through my program, please run npm install in the
// command line, then run 'node run-process-file.js <relative path to data file> <output.txt>'
// You can save the data file to the data folder before running it if you wish.
// Also, you can name a relative path to write a new file. Otherwise, it will
// overwrite the current output.txt file, which has the file information for the
// data I was given. That information will also log to the comand line console.
const readFile = require('./process-regular-file.js')

const inFile = process.argv[2]
const outFile = process.argv[3]

if (!outFile) {
  throw new Error('Script requires two arguments, an input and an output file')
}

readFile(inFile, outFile)
