const ApiError = require("./CoreError");

const errorHandler = {
  async manage(err, request, response, next) {
    switch (err.code) {
      case "BadRequest":
        response.status(400).json("Bad request");
        break;
      case "NotFound":
        response.status(404).json("Page not found");
        break;
      case "Unauthorized":
        response.status(401).json("Unauthorized");
        break;
      case "Forbidden":
        response.status(403).json("Forbidden");
        break;
      default:
        response.status(err.code).json(err.message);
        break;
    }
  },
  _404(_, __, next) {
    next(new ApiError("NotFound", 404));
  },
};

module.exports = errorHandler;
