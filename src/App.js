import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CarListings = () => {
    const [listings, setListings] = useState([]);

    useEffect(() => {
        axios.get('http://localhost/getListings.php')
            .then(response => {
                setListings(response.data);
                console.log(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching the listings!", error);
            });
    }, []);

    return (
        <div>
            <h1>Car Listings</h1>
            <ul>
                {listings.map(listing => (
                    <li key={listing.id}>
                        <h2>{listing.make} {listing.model}</h2>
                        <p>Type: {listing.type}</p>
                        <p>Price: ${listing.price}</p>
                        <p>Description: {listing.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CarListings;
