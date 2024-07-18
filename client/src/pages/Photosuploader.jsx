import { useState } from "react";
import axios from "axios";
const photosuploader = ({ photos, setPhotos, photoLink, setPhotoLink }) => {
  async function addPhotoByLink(ev) {
    ev.preventDefault();
    try {
      const { data: filename } = await axios.post(
        "https://airbnb-clone-api-eight.vercel.app/upload-by-link", // Update endpoint URL
        { link: photoLink } // Send photoLink as data in the body
      );
      setPhotos((prev) => [...prev, filename]);
      setPhotoLink(""); // Clear photoLink input after successful upload
    } catch (error) {
      console.error("Error uploading photo by link:", error);
    }
  }

  function removephoto(ev, link) {
    ev.preventDefault();
    setPhotos([...photos.filter((pic) => pic !== link)]);
  }
  function coverphoto(ev, link) {
    ev.preventDefault();
    const newlist = [...photos.filter((pic) => pic !== link)];
    const coverlist = [link, ...newlist];
    setPhotos(coverlist);
  }
  async function uploadPhoto(ev) {
    const files = ev.target.files;
    if (!files.length) {
      return;
    }

    const data = new FormData();
    for (let i = 0; i < files.length; i++) {
      data.append("photos", files[i]);
    }

    try {
      const res = await axios.post(
        "https://airbnb-clone-api-eight.vercel.app/upload",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const filenames = res.data;
      setPhotos((prev) => [...prev, ...filenames]);
    } catch (error) {
      console.error("Error uploading files:", error);
    }
  }
  return (
    <div>
      <h2 className="text-2xl mt-3">PHOTOS</h2>
      <div className="grid grid-cols-10 gap-2 items-center">
        <input
          value={photoLink}
          onChange={(ev) => setPhotoLink(ev.target.value)}
          type="text"
          className="col-span-9 p-2 border rounded"
          placeholder="Add picture using a link"
        />
        <button
          onClick={addPhotoByLink}
          className="col-span-1 bg-gray-200 px-4 py-2 rounded-2xl text-red-800"
        >
          Add&nbsp;photos
        </button>
      </div>

      <div className="mt-2 gap-2 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 text-center">
        {photos.length > 0 &&
          photos.map((link) => (
            <div key={link} className="h-32 flex relative">
              <img
                className="rounded-2xl w-full object-cover"
                src={`https://airbnb-clone-api-eight.vercel.app/uploads/${link}`}
                alt="Uploaded"
              />
              {photos[0] === link && (
                <button className="absolute w-10 left-1 bottom-1 bg-white text-black">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-6"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              )}
              {photos[0] !== link && (
                <button
                  onClick={(ev) => coverphoto(ev, link)}
                  className="absolute w-10 left-1 bottom-1 bg-white text-black"
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
                      d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                    />
                  </svg>
                </button>
              )}
              <button
                className="absolute w-10 right-1 bottom-1 bg-white text-black"
                onClick={(ev) => removephoto(ev, link)}
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
                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                  />
                </svg>
              </button>
            </div>
          ))}

        <label
          htmlFor="file-upload"
          className="border p-4 flex rounded-2xl items-center cursor-pointer "
        >
          <input
            type="file"
            id="file-upload"
            className="hidden"
            onChange={uploadPhoto}
          />
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
              d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15m0-3-3-3m0 0-3 3m3-3V15"
            />
          </svg>
          <span>Uploads</span>
        </label>
      </div>
    </div>
  );
};

export default photosuploader;
