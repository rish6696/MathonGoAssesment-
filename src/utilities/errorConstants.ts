export const NOT_FOUND = "NOT FOUND";

export const ERROR_STATUS_CODE= {
    BAD_REQUEST_CODE: 400,
    INTERNAL_SERVER_ERROR_CODE : 500,
    UNAUTHORIZED_REQUEST_CODE: 401 
} 


export const generateError = (error:any) => {
    if(error.message && error.stack) {
        error = {message: error.message, stack: error.stack};
    }
    if(typeof(error) === "object") {
        error = JSON.stringify(error);
    }
    return error;
};