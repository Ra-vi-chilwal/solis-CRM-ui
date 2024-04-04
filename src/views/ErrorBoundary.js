import React, { useState } from 'react';

const ErrorBoundary = ({ children }) => {
  const [hasError, setHasError] = useState(false);

  const componentDidCatch = (error, errorInfo) => {
    // You can perform additional tasks here, like logging the error
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
    // Example: logErrorToMyService(error, errorInfo);
    setHasError(true);
  };

  if (hasError) {
    return (
      <div>
        <h1>Something went wrong.</h1>
        <p>Please try again or contact support.</p>
      </div>
    );
  }

  return children;
};

export default ErrorBoundary;
