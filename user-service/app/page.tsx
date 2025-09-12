"use client";

import { useEffect, useState } from 'react';

const UserPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  useEffect(() => {
    // Call User Service API to validate user authentication
    fetch('http://localhost:3001/api/register', {
      method: 'GET',
    })
      .then((response) => {
        if (response.ok) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        setIsAuthenticated(false);
      });
  }, []);
  console.log(isAuthenticated);
  if (!isAuthenticated) {
    return <div>Please log in to see the users.</div>;
  }
};

export default UserPage;