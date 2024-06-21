// src/Success.jsx
import React from 'react';
import { useLocation } from 'react-router-dom';

const Success = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const code = queryParams.get('code');

  return (
    <div>
      {code === '00' ? (
        <h1>Payment Successful</h1>
      ) : (
        <h1>Payment Failed</h1>
      )}
      <p>Response Code: {code}</p>
    </div>
  );
};

export default Success;
