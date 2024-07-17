import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Bookingwidget from "./Bookingwidget";
const PlacePage = () => {
  const { id } = useParams();
  const [place, setplace] = useState("");
  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:4000/places/${id}`)
        .then((res) => {
          setplace(res.data);
        })
        .catch((error) => {
          console.error("Error fetching place:", error);
        });
    }
  }, [id]);

  return (
    <div className="mt-3 bg-gray-100 -mx-8 px-8 py-8">
      <h1 className="text-3xl">{place.title}</h1>
      <a
        target="_blank"
        className="block font-semibold underline"
        href={"https://maps.google.com/?q=" + place.address}
      >
        {place.address}
      </a>
      <div className="grid  gap-2 grid-cols-3 grid-rows-2 h-60vh w-70vw ml-40">
        <div className="col-span-2 row-span-2 ">
          {place.photos?.[0] && (
            <img
              className="w-full h-full object-cover rounded-lg"
              src={`http://localhost:4000/uploads/${place?.photos[0]}`}
              alt={place.title}
            />
          )}
        </div>
        {place.photos?.[1] && (
          <div>
            <img
              className="w-full h-full object-cover rounded-lg"
              src={`http://localhost:4000/uploads/${place?.photos[1]}`}
              alt={place.title}
            />
          </div>
        )}
        {place.photos?.[2] && (
          <div>
            <img
              className="w-full h-full object-cover rounded-lg"
              src={`http://localhost:4000/uploads/${place?.photos[2]}`}
              alt={place.title}
            />
          </div>
        )}
        <Link
          to={"/photos/" + place._id}
          className="absolute font-bold w-40 flex gap-1 right-72 bottom-48 bg-opacity-80 bg-red-600"
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
              d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
            />
          </svg>
          show more photos
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-8">
        <div>
          <h2 className="font-semibold text-2xl my-2">Description:</h2>
          <div className="my-4">{place.description}</div>
          Check-IN : {place.checkInTime}
          <br />
          Check-OUT : {place.checkOutTime}
          <br />
          Max -guests : {place.maxGuests}
          <br />
        </div>
        <Bookingwidget place={place} />
      </div>
      <div className="bg-white mt-4">
        <h2 className="font-semibold text-2xl">Extra Info:</h2>
        <div className="text-gray-500">{place.extraInfo}</div>
      </div>
    </div>
  );
};

export default PlacePage;
