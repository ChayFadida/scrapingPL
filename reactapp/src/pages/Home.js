import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <section className="home">
      <h2>Welcome to 404 Brain Not Found Group</h2>
      <img src="/images/logo.jpg" alt="Logo of 404 Brain Not Found Group" />
      <div style={{ textAlign: 'center' }}>
        <Link to="/homework">
          <button className="navigate-button">HomeWork</button>
        </Link>
      </div>
    </section>
  );
};

export default Home;
