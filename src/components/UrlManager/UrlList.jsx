import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUrl, editUrl } from '../../store/UrlSlice';
import DeleteUrlPopup from './DeleteUrlPopup';

function UrlList() {
  const urls = useSelector((state) => state.urls.urls);
  const dispatch = useDispatch();
  const [showPopup, setShowPopup] = useState(false);
  const [urlToDelete, setUrlToDelete] = useState(null);
  const [editMode, setEditMode] = useState(null);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedUrl, setEditedUrl] = useState('');
  const [query, setQuery] = useState(''); // State for search query

  const currentUser = JSON.parse(localStorage.getItem('user'));
  const email = currentUser.email;

  const currentUserEntries = urls.filter((entries) => entries.email === email);

  // Filter URLs based on the search query
  const filteredUrls = currentUserEntries.filter(
    (url) =>
      url.title.toLowerCase().includes(query.toLowerCase())
  );

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const urlsPerPage = 2;

  // Pagination logic
  const startIndex = (currentPage - 1) * urlsPerPage;
  const paginatedUrls = filteredUrls.slice(startIndex, startIndex + urlsPerPage);
  const totalPages = Math.ceil(filteredUrls.length / urlsPerPage);

  const handleDeleteClick = (url) => {
    setUrlToDelete(url);
    setShowPopup(true);
  };

  const handleDeleteConfirm = () => {
    if (urlToDelete) {
      dispatch(deleteUrl(urlToDelete.id));
      setShowPopup(false);
    }
  };

  const handleCancelDelete = () => {
    setShowPopup(false);
    setUrlToDelete(null);
  };

  const handleEditClick = (url) => {
    setEditMode(url.id);
    setEditedTitle(url.title);
    setEditedUrl(url.url);
  };

  const handleSaveClick = (id) => {
    if (editedTitle && editedUrl) {
      const newShortUrl = `${Math.random().toString(36).substr(2, 6)}`;
      const dateEdited = new Date().toISOString();

      dispatch(editUrl({ id, title: editedTitle, url: editedUrl, shortUrl: newShortUrl, createdAt: dateEdited,}));

      setEditMode(null);
    } else {
      alert('Please fill in both fields.');
    }
  };

  const handleCancelEdit = () => {
    setEditMode(null);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSearchChange = (e) => {
    setQuery(e.target.value); // Update the search query state
    setCurrentPage(1); // Reset to the first page on search
  };

  return (
    <div>
      <div className="container mt-5">
        <h2 className="mb-4 text-white text-center">ListURL</h2>
        <div className="d-flex justify-content-end">
          <label className='text-white mx-2 my-2'><strong>Search</strong></label>
          <input
            type="text"
            className="form-control me-2 mb-3 w-25"
            placeholder="Search URLs..."
            value={query}
            onChange={handleSearchChange} // Add onChange event handler
          />
        </div>

        <table className="table table-bordered">
          <thead className="thead-dark">
            <tr>
              <th>Id</th>
              <th>Title</th>
              <th>Short URL</th>
              <th>Original URL</th>
              <th>Created At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedUrls.map((url, index) => (
              <tr key={url.id}>
                <td>{startIndex + index + 1}</td>
                {editMode === url.id ? (
                  <>
                    <td>
                      <input
                        type="text"
                        className="form-control"
                        value={editedTitle}
                        onChange={(e) => setEditedTitle(e.target.value)}
                      />
                    </td>
                    <td>{url.shortUrl}</td>
                    <td>
                      <input
                        type="text"
                        className="form-control"
                        value={editedUrl}
                        onChange={(e) => setEditedUrl(e.target.value)}
                      />
                    </td>
                    <td>{new Date(url.createdAt).toLocaleString()}</td>
                    <td>
                      <button className="btn btn-success me-2" onClick={() => handleSaveClick(url.id)}>
                        Save
                      </button>
                      <button className="btn btn-secondary" onClick={handleCancelEdit}>
                        Cancel
                      </button>
                    </td>
                  </>
                ) : (
                  <>
                    <td>{url.title}</td>
                    <td>{url.shortUrl}</td>
                    <td>{url.url}</td>
                    <td>{new Date(url.createdAt).toLocaleString()}</td>
                    <td>
                      <button className="btn btn-outline-primary me-2" onClick={() => handleEditClick(url)}>
                        Edit
                      </button>
                      <button className="btn btn-outline-danger" onClick={() => handleDeleteClick(url)}>
                        Delete
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="pagination text-center justify-content-end mt-2">
          {totalPages > 1 && Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              className={`btn btn-outline-primary mx-1 ${currentPage === index + 1 ? 'active' : ''}`}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>

        <DeleteUrlPopup
          show={showPopup}
          urlTitle={urlToDelete?.title}
          onDeleteConfirm={handleDeleteConfirm}
          onCancel={handleCancelDelete}
        />
      </div>
    </div>
  );
}

export default UrlList;
