import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Header } from "./Header";
import Editor from 'react-simple-wysiwyg';


const CarListing = () => {
  const [listing, setListing] = useState(null);
  const [comments, setComments] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const [comment, setComment] = useState('');
  const [name, setName] = useState('');

  
  function onChange(e) {
    setComment(e.target.value);
  }

  function onSubmit(e) {
    e.preventDefault();
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Месяцы начинаются с 0
    const day = String(date.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    console.log(id, name, comment, formattedDate);
    axios.post(`http://localhost/setComment.php`, {
      listing_id: id,
      user: name,
      comment: comment,
      date: formattedDate

    })

    .then((response) => {
      console.log(response);
      setComments([...comments, {
        user: name,
        comment: comment,
        date: formattedDate
      }]);
    })
    .catch((error) => {
      console.error("There was an error adding the comment!", error);
    });
  }

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

  useEffect(() => {

    axios
      .get(`http://localhost/getComments.php?id=${id}`)
      .then((response) => {
        setComments(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the comments!", error);
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
              src={`localhost/photos/${listing.img_path}`}
              alt="car image"
            />
            <p>Type: {listing.type}</p>
            <p>Price: ${listing.price}</p>
            <p>Description: {listing.description}</p>
          </div>
        )}
      </div>
      <div className = "add-comment">
        <h2>Add a Comment</h2>
        <form>
          {/* <textarea name="comment" id="comment" required></textarea> */}
          <label htmlFor="user">Your name: </label>
          <input type="text" name="user" id="user" required onChange={(e) => setName(e.target.value)}/>
          <br />
          <br />
          <Editor value={comment} onChange={onChange} /> 
          <button type="button" onClick={onSubmit}>Add Comment</button>      
          {/* <input type="text" name="comment" id="comment" required />
          <button type="submit">Add Comment</button> */}
          
        </form>
      </div>
      <div className = "comments">
        <h2>Comments</h2>
        {comments && (
          <ul>
            {comments.map((comment, index) => (
              <li key={index}>
                <p dangerouslySetInnerHTML={{ __html: comment.comment }}></p>
                <p>By: {comment.user}</p>
                <p>Date: {comment.date}</p>
              </li>
            ))}
          </ul>
        )}
      </div>

    </>
  );
};

export default CarListing;
