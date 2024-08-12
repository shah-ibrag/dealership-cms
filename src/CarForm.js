import React, { useState, useEffect } from "react";
import axios from "axios";
import { Header } from "./Header";

const CarForm = () => {
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [typeId, setTypeId] = useState("");
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");
  const [carTypes, setCarTypes] = useState([]);

  useEffect(() => {
    const fetchCarTypes = async () => {
      try {
        const response = await axios.get("http://localhost/getTypes.php");
        setCarTypes(response.data);
      } catch (error) {
        console.error("Error fetching car types:", error);
      }
    };

    fetchCarTypes();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("make", make);
    formData.append("model", model);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("type_id", typeId);
    formData.append("image", image);

    try {
      const response = await axios.post("http://localhost/setCar.php", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setMessage(response.data.message);
    } catch (error) {
      setMessage("Error: " + error.response.data.message);
    }
  };

  return (
    <>
      <Header />
      <form onSubmit={handleSubmit}>
        <div>
          <label>Make:</label>
          <input
            type="text"
            value={make}
            onChange={(e) => setMake(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Model:</label>
          <input
            type="text"
            value={model}
            onChange={(e) => setModel(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Price:</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <div>
          <label>Type:</label>
          <select
            value={typeId}
            onChange={(e) => setTypeId(e.target.value)}
            required
          >
            <option value="">Select a type</option>
            {carTypes.map((type) => (
              <option key={type.id} value={type.id}>
                {type.type}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Image:</label>
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            required
          />
        </div>
        <button type="submit">Add Car</button>
        {message && <p>{message}</p>}
      </form>
    </>
  );
};

export default CarForm;