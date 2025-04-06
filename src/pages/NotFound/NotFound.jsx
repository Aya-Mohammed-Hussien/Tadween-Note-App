import React from "react";
import { Link } from "react-router-dom";
import { FaRegFileAlt } from "react-icons/fa";
import { Helmet } from "react-helmet";

const NotFound = () => {
  return (
    <>
      <Helmet>
        <title>NotFound Page</title>
      </Helmet>
      <div className="flex items-center justify-center h-screen bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white px-10">
        <div className="text-center py-6 px-4 max-w-3xl w-full bg-white dark:bg-gray-700 rounded-xl shadow-lg">
          <div className="flex flex-row justify-center items-center gap-2">
          <div className="text-4xl md:text-6xl mb-4 text-gray-500 dark:text-gray-300">
            <FaRegFileAlt />
          </div>
          <h1 className="text-xl text-nowrap md:text-4xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
            Oops! Page Not Found
          </h1>
          </div>
          <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 mb-6">
            The page you're looking for doesn't seem to exist. Maybe you took a
            wrong note!
          </p>
          <Link
            to="/"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all"
          >
            Go Back to Notes
          </Link>
        </div>
      </div>
    </>
  );
};

export default NotFound;
