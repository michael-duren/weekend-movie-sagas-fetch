import {HashRouter as Router, Route} from 'react-router-dom';
import MovieList from '../MovieList/MovieList'
import Layout from "../Layout/Layout";

function App() {
  return (
    <Layout>
      <Router>        
        <Route path="/" exact>
          <MovieList />
        </Route>
        
        {/* Details page */}

        {/* Add Movie page */}
      </Router>
    </Layout>
  );
}


export default App;
