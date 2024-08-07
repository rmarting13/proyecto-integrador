import { useState, useEffect } from "react";
import GenreCard from "./GenreCard";
import GenreDetail from "./GenreDetail";

import AddGenreForm from "./AddGenreForm";
import UpdateGenreForm from "./UpdateGenreForm";
import "bulma/css/bulma.min.css";


const GenreList = () => {
  const [genres, setGenres] = useState([]);
  const [selectedGenreId, setSelectedGenreId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingGenre, setEditingGenre] = useState(null);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await fetch(
          "https://sandbox.academiadevelopers.com/harmonyhub/genres/"
        );
        const data = await response.json();
        if (data && Array.isArray(data.results)) {
          setGenres(data.results);
        } else {
          console.error("Expected an array of genres in results");
        }
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    };

    fetchGenres();
  }, []);

  const handleGenreClick = (id) => {
    setSelectedGenreId(id);
  };

  const handleEditGenre = (genre) => {
    setEditingGenre(genre);
  };

  const addGenreToList = (newGenre) => {
    setGenres((prevGenres) => [...prevGenres, newGenre]);
    setShowForm(false);
  };

  const handleGenreUpdated = (updatedGenre) => {
    setGenres((prevGenres) =>
      prevGenres.map((genre) =>
        genre.id === updatedGenre.id ? updatedGenre : genre
      )
    );
    setEditingGenre(null); // Reset the editing genre state
  };

  return (
    <div className="flex flex-col content-center">
      <h1 className="flex title text-center">Music Genres</h1>
      <div className="grid grid-cols-4 gap-4">
        <div className="grid grid-cols-2 gap-4 col-span-2 h-screen overflow-y-auto overflow-x-auto">
          {" "}
          {/* Ajustar el tamaño de la columna */}
          <div className="columns is-multiline">
            {genres.map((genre) => (
              <GenreCard
                key={genre.id}
                genre={genre}
                onClick={() => handleGenreClick(genre.id)}
                onEdit={handleEditGenre}
              />
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 col-span-1 h-screen overflow-y-auto overflow-x-auto">
          {" "}
          {/* Ajustar el tamaño de la columna */}
          <GenreDetail genreId={selectedGenreId} />
          <button
            className="button is-primary is-fullwidth"
            onClick={() => setShowForm(!showForm)}
          >
            <span className="icon">
              <i className="fas fa-plus"></i>
            </span>
            <span>Add New Genre</span>
          </button>
          {showForm && <AddGenreForm addGenreToList={addGenreToList} />}
          {editingGenre && (
            <UpdateGenreForm
              genre={editingGenre}
              onGenreUpdated={handleGenreUpdated}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default GenreList;
