import axios from "axios";
import Button from "./Button";
import { useState } from "react";

const Home = () => {
  const [data, setData] = useState(null);
  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    axios
      .post(
        "https://google.serper.dev/places",
        {
          q: search,
          gl: "eg",
          hl: "ar",
        },
        {
          headers: {
            "X-API-KEY": "3c7e922859888fbc6581a8c9183ab4f46316db7d",
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        setData(res.data.places);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <section>
      <form
        onSubmit={handleSearch}
        className="w-[90%] lg:w-3/4 xl:w-1/2 my-6 mx-auto flex flex-wrap justify-center gap-3"
      >
        <input
          type="text"
          placeholder="Enter a query"
          onChange={(e) => setSearch(e.target.value)}
          className="h-[45px] border outline-none rounded-lg pl-2 grow"
        />
        <button className="w-[200px] bg-blue-600 text-white p-2 rounded-lg">
          Search
        </button>
      </form>
      {data && <Button data={data} />}
      {data && (
        <div className="w-[90%] lg:w-3/4 mx-auto grid grid-cols-1 lg:grid-cols-2 justify-center gap-6 my-6">
          {data.map((e, index) => (
            <div
              key={index}
              className="flex flex-col items- gap-3 p-6 border rounded-lg shadow-lg text-lg"
            >
              {e.title ? (
                <div className="flex items-center gap-3">
                  <i class="fa-solid fa-house w-[20px] h-[20px] center text-blue-600"></i>
                  <p>{e.title}</p>
                </div>
              ) : null}
              {e.address ? (
                <div className="flex items-center gap-3">
                  <i class="fa-solid fa-location-dot w-[20px] h-[20px] center text-red-600"></i>
                  <p>{e.address}</p>
                </div>
              ) : null}
              {e.category ? (
                <div className="flex items-center gap-3">
                  <i class="fa-solid fa-layer-group w-[20px] h-[20px] center text-orange-600"></i>
                  <p>{e.category}</p>
                </div>
              ) : null}
              {e.rating ? (
                <div className="flex items-center gap-3">
                  <i class="fa-solid fa-star w-[20px] h-[20px] center text-yellow-500"></i>
                  <p>{e.rating}</p>
                </div>
              ) : null}
              {e.phoneNumber ? (
                <div className="flex items-center gap-3">
                  <i class="fa-solid fa-mobile w-[20px] h-[20px] center text-rose-600"></i>
                  <p>{e.phoneNumber}</p>
                </div>
              ) : null}
              {e.website ? (
                <div className="flex items-center gap-3">
                  <i class="fa-solid fa-desktop w-[20px] h-[20px] center text-purple-600"></i>
                  <a
                    href={e.website}
                    target="_blank"
                    className="text-blue-600 underline"
                  >
                    {e.website}
                  </a>
                </div>
              ) : null}
              <div className="flex items-center gap-3">
                <i class="fa-solid fa-map-location-dot w-[20px] h-[20px] center text-green-600"></i>
                <a
                  target="_blank"
                  className="text-blue-600 underline"
                  href={`https://www.google.com/maps?q=${e.latitude},${e.longitude}`}
                >
                  Location
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Home;
