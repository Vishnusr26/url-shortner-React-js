import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addUrl } from '../../store/UrlSlice';
import { useHistory } from 'react-router-dom';

function AddUrl() {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const dispatch = useDispatch();
  const history = useHistory();
  const urls = useSelector((state) => state.urls.urls);

  const currentUser = JSON.parse(localStorage.getItem('user'))
  const email = currentUser.email

  const currentUserEntries = urls.filter((entries) => 
    entries.email === email
  )
  console.log(currentUserEntries)

  const handleAddUrl = () => {
    if (title && currentUserEntries) {
      console.log(currentUserEntries)
      if (currentUserEntries.length >= 5) {
        alert('You can only add up to 5 URLs.');
      } else {
        dispatch(addUrl({ title, url, email }));
        history.push('/urls'); // Redirect to the URL list page after adding a URL
      }
    } else {
      alert('Please fill in both fields.');
    }
  };

  return (
    <div className="container mt-5">
    <div className="row justify-content-center">
      <div className="col-md-6">
        <div className="card shadow">
          <div className="card-body">
            <h2 className="card-title text-center mb-4">Add URL</h2>
            <form>
              <div className="mb-3">
                <label htmlFor="title" className="form-label">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  placeholder="Enter title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="url" className="form-label">URL</label>
                <input
                  type="text"
                  className="form-control"
                  id="url"
                  placeholder="Enter URL"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                />
              </div>
              <button
                type="button"
                className="btn btn-primary w-100"
                onClick={handleAddUrl}
              >
                Add URL
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
}

export default AddUrl;
