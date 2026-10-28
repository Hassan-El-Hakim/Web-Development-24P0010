import { useState } from "react";


function Stars({ count }) {
  return <span>{"⭐".repeat(count)}</span>;
}


function MovieItem({ movie, onRemove }) {
  return (
    <div style={styles.card}>
      <h3 style={{ margin: 0 }}>{movie.title}</h3>
      <p style={{ margin: "8px 0" }}>
        <Stars count={movie.rating} /> ({movie.rating}/5)
      </p>
      {movie.comment ? <p style={styles.comment}>"{movie.comment}"</p> : null}
      <button style={styles.removeBtn} onClick={onRemove}>
        Remove
      </button>
    </div>
  );
}


export default function App() {
  const [movies, setMovies] = useState([]);
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(3);

  function handleAdd() {
    if (title === "") return;
    const newMovie = { id: Date.now(), title, comment, rating };
    setMovies([...movies, newMovie]);
    setTitle("");
    setComment("");
    setRating(3);
  }

  function handleRemove(id) {
    setMovies(movies.filter((m) => m.id !== id));
  }

  return (
    <div style={styles.page}>
      <h1 style={{ textAlign: "center" }}>🎬 My Watch List</h1>

      <div style={styles.form}>
        <input
          style={styles.input}
          placeholder="Movie title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          style={styles.input}
          placeholder="Your review..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <div>
          <select
            style={styles.input}
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
          >
            <option value={1}>1 star</option>
            <option value={2}>2 stars</option>
            <option value={3}>3 stars</option>
            <option value={4}>4 stars</option>
            <option value={5}>5 stars</option>
          </select>
          <button style={styles.addBtn} onClick={handleAdd}>
            Add movie
          </button>
        </div>
      </div>

      {movies.length === 0 ? (
        <p style={{ textAlign: "center", opacity: 0.7 }}>
          Nothing here yet. Add the first movie you watched!
        </p>
      ) : (
        movies.map((movie) => (
          <MovieItem
            key={movie.id}
            movie={movie}
            onRemove={() => handleRemove(movie.id)}
          />
        ))
      )}
    </div>
  );
}


const styles = {
  page: {
    maxWidth: 480,
    margin: "30px auto",
    padding: 20,
    fontFamily: "Georgia, serif",
    background: "#1b1f2b",
    color: "#f3ead7",
    borderRadius: 12,
    minHeight: "80vh",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
    marginBottom: 24,
  },
  input: {
    padding: 8,
    borderRadius: 6,
    border: "1px solid #444",
    fontFamily: "inherit",
    fontSize: 15,
  },
  addBtn: {
    marginLeft: 10,
    padding: "8px 16px",
    background: "#e0a526",
    color: "#1b1f2b",
    border: "none",
    borderRadius: 6,
    fontWeight: "bold",
    cursor: "pointer",
  },
  card: {
    background: "#272c3c",
    padding: 14,
    borderRadius: 8,
    marginBottom: 12,
    borderLeft: "4px solid #e0a526",
  },
  comment: { fontStyle: "italic", margin: "8px 0" },
  removeBtn: {
    background: "tomato",
    color: "white",
    border: "none",
    borderRadius: 6,
    padding: "5px 12px",
    cursor: "pointer",
  },
};
