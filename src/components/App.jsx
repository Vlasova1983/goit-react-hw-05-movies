import { BrowserRouter, Routes, Route} from 'react-router-dom';
import {Home} from './Home/Home';
import {Movies} from './Movies/Movies';
import {MoviesDetails} from './MoviesDetails/MoviesDetails';
import { Layout } from './Layout/Layout';

export const App = () => {
 return(
  <BrowserRouter basename="goit-react-hw-05-movies">
    < Layout >
      <Routes>    
        <Route path="" element={<Home/>} />
        <Route path="movies" element={<Movies />} />    
        <Route path="movies/:movieId" element={<MoviesDetails/>}> 
          <Route path="cast" element={<MoviesDetails/>} />
          <Route path="reviews" element={<MoviesDetails/>}/>
        </Route>      
      </Routes> 
    </Layout>    
  </BrowserRouter>
 );
};
