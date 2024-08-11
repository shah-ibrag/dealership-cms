import { useState } from "react";

export const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSignInClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <header>
        <div className="header-content">
          <h1>Dealership CMS</h1>
          <p>Content Management For Dealerships</p>
        </div>
      </header>
      <nav id="menu">
        <ul>
          <li>
            <a href="/">Listings</a>
          </li>
          <li>
            <a href="/categories">Categories</a>
          </li>
          <li>
            <a href="#">Search</a>
          </li>
          <li>
            <a href="/login">Login</a>
          </li>
        </ul>
      </nav>
    </>
  );
};