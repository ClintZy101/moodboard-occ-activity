import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://localhost:5001/api/moodboard"; // Update with your backend URL

export default function Moodboard() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({ photoUrl: "", caption: "" });

  const fetchMoodboardItems = async () => {
    try {
      const response = await axios.get(API_URL);
      setItems(response.data);
    } catch (err) {
      console.error("Error fetching moodboard items:", err);
    }
  };

  useEffect(() => {
    fetchMoodboardItems();
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
    const response =  await axios.post(API_URL, newItem);
      setItems((prev) => [...prev, response.data]); // Add new item to state
      setNewItem({ photoUrl: "", caption: "" }); // Reset form
    } catch (err) {
      console.error("Error adding moodboard item:", err);
    }
  };

  return (
    <div className="p-5 w-full grid place-items-center ">
      <div>
        <h1 className="text-2xl font-bold mb-5">Moodboard</h1>

        <form onSubmit={handleSubmit} className="mb-10 space-y-3">
          <input
            type="text"
            placeholder="Photo URL"
            value={newItem.photoUrl}
            onChange={(e) =>
              setNewItem({ ...newItem, photoUrl: e.target.value })
            }
            className="border p-2 w-full"
            required
          />
          <input
            type="text"
            placeholder="Caption"
            value={newItem.caption}
            onChange={(e) =>
              setNewItem({ ...newItem, caption: e.target.value })
            }
            className="border p-2 w-full"
            required
          />
          <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 px-4 w-full">
            Add to Moodboard
          </button>
        </form>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 ">
        {items.map((item) => (
          <div key={item._id} className="border p-3 rounded shadow-md">
            <img
              src={item.photoUrl}
              alt={item.caption}
              className="w-full h-40 object-cover mb-2"
            />
            <p className="text-lg">{item.caption}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
