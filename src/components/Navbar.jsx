

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/AuthSlice';
import { Link, useHistory } from 'react-router-dom';

function Navbar() {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState('');
  const history = useHistory();

  // const handleSearch = (e) => {
  //   e.preventDefault();
  //   if (searchQuery) {
  //     history.push(`/search?query=${encodeURIComponent(searchQuery)}`);
  //     setSearchQuery('')
  //   }
  // };

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('user');
    history.push('/'); // Redirect to homepage after logout
  };

  return (
    <nav className="navbar navbar-expand-md navbar-transparent bg-transparent">
      <div className="container-fluid">
        <h1><strong><em className="navbar-brand text-white">URL SHORTNER</em></strong></h1>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              {user ? (
                <>
                  <li className="nav-item">
                    <Link className="nav-link text-white" to="/"><strong>Home</strong></Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link text-white" to="/add-url"><strong>AddURL</strong></Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link text-white" to="/urls"><strong>ListURL</strong></Link>
                  </li>
                  {/* <li className="nav-item">
                    <form className="d-flex">
                      <input
                        type="text"
                        className="form-control me-2"
                        placeholder="Search URLs..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                      <button className="btn btn-outline-light" type="submit"><strong>Search</strong></button>
                    </form>
                  </li> */}
                  <li className="nav-item">
                    <button className="btn btn-outline-danger ms-2" onClick={handleLogout}><strong>Logout</strong></button>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <strong><Link className="nav-link text-white" to="/signup">Signup</Link></strong>
                  </li>
                  <li className="nav-item">
                  <strong><Link className="nav-link text-white" to="/login">Login</Link></strong>
                  </li>
                </>
              )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

