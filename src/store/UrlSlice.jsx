import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  urls: JSON.parse(localStorage.getItem('urls')) || [],
};

const UrlSlice = createSlice({
  name: 'urls',
  initialState,
  reducers: {
    addUrl: (state, action) => {
      // if (state.curre.length >= 5) {
      //   alert('Maximum of 5 URLs allowed');
      //   return;
      // }
      const newUrl = {
        id: Date.now(),
        ...action.payload,
        shortUrl: Math.random().toString(36).substring(7), // simple short URL generator
        createdAt: new Date().toISOString(),
      };
      state.urls.push(newUrl);
      localStorage.setItem('urls', JSON.stringify(state.urls));
    },
    editUrl: (state, action) => {
      const index = state.urls.findIndex(url => url.id === action.payload.id);
      if (index !== -1) {
        state.urls[index] = { ...state.urls[index], ...action.payload };
        localStorage.setItem('urls', JSON.stringify(state.urls));
      }
    },
    deleteUrl: (state, action) => {
      state.urls = state.urls.filter(url => url.id !== action.payload);
      localStorage.setItem('urls', JSON.stringify(state.urls));
    },
  },
});

export const { addUrl, editUrl, deleteUrl } = UrlSlice.actions;
export default UrlSlice.reducer;
