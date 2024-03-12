import map from "../images/map.png";
import shop from "../images/shops.png";
import website from "../images/website.png";
import categories from "../images/categories.png";
import smartphone from "../images/smartphone.png";
import placeholder from "../images/placeholder.png";

const Card = ({ country }) => {
  return (
    <div className="flex flex-col items- gap-3 p-6 border rounded-lg shadow-lg text-lg">
      {country.title ? (
        <div className="flex items-center gap-3">
          <img src={shop} className="w-6" />
          <p>{country.title}</p>
        </div>
      ) : null}
      {country.address ? (
        <div className="flex items-center gap-3">
          <img src={placeholder} className="w-6" />
          <p>{country.address}</p>
        </div>
      ) : null}
      {country.category ? (
        <div className="flex items-center gap-3">
          <img src={categories} className="w-6" />
          <p>{country.category}</p>
        </div>
      ) : null}
      {country.phoneNumber ? (
        <div className="flex items-center gap-3">
          <img src={smartphone} className="w-6" />
          <p>{country.phoneNumber}</p>
        </div>
      ) : null}
      {country.website ? (
        <div className="flex items-center gap-3">
          <img src={website} className="w-6" />
          <a
            href={country.website}
            target="_blank"
            className="text-blue-600 underline"
          >
            {country.website}
          </a>
        </div>
      ) : null}
      <div className="flex items-center gap-3">
        <img src={map} className="w-6" />
        <a
          target="_blank"
          className="text-blue-600 underline"
          href={`https://www.google.com/maps?q=${country.latitude},${country.longitude}`}
        >
          Location
        </a>
      </div>
    </div>
  );
};

export default Card;
