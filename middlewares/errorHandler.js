class HttpError extends Error {}

class BadRequestError extends HttpError {
  constructor(message = 'Bad request') {
    super(message);
    this.statusCode = 400;
  }
}

class DocumentNotFoundError extends HttpError {
  constructor(message = 'Not found') {
    super(message);
    this.statusCode = 404;
  }
}

class ForbiddenError extends HttpError {
  constructor(message = 'Access is forbidden') {
    super(message);
    this.statusCode = 403;
  }
}

const errorHandler = (err, _req, res, next) => {
  if (err instanceof HttpError) {
    res.status(err.statusCode).send({ message: err.message });
    next();
  } else {
    res.status(500).send({ message: err.message });
    next();
  }
};

export { ForbiddenError, DocumentNotFoundError, BadRequestError, errorHandler };
