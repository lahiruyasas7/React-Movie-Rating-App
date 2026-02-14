import React from "react";
import { Link } from "react-router-dom";

const Page404 = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center p-5 text-white">
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <Link to="/">Go to Homepage</Link>
    </div>
  );
};

export default Page404;
