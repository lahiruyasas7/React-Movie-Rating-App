import React from "react";

const footer = () => {
  return (
    <footer className="grid grid-cols-4">
      <div>
        <h5>The Basics</h5>
        <ul>
          <li>About Us</li>
          <li>Our Services</li>
          <li>Privacy Policy</li>
          <li>System status</li>
        </ul>
      </div>
      <div>
        <h5>Get Involved</h5>
        <ul>
          <li>Add new movie</li>
          <li>Add new Tv series</li>
        </ul>
      </div>
      <div>
        <h5>Community</h5>
        <ul>
          <li>Guidelines</li>
          <li>Discussion</li>
          <li>Leader board</li>
        </ul>
      </div>
      <div>
        <h5>Follow Us</h5>
        <ul className="flex gap-4">
          <li>fb</li>
          <li>twitter</li>
          <li>instagram</li>
          <li>Linkedin</li>
        </ul>
      </div>
    </footer>
  );
};

export default footer;
