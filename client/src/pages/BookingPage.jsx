import React, { useEffect, useState } from "react";
import AccountNav from "./AccountNav";
import axios from "axios";
import { differenceInCalendarDays, format } from "date-fns";
import { Link } from "react-router-dom";

const BookingPage = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await axios.get("http://localhost:4000/bookings");
      setBookings(response.data);
      setLoading(false);
    } catch (err) {
      setError("Error fetching bookings");
      setLoading(false);
    }
  };

  const cancel = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/delete-bookings/${id}`);
      fetchBookings();
    } catch (err) {
      console.error("Error cancelling booking:", err);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <AccountNav />
      <div>
        {bookings.length === 0 ? (
          <div className="text-3xl mt-4 text-center">No bookings yet...</div>
        ) : (
          bookings.map((booking) => (
            <div className="flex m-2" key={booking._id}>
              <Link
                to={"/place/" + booking.place._id}
                className="flex gap-4 bg-gray-200 rounded-2xl overflow-hidden h-40 w-full"
              >
                <div className="w-48 h-full">
                  {booking.place.photos.length > 0 && (
                    <img
                      className="object-cover h-full w-44"
                      src={`http://localhost:4000/uploads/${booking.place?.photos[0]}`}
                      alt="Booking"
                    />
                  )}
                </div>
                <div className="py-3 flex-grow flex flex-col justify-start">
                  <h2 className="text-2xl">{booking?.place?.title}</h2>
                  <div className="text-gray-600 text-xl font-semibold flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-6 h-6"
                    >
                      <path d="M12.75 12.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM7.5 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM8.25 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM9.75 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM10.5 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM12.75 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM14.25 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM15 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM16.5 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM15 12.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM16.5 13.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" />
                      <path
                        fillRule="evenodd"
                        d="M6.75 2.25A.75.75 0 0 1 7.5 3v1.5h9V3A.75.75 0 0 1 18 3v1.5h.75a3 3 0 0 1 3 3v11.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V7.5a3 3 0 0 1 3-3H6V3a.75.75 0 0 1 .75-.75Zm13.5 9a1.5 1.5 0 0 0-1.5-1.5H5.25a1.5 1.5 0 0 0-1.5 1.5v7.5a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5v-7.5Z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {format(new Date(booking?.checkIn), "dd-MM-yyyy")} -{" "}
                    {format(new Date(booking?.checkOut), "dd-MM-yyyy")}
                  </div>
                  <div className="text-xl text-gray-600">
                    Number of nights:{" "}
                    {differenceInCalendarDays(
                      new Date(booking?.checkOut),
                      new Date(booking?.checkIn)
                    )}
                  </div>
                  <div className="text-xl text-gray-800">
                    Total Cost: ${booking.price}
                  </div>
                </div>
              </Link>
              <button
                className="h-20 w-20 absolute mb-1 bg-slate-300 hover:bg-slate-400 text-red-800 font-semibold opacity-65 rounded-xl"
                onClick={() => cancel(booking._id)}
              >
                Cancel
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default BookingPage;
