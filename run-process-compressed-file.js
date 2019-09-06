'use strict'

const readFile = require('./process-compressed-file.js')

const inFile = process.argv[2]
const outFile = process.argv[3]

if (!outFile) {
  throw new Error('Script requires two arguments, an input and an output file')
}

readFile(inFile, outFile)
// readFile(inFile)
