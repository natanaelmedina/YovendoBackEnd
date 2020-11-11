const handleRequestError = function (request, h, err) {
    console.log("err: ", err);
    if (err.isJoi && Array.isArray(err.details) && err.details.length > 0) {
        const errorMessages = err.details.map(e => e.message.replace(/\"/g, ""))
        return buildResponse(h, 400, false, errorMessages)
    }
    return h.response().takeover()
}

const buildResponse = (h, code = 200, success, message, data = null) => {
    return h
      .response({
        success,
        message,
        data
      })
      .code(code)
      .takeover()
  }

module.exports={
    handleRequestError,
    buildResponse
}