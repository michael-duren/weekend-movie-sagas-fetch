import { createStore, combineReducers, applyMiddleware } from "redux";
import logger from "redux-logger";
// Provider allows us to use redux within our react app
import { Provider } from "react-redux";
import { takeEvery, put } from "redux-saga/effects";
import createSagaMiddleware from "redux-saga";

// Used to store movies returned from the server
const movies = (state = [], action) => {
  switch (action.type) {
    case "SET_MOVIES":
      return action.payload;
    default:
      return state;
  }
};

const movieDetails = (state = { movie: null, genre: null }, action) => {
  switch (action.type) {
    case "SET_MOVIE_DETAILS":
      return action.payload;
    default:
      return state;
  }
};

// Used to store the movie genres
const genres = (state = [], action) => {
  switch (action.type) {
    case "SET_GENRES":
      return action.payload;
    default:
      return state;
  }
};

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  combineReducers({
    movies,
    genres,
    movieDetails,
  }),
  applyMiddleware(sagaMiddleware, logger)
);

function* fetchAllMovies() {
  // get all movies from the DB
  try {
    const response = yield fetch("/api/movie");
    if (!response.ok) {
      throw new Error("Network response was not OK");
    }
    const movies = yield response.json();
    yield put({ type: "SET_MOVIES", payload: movies });
  } catch {
    console.log("get all error");
    alert("Something went wrong.");
  }
}

function* fetchAllGenres() {
  // get all movies from the DB
  try {
    const response = yield fetch("/api/genre");
    if (!response.ok) {
      throw new Error("Network response was not OK");
    }
    const genres = yield response.json();
    yield put({ type: "SET_GENRES", payload: genres });
  } catch {
    console.log("get all error");
    alert("Something went wrong.");
  }
}

function* fetchMovieDetails(action) {
  // get single movie from db and associated genres
  try {
    const response = yield fetch(`/api/movie/${action.payload}`);
    if (!response.ok) {
      throw new Error("Network response was not OK");
    }
    const movie = yield response.json();
    console.log("IN FETCH MOVIE DETAILS", movie);
    yield put({ type: "SET_MOVIE_DETAILS", payload: movie });
  } catch {
    console.log("get all error");
    alert("Something went wrong.");
  }
}

function* createMovie(action) {
  try {
    yield fetch(`/api/movie`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(action.payload),
    });
    yield put({ type: "FETCH_MOVIES" });
  } catch (e) {
    console.log("get all error");
    alert("Something went wrong.");
  }
}

function* editMovie(action) {
  try {
    yield fetch(`/api/movie/${action.payload.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(action.payload),
    });
    yield put({ type: "FETCH_MOVIES" });
  } catch (e) {
    console.log("get all error");
    alert("Something went wrong.");
  }
}

function* watcherSaga() {
  yield takeEvery("FETCH_MOVIES", fetchAllMovies);
  yield takeEvery("FETCH_MOVIE_DETAILS", fetchMovieDetails);
  yield takeEvery("CREATE_MOVIE", createMovie);
  yield takeEvery("EDIT_MOVIE", editMovie);
  yield takeEvery("FETCH_GENRES", fetchAllGenres);
}

sagaMiddleware.run(watcherSaga);

export function StoreProvider({ children }) {
  return <Provider store={store}>{children}</Provider>;
}
