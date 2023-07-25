import { HashRouter as Router, Route } from "react-router-dom";
import MovieList from "../MovieList/MovieList";
import Layout from "../Layout/Layout";
import MovieDetailsPage from "../MovieDetailsPage/MovieDetailsPage";

function App() {
  return (
    <Router>
      <Layout>
        <Route path="/" exact>
          <MovieList />
        </Route>

        {/* Details page */}
        <Route path="/details/:id">
          <MovieDetailsPage />
        </Route>

        {/* Add Movie page */}
      </Layout>
    </Router>
  );
}

export default App;
