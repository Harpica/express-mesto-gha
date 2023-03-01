class HttpError extends Error {
  constructor(message) {
    super(message);
  }
}

class BadRequestError extends HttpError {
  constructor(message = "Bad request") {
    super(message);
    this.statusCode = 400;
  }
}

class DocumentNotFoundError extends HttpError {
  constructor(message = "Not found") {
    super(message);
    this.statusCode = 404;
  }
}

class ForbiddenError extends HttpError {
  constructor(message = "Доступ к ресурсу запрещен") {
    super(message);
    this.statusCode = 403;
  }
}

const errorHandler = (err, req, res, next) => {
  if (err instanceof HttpError) {
    res.status(err.statusCode).send({ message: err.message });
    next();
  } else {
    res.status(500).send({ message: err.message });
    next();
  }
};

export { ForbiddenError, DocumentNotFoundError, BadRequestError, errorHandler };
