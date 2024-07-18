import React, { useState, useEffect, useContext } from "react";
import { differenceInCalendarDays } from "date-fns";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { userContext } from "../userContext.jsx";
const Bookingwidget = ({ place }) => {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [Guests, setGuests] = useState(1);
  const [Mob, setMob] = useState("");
  const [price, setPrice] = useState(0);
  const [redirect, setRedirect] = useState("");
  const { user } = useContext(userContext);
  const [Name, setName] = useState(user);
  useEffect(() => {
    if (checkIn && checkOut) {
      const numberofdays = differenceInCalendarDays(
        new Date(checkOut),
        new Date(checkIn)
      );
      setPrice(numberofdays * place.Price);
    }
  }, [checkIn, checkOut, place.Price]);

  useEffect(() => {
    if (user) setName(user.Name);
  }, [user]);
  async function book() {
    try {
      const res = await axios.post(
        "https://airbnb-clone-api-eight.vercel.app//booking",
        {
          checkIn,
          checkOut,
          Guests,
          Name,
          Mob,
          price,
          place: place._id,
        }
      );
      const id = res.data._id;
      setRedirect(`/account/bookings`);
    } catch (error) {
      alert("first login to airbnb");
    }
  }
  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div className="bg-white shadow p-4 rounded-2xl mt-4">
      <div className="text-center text-2xl">
        Price: ${place.Price}/per-night
      </div>
      <div className="border rounded-2xl mt-4">
        <div className="flex justify-around">
          <div className="py-3 px-4">
            <label className="border-black">Check IN:</label>
            <input onChange={(ev) => setCheckIn(ev.target.value)} type="date" />
          </div>
          <div className="py-3 px-4 border-l">
            <label className="border-black">Check OUT:</label>
            <input
              onChange={(ev) => setCheckOut(ev.target.value)}
              type="date"
            />
          </div>
        </div>
        <div className="border-t py-3 px-3">
          <label className="border-black">Number of guests</label>
          <input onChange={(ev) => setGuests(ev.target.value)} type="number" />
        </div>
      </div>
      {price > 0 && (
        <div className="border rounded-2xl mt-3 py-3 px-4 border-t">
          <label className="border-black">Your full name</label>
          <input
            type="text"
            value={Name}
            onChange={(ev) => setName(ev.target.value)}
          />

          <label className="border-black">Your contact info</label>
          <input onChange={(ev) => setMob(ev.target.value)} type="tel" />
        </div>
      )}
      <button className="mt-5" onClick={book}>
        Book Here for
        {price > 0 && <span className="text-white"> ${price}</span>}
      </button>
    </div>
  );
};

export default Bookingwidget;
