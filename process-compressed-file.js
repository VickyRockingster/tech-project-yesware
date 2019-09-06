'use strict'

const fs = require('fs')
const JSZip = require('jszip')

const getFileInfo = function (file) {
  const fileInfo = {
    uniqueFullNames: [],
    completelyUniqueFullNames: [],
    modifiedUniqueFullNames: [],
    mostCommonLastNames: [],
    mostCommonFirstNames: []
  }
  const lastNamesObject = Object.create(null)
  const firstNamesObject = Object.create(null)
  // Split the contents into an array of lines(as strings),and then filter out
  // the lines that start with a space and any lines that is an empty string
  const fileArrayOfLines = file.split('\n').filter(line => !line.startsWith(' ') && line !== '')
  fileArrayOfLines.map((line, i) => {
    // Makes each line an array with 2 elements: the last and first names, respectively
    const arrayOfFullName = line.split(' ').slice(0, 2)
    // Each full name becomes a string, formatted as "last, first"
    const stringOfFullName = arrayOfFullName.join(' ').toString()
    if (i !== 0) {
      // if the full unique name is not already in full unique name array, then
      // add it
      if (!fileInfo.uniqueFullNames.includes(stringOfFullName)) {
        fileInfo.uniqueFullNames.push(stringOfFullName)
      }
      // last name, first name can be false, false; true, false; false, true; or
      // true, true, respectively, where true means that key already exists in
      // the respective object and false means it doesn't. If the name as key is
      // true, then add 1. If it is false, add the name as a key to the respective
      // object. If both last and first names are false, then that is the first
      // instance of that completely unique name, and it will be added to the
      // completely unique array
      if (lastNamesObject[arrayOfFullName[0]] && firstNamesObject[arrayOfFullName[1]]) {
        lastNamesObject[arrayOfFullName[0]]++
        firstNamesObject[arrayOfFullName[1]]++
      } else if (!lastNamesObject[arrayOfFullName[0]] && firstNamesObject[arrayOfFullName[1]]) {
        lastNamesObject[arrayOfFullName[0]] = 1
        firstNamesObject[arrayOfFullName[1]]++
      } else if (lastNamesObject[arrayOfFullName[0]] && !firstNamesObject[arrayOfFullName[1]]) {
        lastNamesObject[arrayOfFullName[0]]++
        firstNamesObject[arrayOfFullName[1]] = 1
      } else {
        lastNamesObject[arrayOfFullName[0]] = 1
        firstNamesObject[arrayOfFullName[1]] = 1
        // Here is where you can change how long you want your array of completely
        // unique names. Also populates the modifiedUniqueFullNames array, which
        // will later be modified.
        if (fileInfo.completelyUniqueFullNames.length < 25) {
          fileInfo.completelyUniqueFullNames.push(stringOfFullName)
          fileInfo.modifiedUniqueFullNames.push(arrayOfFullName)
        }
      }
    } else {
      // when I first start looping through the fileArrayOfLines, on the first
      // element, there will be nothing in any of the arrays/objects tracking
      // unique names so I'll just set the values of this first name in the
      // respective array/objects
      lastNamesObject[arrayOfFullName[0]] = 1
      firstNamesObject[arrayOfFullName[1]] = 1
      fileInfo.uniqueFullNames.push(stringOfFullName)
      fileInfo.completelyUniqueFullNames.push(stringOfFullName)
      fileInfo.modifiedUniqueFullNames.push(arrayOfFullName)
    }
  })
  // Saves the first name of the first element in the modifiedUniqueFullNames array
  const firstName = fileInfo.modifiedUniqueFullNames[0][1]
  // Reassigns the value of the the first 24 first names to the first name of the
  // next element. Assigns the value of the last element's first name to the saved
  // initial first name of the first element. After reassigning the value of the
  // first names, than turn each name array element back into a string and print
  // the modified name array to the console
  for (let i = 0; i < fileInfo.modifiedUniqueFullNames.length; i++) {
    if (i !== (fileInfo.modifiedUniqueFullNames.length - 1)) {
      fileInfo.modifiedUniqueFullNames[i][1] = fileInfo.modifiedUniqueFullNames[i + 1][1]
      fileInfo.modifiedUniqueFullNames[i] = fileInfo.modifiedUniqueFullNames[i].join(' ')
    } else {
      fileInfo.modifiedUniqueFullNames[i][1] = firstName
      fileInfo.modifiedUniqueFullNames[i] = fileInfo.modifiedUniqueFullNames[i].join(' ')
    }
  }
  // Makes an array of all the unique last names and iterates through them
  const lastNamesArray = Object.keys(lastNamesObject)
  for (let i = 0; i < lastNamesArray.length; i++) {
    const lastNameElement = lastNamesArray[i]
    // Once the mostCommonLastNames array has 10 elements, then find the last name
    // that points to the smallest value in lastNamesObject and compare that value
    // to the value that the current last name in the lastNamesArray points to.
    // If the latter is bigger, than replace that element in the mostCommonLastNames
    // array with the current one from lastNamesArray
    if (fileInfo.mostCommonLastNames.length >= 10) {
      const smallestLastNameValue = fileInfo.mostCommonLastNames.reduce((acc, lastName) => {
        return lastNamesObject[lastName] < lastNamesObject[acc] ? lastName : acc
      })
      if (lastNamesObject[lastNameElement] > lastNamesObject[smallestLastNameValue]) {
        fileInfo.mostCommonLastNames[fileInfo.mostCommonLastNames.indexOf(smallestLastNameValue)] = lastNameElement
      }
    } else {
      // push the first ten last names into the mostCommonLastNames array
      fileInfo.mostCommonLastNames.push(lastNameElement)
    }
  }
  // Do the same as above, but with the firstNamesObject
  const firstNamesArray = Object.keys(firstNamesObject)
  for (let i = 0; i < firstNamesArray.length; i++) {
    const firstNameElement = firstNamesArray[i]
    if (fileInfo.mostCommonFirstNames.length >= 10) {
      const smallestFirstNameValue = fileInfo.mostCommonFirstNames.reduce((acc, firstName) => {
        return firstNamesObject[firstName] < firstNamesObject[acc] ? firstName : acc
      })
      if (firstNamesObject[firstNameElement] > firstNamesObject[smallestFirstNameValue]) {
        fileInfo.mostCommonFirstNames[fileInfo.mostCommonFirstNames.indexOf(smallestFirstNameValue)] = firstNameElement
      }
    } else {
      fileInfo.mostCommonFirstNames.push(firstNameElement)
    }
  }
  const output = `There are ${firstNamesArray.length} unique first names. \n
  There are ${lastNamesArray.length} unique last names.\n
  There are ${fileInfo.uniqueFullNames.length} unique full names. \n
  The first ${fileInfo.completelyUniqueFullNames.length} completely unique names are: \n
  ${fileInfo.completelyUniqueFullNames.join('; ')} \n
  The ${fileInfo.modifiedUniqueFullNames.length} modified unique names are: \n
  ${fileInfo.modifiedUniqueFullNames.join('; ')} \n
  The ten most common last names are: \n
  ${fileInfo.mostCommonLastNames.join(' ')} \n
  The ten most common first names are: \n
  ${fileInfo.mostCommonFirstNames.join(', ')} \n`
  console.log(output)
  return output
}

const outFilePromise = function (outFile, output) {
  return new Promise((resolve, reject) => {
    fs.writeFile(outFile, output, { flag: 'w' }, (error, output) => {
      if (error) {
        reject(error)
      }
      resolve(output)
    })
  })
}

const readFile = function (inFile, outFile) {
  fs.readFile(inFile, (err, data) => {
    if (err) throw (err)
    const zipFile = new JSZip()
    zipFile.loadAsync(data)
      .then(contents => {
        Object.keys(contents.files).forEach(function (filename) {
          zipFile.file(filename).async('string')
            .then(getFileInfo)
            .then(output => outFilePromise(outFile, output))
            .catch(error => console.log(error))
        })
      })
  })
}

module.exports = readFile
