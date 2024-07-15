import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import PlacesForm from "./PlacesForm";
import AccountNav from "./AccountNav";
import axios from "axios";

const Places = () => {
  const [places, setPlaces] = useState([]);
  const { action } = useParams();

  useEffect(() => {
    axios.get("http://localhost:4000/places").then(({ data }) => {
      setPlaces(data);
    });
  }, []);

  return (
    <div>
      <AccountNav />
      {action !== "new" && (
        <div className="text-center">
          <Link
            to={"/account/places/new"}
            className="bg-red-700 inline-flex gap-2 text-white py-2 px-6 rounded-full"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
            <div>Add new places</div>
          </Link>
          <div className="mt-4 ">
            {places.length > 0 &&
              places.map((place) => (
                <Link
                  to={"/account/places/" + place._id}
                  className="flex cursor-pointer gap-4 bg-gray-100 p-4 rounded-2xl"
                  key={place._id}
                >
                  <div className="flex w-32 h-32 bg-gray-300 grow shrink-0">
                    <div className="flex w-full h-32 bg-gray-300 mb-4">
                      {place.photos.length > 0 && (
                        <img
                          className="object-cover w-20 h-full rounded-2xl"
                          src={`http://localhost:4000/uploads/${place?.photos[0]}`}
                          alt={place.title}
                        />
                      )}
                    </div>
                    <div className="grow-0 shrink">
                      <h2 className="text-xl font-semibold mb-2">
                        {place.title}
                      </h2>
                      <p className="text-sm flex-grow overflow-hidden text-ellipsis">
                        {place.description.length > 100
                          ? `${place.description.substring(0, 100)}...`
                          : place.description}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      )}
      {action === "new" && <PlacesForm />}
    </div>
  );
};

export default Places;
