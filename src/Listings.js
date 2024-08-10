import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './listings.css';
import { Link } from 'react-router-dom';

import { Header } from './Header';

const CarListings = () => {
    const [listings, setListings] = useState([]);

    useEffect(() => {
        axios.get('http://localhost/getListings.php')
            .then(response => {
                setListings(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching the listings!", error);
            });
    }, []);

    return (
        <>
        <Header/>
        <div className="container">
            <h1>Car Listings</h1>
            <ul>
                {listings.map(listing => (
                    <li key={listing.id}>
                        {/* <h2 href={`http://localhost/getCar.php?id=${listing.id}`}>{listing.make} {listing.model}</h2> */}
                        <Link to={`/id/${listing.id}`}>{listing.make} {listing.model}</Link>
                        <img src={`${process.env.PUBLIC_URL}/photos/${listing.img_path}`} alt='car image' />
                        <p>Type: {listing.type}</p>
                        <p>Price: ${listing.price}</p>
                        <p>Description: {listing.description}</p>
                    </li>
                ))}
            </ul>
        </div>
        </>
    );
};

export default CarListings;