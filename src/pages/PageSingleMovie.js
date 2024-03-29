import { useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieById } from "../utilities/api";
import { useEffect } from "react";
import { filterVideos, formatReleaseDate } from "../utilities/toolbelt";
import { IMAGE_URL_BASE } from "../utilities/api";
import FavouriteButton from "../components/FavoriteButton";
import { GlobalContext } from "../context/GlobalContext";
import { useContext } from "react";

function PageSingleMovie() {
  const params = useParams();
  const id = params.id;
  const [movieData, setMovieData] = useState();
  const [movieVideos, setMovieVideos] = useState([]);

  useEffect(() => {
    getMovieById(id)
      .then((data) => {
        console.log("Data", data);
        const youtubeTrailerVideos = filterVideos(data.videos.results);
        setMovieData(data);
        setMovieVideos(youtubeTrailerVideos);
      })
      .catch((error) => {
        alert(error);
      });
  }, []);
  // console.log("movieData", movieData);
  // console.log("movieVideos", movieVideos);

  const { favorites, addToFavorites, removeFromFavorites } =
    useContext(GlobalContext);

  const isFavorited = favorites.find((fav) => {
    return fav.id === id;
  });

  function handleFavorite(event) {
    event.stopPropagation();
    if (isFavorited) {
      removeFromFavorites(movieData);
    } else {
      addToFavorites(movieData);
    }
  }

  return (
    <div className="single-page">
      {movieData && (
        <div>
          <div className="single-page-flex">
            <div>
              <h1 className="single-title">{movieData.title}</h1>
              <h2 className="single-date">
                {formatReleaseDate(movieData.release_date)}
              </h2>
            </div>

            <div className="single-page-rating-bg">
              <p className="single-rating-text">
                {movieData.vote_average ? (
                  <p>{movieData.vote_average.toFixed(1).replace(".", "")}%</p>
                ) : (
                  <p>NR</p>
                )}
              </p>
            </div>
          </div>

          <div className="single-page-flex-poster-trailer">
            <img
              className="single-page-poster-tablet"
              src={`${IMAGE_URL_BASE}/w500/${movieData.poster_path}`}
              alt={`${movieData.title}`}
            />

            <div className="single-page-button-tablet" onClick={handleFavorite}>
              <FavouriteButton movieData={movieData} />
            </div>

            {movieVideos.length > 0 && ( <iframe
              src={`https://www.youtube.com/embed/${movieVideos[0].key}`}
              // width="300"
              // height="200"
              title={movieData.name}
              className="single-trailer"
            ></iframe>)}
           
          </div>

          <div className="single-page-flex-poster-overview">
            <img
              className="single-page-poster-mobile"
              src={`${IMAGE_URL_BASE}/w500/${movieData.poster_path}`}
              alt={`${movieData.title}`}
            />

            <div className="single-page-overview-genru-bg">
              <div className="single-page-genru-flex">
                {movieData.genres.map((genre) => {
                  return (
                    <div className="single-page-genru-bg">
                      <p className="single-page-genru-text">{genre.name}</p>
                    </div>
                  );
                })}
              </div>

              <div className="single-page-overview-bg">
                <p className="single-page-overview-text">
                  {movieData.overview}
                </p>
              </div>
            </div>
          </div>

          <div className="single-page-button" onClick={handleFavorite}>
            <FavouriteButton movieData={movieData} />
            <p className="single-page-button-text">Add to Favorites</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default PageSingleMovie;
