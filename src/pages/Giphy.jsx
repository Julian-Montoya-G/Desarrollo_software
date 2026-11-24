
import { useState } from "react";
import { searchGifs } from "../services/giphy";
import "./giphy.css";

function Giphy() {
  const [query, setQuery] = useState("");
  const [gifs, setGifs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [offset, setOffset] = useState(0);
  const [hasSearched, setHasSearched] = useState(false);
  const [hasMore, setHasMore] = useState(false);

  const handleSearch = async (event) => {
    event.preventDefault();

    if (!query.trim()) {
      setError("Escribe algo para buscar GIFs.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setGifs([]);
      setOffset(0);
      setHasSearched(false);
      setHasMore(false);

      const results = await searchGifs(query.trim(), 0);

      setGifs(results);
      setOffset(results.length);
      setHasSearched(true);
      setHasMore(results.length === 25);

    } catch (error) {
      setError("No fue posible cargar los GIFs.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = async () => {
    try {
      setLoading(true);
      setError("");

      const results = await searchGifs(query.trim(), offset);

      setGifs((previousGifs) => [
        ...previousGifs,
        ...results,
      ]);

      setOffset((previousOffset) =>
        previousOffset + results.length
      );

      setHasMore(results.length === 25);

    } catch (error) {
      setError("No fue posible cargar más GIFs.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="giphy-container">
      <h1>Buscador de GIFs</h1>

      <p>Encuentra tus GIFs favoritos con GIPHY.</p>

      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="¿Qué GIF quieres buscar?"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />

        <button type="submit" disabled={loading}>
          {loading ? "Buscando..." : "Buscar"}
        </button>
      </form>

      {error && <p className="error-message">{error}</p>}

      {loading && <p>Cargando GIFs...</p>}

      {!loading && hasSearched && gifs.length === 0 && !error && (
        <p className="empty-message">
          No encontramos GIFs para "{query}". Intenta con otra palabra.
        </p>
      )}

      <section className="gif-grid">
        {gifs.map((gif) => (
          <article key={gif.id} className="gif-card">
            <img
              src={gif.images.fixed_width.url}
              alt={gif.title || "GIF de GIPHY"}
              loading="lazy"
            />

            <p>{gif.title}</p>
          </article>
        ))}
      </section>

      {gifs.length > 0 && hasMore && (
        <button
          className="load-more-button"
          onClick={handleLoadMore}
          disabled={loading}
        >
          {loading ? "Cargando..." : "Cargar más GIFs"}
        </button>
      )}

      {gifs.length > 0 && !hasMore && !loading && (
        <p>¡Has llegado al final de los resultados!</p>
      )}
    </main>
  );
}

export default Giphy;
