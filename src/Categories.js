import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Header } from './Header';

const Categories = () => {
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get('http://localhost/getTypes.php')
            .then(response => {
                setCategories(response.data);
            })
            .catch(error => {
                setError(`There was an error fetching the categories: ${error.message}`);
                console.error("There was an error fetching the categories!", error);
            });
    }, []);

    return (
        <>
            <Header />
            <div className="container">
                <h1>Car Categories</h1>
                {error && <h2>{error}</h2>}
                <ul>
                    {categories.map(category => (
                        <li key={category.id}>
                            <h2>{category.type}</h2>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
};

export default Categories;