import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import { Header } from "./Header";

const CarListing = () => {
  const [listing, setListing] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);

    axios
      .get(`http://localhost/getCar.php?id=${id}`)
      .then((response) => {
        setListing(response.data);

        setLoading(false);

        console.log(response.data);
      })
      .catch((error) => {
        setError("There was an error fetching the listing!");

        console.error("There was an error fetching the listing!", error);
      });
  }, []);

  return (
    <>
      <Header />
      <div className="container">
        <h1>Car Listing</h1>

        {error && <h2>Error fetching the listing</h2>}

        {loading && <h2>Loading...</h2>}

        {listing && (
          <div>
            <a>
              {listing.make} {listing.model}
            </a>
            <img
              src={`${process.env.PUBLIC_URL}/photos/${listing.img_path}`}
              alt="car image"
            />
            <p>Type: {listing.type}</p>
            <p>Price: ${listing.price}</p>
            <p>Description: {listing.description}</p>
          </div>
        )}
      </div>
    </>
  );
};

export default CarListing;
