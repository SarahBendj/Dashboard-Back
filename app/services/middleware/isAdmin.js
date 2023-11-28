const ApiError = require("../../errorHandler/CoreError");
const jwt_decode = require('jwt-decode')


const isAdmin = (request, _ ,next) => {

        const authHeader = request.headers["authorization"];
        if (!authHeader) {
            return next(new ApiError("Authorization header is missing", 401));
        }
    
        const token = authHeader.split(" ")[1];
        
        try {
            const decoded_token = jwt_decode(token);
            if (decoded_token.role === 'admin') {
                request.user = { role: 'admin' }; // Set the user's role
                next();
            } else {
                return next(new ApiError("Unauthorized - User is not an admin", 403));
            }
        } catch (error) {
            return next(new ApiError("Invalid token", 401));
        }
    };
   

module.exports = isAdmin;