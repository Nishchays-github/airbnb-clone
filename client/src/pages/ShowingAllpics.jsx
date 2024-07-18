import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import PlacePage from "./PlacePage";

const ShowingAllPics = () => {
  const { id } = useParams();
  const [pics, setPics] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchPics = async () => {
      try {
        const response = await axios.get(
          `https://airbnb-clone-api-eight.vercel.app//photos/${id}`
        );
        setPics(response.data); // Assuming response.data is an array of photo filenames
        setLoading(false); // Update loading state after fetching data
      } catch (error) {
        console.error("Error fetching photos:", error);
        setLoading(false); // Handle error by updating loading state
      }
    };

    fetchPics();
  }, [id]);

  if (loading) {
    return <p>Loading photos...</p>; // Display loading message while fetching data
  }

  return (
    <div className="relative">
      <h2>Photos of the Place</h2>
      <Link
        to={"/place/" + id}
        className="absolute top-0 right-0 mr-4 w-40 h-10 bg-black text-red-400 opacity-40 rounded-full flex items-center justify-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6 bg-black text-white"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
        close photos
      </Link>
      <div className="grid grid-cols-3 gap-4 mt-8 bg-slate-100 rounded-lg">
        {pics.map((photo, index) => (
          <div key={index} className="flex justify-center items-center">
            <img
              className="w-full h-full object-cover rounded-lg"
              src={`https://airbnb-clone-api-eight.vercel.app//uploads/${photo}`}
              alt={`Photo ${index + 1}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShowingAllPics;
