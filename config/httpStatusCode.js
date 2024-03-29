module.exports = {
    INFOMATIONAL_RESPONSE: {
      CONTINUE: 100,
    },
    SUCCESS: {
      OK: 200,
      CREATED: 201,
      ACCEPTED: 202,
      NO_CONTENT: 204,
    },
    REDIRECTION: {
      MULTIPLE_CHOICES: 300,
    },
    CLIENT_ERRORS: {
      BAD_REQUEST: 400,
      UNAUTHORIZED: 401,
      PAYMENT_REQUIRED: 402,
      FORBIDDEN: 403,
      NOT_FOUND: 404,
      METHOD_NOT_ALLOWED: 405,
    },
    SERVER_ERRORS: {
      INTERNAL_SERVER_ERROR: 500,
    },
    PROCESS:{
      link: "mongodb+srv://<username>:<password>@cluster0.nhxhu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
    }
  };