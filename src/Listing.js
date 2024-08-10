import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './listings.css';

const CarListing = () => {
    const [listing, setListing] = useState(null);

    // useEffect(() => {
    //     axios.get(`http://localhost/getCar.php?id=${listing.id}`)
    //         .then(response => {
    //             setListings(response.data);
    //         })
    //         .catch(error => {
    //             console.error("There was an error fetching the listings!", error);
    //         });
    // }, []);

    return (
        <div className="container">
            <h1>Car Listing</h1>
            <ul>
                <li>
                    <a>{listing.make} {listing.model}</a>
                    <img src={`${process.env.PUBLIC_URL}/photos/${listing.img_path}`} alt='car image' />
                    <p>Type: {listing.type}</p>
                    <p>Price: ${listing.price}</p>
                    <p>Description: {listing.description}</p>
                </li>

            </ul>
        </div>
    );
};

export default CarListing;