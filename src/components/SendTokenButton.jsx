import React from 'react';
import { useAuth } from '@clerk/clerk-react';

const SendTokenButton = () => {
  const { getToken } = useAuth();

  const sendToken = async () => {
    const token = await getToken();

    const res = await fetch('http://localhost:5000/api/secure', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      credentials: 'include', // Important to receive cookies from backend
      body: JSON.stringify({ message: 'Hello from frontend' }),
    });

    const data = await res.json();
    console.log(data);
  };

  return <button onClick={sendToken}>Send Token to Backend</button>;
};

export default SendTokenButton;
