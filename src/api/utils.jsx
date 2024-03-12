import axios from "axios";

export const handleSearch = async (country, city, category, language) => {
  let allResults = [];
  let page = 1;
  let hasMoreResults = true;

  const fetchResultsPage = async () => {
    try {
      const response = await axios.post(
        "https://google.serper.dev/places",
        {
          q: `${category} in ${city}`,
          gl: country,
          hl: language,
          page: page,
        },
        {
          headers: {
            "X-API-KEY": "3c7e922859888fbc6581a8c9183ab4f46316db7d",
            "Content-Type": "application/json",
          },
        }
      );

      allResults.push(...response.data.places);
      page++;
      hasMoreResults = response.data.places.length === 10;

      if (hasMoreResults && page <= 20) {
        await fetchResultsPage();
      }
    } catch (error) {
      console.error(error.message);
      throw error;
    }
  };

  await fetchResultsPage();

  return allResults;
};
