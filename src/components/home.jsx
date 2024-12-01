import React from 'react';
import { useSelector } from 'react-redux';

function Home() {
  const user = useSelector((state) => state.auth.user);

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
  <div className="text-center text-white">
    {user ? (
      <>
        <h1>Welcome, {user.email}!</h1>
        <p>You can now manage your URLs.</p>
      </>
    ) : (
      <>
        <h1>Welcome to the URL Shortener</h1>
        <p>Please sign up or log in to start managing your URLs.</p>
      </>
    )}
  </div>
</div>

  );
}

export default Home;
