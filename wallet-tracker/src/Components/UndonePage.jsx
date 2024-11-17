import React from 'react';
import { Link } from 'react-router-dom';

const UndonePage = ({ title = 'Page Under Construction', message = 'This page is currently being worked on.' }) => (
  <div style={{ textAlign: 'center', marginTop: '50px', color: 'red' }}>
    <h1>{title}</h1>
    <p>{message}</p>
    <Link to="/">
      <button style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer', marginTop: '20px' }}>
        Go Back to Home
      </button>
    </Link>
  </div>
);

export default UndonePage;
