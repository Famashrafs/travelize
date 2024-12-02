// components/Loading.js
import React from 'react';
import loading from "../images/loading.gif"
const Loading = () => (
  <div className="loading-container">
    {/* <div className="spinner"></div> */}
    <img src={loading} alt='loading' />
  </div>
);

export default Loading;
