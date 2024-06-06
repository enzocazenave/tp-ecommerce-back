const { request, response } = require("express")
const { validationResult } = require("express-validator")
const { sendErrorResponse } = require("../adapters/http/sendResponse")

const fieldValidator = (req = request, res = response, next) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return sendErrorResponse(
      res, 
      400, 
      errors.array().reduce((acc, curr) => { 
        acc[curr.path] = curr.msg 
        return acc
      }, {})
    )
  }

  next()
}

module.exports = fieldValidator