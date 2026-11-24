
const GIPHY_API_URL = "https://api.giphy.com/v1/gifs/search";

export const searchGifs = async (query, offset = 0) => {
  try {
    const params = new URLSearchParams({
      api_key: import.meta.env.VITE_GIPHY_API_KEY,
      q: query,
      limit: 25,
      offset: offset,
      rating: "g",
      lang: "en",
    });

    const response = await fetch(`${GIPHY_API_URL}?${params}`);

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    const data = await response.json();

    return data.data;

  } catch (error) {
    console.error("Error al buscar GIFs:", error);
    throw error;
  }
};
