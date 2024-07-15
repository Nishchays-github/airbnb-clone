import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams ,Link} from "react-router-dom";

const BookingInfo = () => {
  const { id } = useParams();
  const [place, setPlace] = useState(null);

  useEffect(() => {
    const fetchPlace = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/places/${id}`);
        setPlace(res.data);
      } catch (error) {
        console.error("Error fetching place data:", error);
      }
    };

    fetchPlace();
  }, [id]);

  if (!place) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>This is booking info of {place._id}</h1>
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
          className="absolute w-40 flex gap-1 right-72 bottom-48 bg-opacity-40"
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
      
    </div>
  );
};

export default BookingInfo;
