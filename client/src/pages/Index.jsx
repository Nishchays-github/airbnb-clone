import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Index = () => {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    axios
      .get("https://airbnb-clone-api-eight.vercel.app/list-places", {
        withCredentials: true,
      })
      .then((res) => {
        setPlaces(res.data);
      })
      .catch((error) => {
        console.error("Error fetching places:", error);
      });
  }, []);

  return (
    <div className="mt-8 grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {places.length > 0 ? (
        places.map((place) => (
          <Link key={place._id} to={"/place/" + place._id}>
            <div className="bg-white rounded-2xl p-4 flex flex-col items-start">
              {place.photos?.[0] && (
                <img
                  src={`https://airbnb-clone-api-eight.vercel.app/uploads/${place.photos[0]}`}
                  alt={place.title}
                  className="rounded-2xl object-cover w-full h-40 mb-2"
                />
              )}
              <h3 className="text-sm font-bold">{place.address}</h3>
              <h2 className="text-lg truncate text-gray-500">{place.title}</h2>
              <div className="font-bold mt-1">${place.Price}</div>
            </div>
          </Link>
        ))
      ) : (
        <p>No places found.</p>
      )}
    </div>
  );
};

export default Index;
