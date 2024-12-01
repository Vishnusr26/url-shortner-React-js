import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../store/AuthSlice';
import { useHistory, Link } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const history = useHistory();

  const handleLogin = () => {
    if (!email || !password) {
      alert('Please fill in both fields');
      return;
    }

    // Retrieve user data from localStorage
    const storedUser = JSON.parse(localStorage.getItem(email));

    if (storedUser && storedUser.email === email && storedUser.password === password) {
      dispatch(login({ email }));
      history.push('/'); // Redirect to home page after successful login
    } else {
      alert('Invalid email or password');
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Login</h2>
              <form>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <button type="button" className="btn btn-primary w-100" onClick={handleLogin}>Login</button>
              </form>
              <p className="text-center mt-3">
                Don't have an account? <Link to="/signup">Sign up here</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
