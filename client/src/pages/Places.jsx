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
  async function delplace(id) {
    try {
      axios
        .delete(
          "https://airbnb-clone-api-eight.vercel.app//places-delete/" + id
        )
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch {
      console.log("cent delete");
    }
  }
  const { user } = userclass;
  useEffect(() => {
    fetchPlaces();
  }, []);

  const fetchPlaces = async () => {
    try {
      const response = await axios.get(
        `https://airbnb-clone-api-eight.vercel.app//places?Email=${user?.Email}`
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
                <div
                  className="flex flex-col cursor-pointer bg-gray-100 rounded-2xl overflow-hidden"
                  key={place._id}
                >
                  <Link
                    to={"/account/places/" + place._id}
                    className="flex-grow flex"
                  >
                    <div className="w-2/5 h-40 relative">
                      {place.photos.length > 0 && (
                        <img
                          className="object-cover w-full h-full"
                          src={`https://airbnb-clone-api-eight.vercel.app//uploads/${place?.photos[0]}`}
                          alt={place.title}
                        />
                      )}
                    </div>
                    <div className="w-4/5 p-4 flex flex-col justify-between">
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
                  <button
                    onClick={() => delplace(place._id)}
                    className="bg-red-600 hover:bg-red-800 text-white font-bold py-2 px-4 border border-blue-700 rounded w-full h-12 opacity-60"
                  >
                    Delete Listing
                  </button>
                </div>
              ))}
          </div>
          );
        </div>
      )}
      {action === "new" && <PlacesForm />}
    </div>
  );
};

export default Places;
