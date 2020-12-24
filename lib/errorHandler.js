'use strict'

function errorHandler(error) {
     console.error(error);
     throw new Error('Oops! something is wrong! Try again!')
}

module.exports = errorHandler