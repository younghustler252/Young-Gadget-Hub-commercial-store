const handleError = (error) => {
    if (error.response) {
      
      return error.response.data.message || "Something went wrong!";
    } else if (error.request) {
      // No response from backend
      return "No response from server. Please try again.";
    } else {
      // Other errors (e.g. wrong axios config)
      return error.message;
    }
};

export default handleError;
