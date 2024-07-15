import React, { useEffect, useState } from "react";
import axios from "axios";
import PhotosUploader from "./Photosuploader";
import Perkspages from "./PerksPage";
import { useParams, Navigate } from "react-router-dom";
import AccountNav from "./AccountNav";

const PlacesForm = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [Price, setPrice] = useState(100);
  const [photoLink, setPhotoLink] = useState("");
  const [photos, setPhotos] = useState([]);
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [checkInTime, setCheckInTime] = useState("");
  const [checkOutTime, setCheckOutTime] = useState("");
  const [maxGuests, setMaxGuests] = useState("");
  const [redirect, setRedirect] = useState(false);

  async function addNewPlace(ev) {
    ev.preventDefault();
    const placeData = {
      id,
      title,
      address,
      photoLink,
      photos,
      description,
      perks,
      extraInfo,
      checkInTime,
      checkOutTime,
      maxGuests,
      Price,
    };

    try {
      if (id) {
        await axios.put("http://localhost:4000/places", placeData);
      } else {
        await axios.post("http://localhost:4000/places", placeData);
      }
      setRedirect(true);
    } catch (error) {
      console.error("Error editing/adding place:", error);
    }
  }

  useEffect(() => {
    if (id) {
      const fetchPlace = async () => {
        const result = await axios.get(`http://localhost:4000/places/${id}`);
        const {
          title,
          address,
          Price,
          photoLink,
          photos,
          description,
          perks,
          extraInfo,
          checkInTime,
          checkOutTime,
          maxGuests,
        } = result.data;
        setTitle(title);
        setAddress(address);
        setPrice(Price);
        setPhotoLink(photoLink);
        setPhotos(photos);
        setDescription(description);
        setPerks(perks);
        setExtraInfo(extraInfo);
        setCheckInTime(checkInTime);
        setCheckOutTime(checkOutTime);
        setMaxGuests(maxGuests);
      };
      fetchPlace();
    }
  }, [id]);

  if (redirect) {
    return <Navigate to="/account/places" />;
  }

  return (
    <div>
      <AccountNav />
      <form onSubmit={addNewPlace}>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(ev) => setTitle(ev.target.value)}
          required
        />
        <label htmlFor="address">Address</label>
        <input
          type="text"
          id="address"
          value={address}
          onChange={(ev) => setAddress(ev.target.value)}
          required
        />
        <label htmlFor="Price">Price</label>
        <input
          type="number"
          id="Price"
          value={Price}
          onChange={(ev) => setPrice(ev.target.value)}
          required
        />
        <label htmlFor="photos">Photos</label>
        <PhotosUploader photos={photos} setPhotos={setPhotos} photoLink={photoLink} setPhotoLink={setPhotoLink}/>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          value={description}
          onChange={(ev) => setDescription(ev.target.value)}
          required
        />
        <label htmlFor="perks">Perks</label>
        <Perkspages perks={perks} setPerks={setPerks} />
        <label htmlFor="extraInfo">Extra Info</label>
        <textarea
          id="extraInfo"
          value={extraInfo}
          onChange={(ev) => setExtraInfo(ev.target.value)}
        />
        <label htmlFor="checkInTime">Check In Time</label>
        <input
          type="text"
          id="checkInTime"
          value={checkInTime}
          onChange={(ev) => setCheckInTime(ev.target.value)}
        />
        <label htmlFor="checkOutTime">Check Out Time</label>
        <input
          type="text"
          id="checkOutTime"
          value={checkOutTime}
          onChange={(ev) => setCheckOutTime(ev.target.value)}
        />
        <label htmlFor="maxGuests">Max Guests</label>
        <input
          type="number"
          id="maxGuests"
          value={maxGuests}
          onChange={(ev) => setMaxGuests(ev.target.value)}
        />
        <button type="submit">Save Place</button>
      </form>
    </div>
  );
};

export default PlacesForm;
