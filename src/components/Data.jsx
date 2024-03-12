import Card from "./Card";
import { useState } from "react";
import { handleSearch } from "../api/utils";
import { countries } from "../api/countries";
import { categories } from "../api/categories";

const Data = () => {
  const [info, setInfo] = useState();
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [category, setCategory] = useState("");
  const [language, setLanguage] = useState("");

  const search = async (event) => {
    event.preventDefault();
    const results = await handleSearch(country, city, category, language);
    setInfo(results);
  };

  return (
    <div>
      <form
        onSubmit={search}
        className="w-[90%] lg:w-3/4 xl:w-1/2 my-6 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center gap-3"
      >
        <select
          required
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          className="h-12 border rounded-lg outline-none"
        >
          {countries.map((e, index) => (
            <option key={index} value={e.iso2}>
              {e.country}
            </option>
          ))}
        </select>
        <select
          required
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="h-12 border rounded-lg outline-none"
        >
          {country &&
            countries[countries.findIndex((e) => e.iso2 == country)].states.map(
              (e, index) => (
                <option key={index} value={e}>
                  {e}
                </option>
              )
            )}
        </select>
        <select
          required
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="h-12 border rounded-lg outline-none"
        >
          {categories.map((e, index) => (
            <option key={index} value={e}>
              {e}
            </option>
          ))}
        </select>
        <select
          required
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="h-12 border rounded-lg outline-none"
        >
          <option value="en">English</option>
          <option value="ar">اللغة العربية</option>
        </select>
        <button className="h-12 bg-sky-600 text-white p-2 rounded-lg">
          Search
        </button>
      </form>
      {info ? (
        <>
          <p className="text-center py-3">{info.length} result</p>
          <div className="w-[90%] lg:w-3/4 mx-auto grid grid-cols-1 lg:grid-cols-2 justify-center gap-6 my-6">
            {info.map((e, index) => (
              <Card key={index} country={e} />
            ))}
          </div>
        </>
      ) : (
        <div className="animation w-32 h-32 lg:w-42 lg:h-42 mx-auto mt-32 rounded-full border-4 border-transparent border-b-sky-600 border-r-sky-600"></div>
      )}
    </div>
  );
};

export default Data;
