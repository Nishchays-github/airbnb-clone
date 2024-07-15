import React from "react";

const PerksPage = ({ perks, setPerks }) => {
  function perks_(ev) {
    const { checked, name } = ev.target;
    if (checked) {
      setPerks([...perks, name]);
    } else {
      setPerks(perks.filter((perk) => perk !== name));
    }
  }

  return (
    <div>
      <div className="text-2xl mt-4">Perks</div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 ">
        <label className="border p-4 flex rounded-2xl items-center cursor-pointer">
          <input
            type="checkbox"
            checked={perks.includes("wifi")}
            name="wifi"
            onChange={perks_}
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
              d="M8.288 15.038a5.25 5.25 0 0 1 7.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 0 1 1.06 0Z"
            />
          </svg>
          <span>Wifi</span>
        </label>
        <label className="border p-4 flex rounded-2xl items-center cursor-pointer">
          <input
            type="checkbox"
            name="free parking spot"
            onChange={perks_}
            checked={perks.includes("free parking spot")}
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
              d="M8.25 18.75a1.5 1.5 0 0 1-1.5-1.5V6.75a1.5 1.5 0 0 1 1.5-1.5h6A3.75 3.75 0 0 1 18 9a3.75 3.75 0 0 1-3.75 3.75H9.75a.75.75 0 0 0-.75.75v3A1.5 1.5 0 0 1 7.5 18Zm.75-12v9m2.25-3.75h3"
            />
          </svg>
          <span>Free parking spot</span>
        </label>
        <label className="border p-4 flex rounded-2xl items-center cursor-pointer">
          <input
            type="checkbox"
            name="tv"
            onChange={perks_}
            checked={perks.includes("tv")}
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
              d="M6.75 18h10.5m-9-3.75h7.5m-12-7.5h16.5a2.25 2.25 0 0 1 2.25 2.25v9a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18v-9A2.25 2.25 0 0 1 3.75 6.75Z"
            />
          </svg>
          <span>TV</span>
        </label>
        <label className="border p-4 flex rounded-2xl items-center cursor-pointer">
          <input type="checkbox" name="radio" onChange={perks_} checked={perks.includes("radio")}/>
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
              d="M3.75 6.75h16.5m-3 12h3a.75.75 0 0 0 .75-.75v-9a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75v9c0 .414.336.75.75.75Zm-14 0h3a.75.75 0 0 0 .75-.75v-9a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75v9c0 .414.336.75.75.75Zm4.25-12v12-12Zm7.25 0v12-12Zm-5.5 7.5h3v1.5h-3v-1.5Zm0 3h3v1.5h-3v-1.5Zm0-6h3v1.5h-3V9Z"
            />
          </svg>
          <span>Radio</span>
        </label>
        <label className="border p-4 flex rounded-2xl items-center cursor-pointer">
          <input checked={perks.includes("pets")} type="checkbox" name="pets" onChange={perks_} />
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
              d="M8.25 7.5a1.875 1.875 0 1 1-3.75 0 1.875 1.875 0 0 1 3.75 0Zm11.25 0a1.875 1.875 0 1 1-3.75 0 1.875 1.875 0 0 1 3.75 0Zm-11.625 9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm12 0a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0ZM12 21.75a4.5 4.5 0 0 1-4.5-4.5v-.579c0-1.136.368-2.25 1.05-3.162a6.002 6.002 0 0 1 8.898-.672 6 6 0 0 1 1.643 3.834V17.25a4.5 4.5 0 0 1-4.5 4.5Z"
            />
          </svg>
          <span>Pets</span>
        </label>
        <label className="border p-4 flex rounded-2xl items-center cursor-pointer">
          <input type="checkbox" checked={perks.includes("private entrance")} name="private entrance" onChange={perks_} />
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
              d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-3A2.25 2.25 0 0 0 8.25 5.25V9m7.5 12h-7.5m9-6.75v-3a.75.75 0 0 0-.75-.75h-10.5a.75.75 0 0 0-.75.75v3m12 0A2.25 2.25 0 0 1 19.5 20.25v.75h-15v-.75a2.25 2.25 0 0 1 2.25-2.25m12 0v-3a.75.75 0 0 0-.75-.75h-10.5a.75.75 0 0 0-.75.75v3"
            />
          </svg>
          <span>Private entrance</span>
        </label>
      </div>
    </div>
  );
};

export default PerksPage;
