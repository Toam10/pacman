const Response = {

    // Success Responses
    success                 : {code: 1, message: 'success'},


    // Error responses 
    server_error            : {code: 2, message: 'internal server error'},
    username_taken          : {code: 3, message: 'username already taken'},
}

module.exports = { Response };