module.exports = (error, request, response, next) => {
  console.log(error);
  if (error.validationError) {
    return response.status(422).json({
      errors: error.errors
    });
  }

  return next(error);
};
