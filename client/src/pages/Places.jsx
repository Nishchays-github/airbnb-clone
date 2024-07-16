import { Link, useParams } from "react-router-dom";
import PlacesForm from "./PlacesForm";
import AccountNav from "./AccountNav";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { userContext } from "../userContext";

const Places = () => {
  const [places, setPlaces] = useState([]);
  const { action } = useParams();
  const userclass = useContext(userContext);
  const { user } = userclass;
  useEffect(() => {
    fetchPlaces();
  }, []);

  const fetchPlaces = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/places?Email=${user.Email}`
      );
      setPlaces(response.data);
    } catch (error) {
      console.error("Error fetching places:", error);
    }
  };

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
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
            <div>Add new places</div>
          </Link>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {places.length > 0 &&
              places.map((place) => (
                <Link
                  to={"/account/places/" + place._id}
                  className="flex cursor-pointer bg-gray-100 rounded-2xl overflow-hidden"
                  key={place._id}
                >
                  <div className="w-48 h-32 relative">
                    {place.photos.length > 0 && (
                      <img
                        className="object-cover w-full h-32 rounded-t-2xl"
                        src={`http://localhost:4000/uploads/${place?.photos[0]}`}
                        alt={place.title}
                      />
                    )}
                  </div>
                  <div className="p-4 flex flex-col justify-between">
                    <h2 className="text-xl font-semibold mb-2">
                      {place.title}
                    </h2>
                    <p className="text-sm line-clamp-3">
                      {place.description.length > 100
                        ? `${place.description.substring(0, 100)}...`
                        : place.description}
                    </p>
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
