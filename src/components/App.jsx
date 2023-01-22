import {lazy,Suspense} from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import { Loader } from './Loader/Loader';

const Home = lazy(()=> import('./Home/Home'));
const Movies = lazy(()=> import('./Movies/Movies'));
const MoviesDetails = lazy(()=> import('./MoviesDetails/MoviesDetails'));
const Layout = lazy(()=> import('./Layout/Layout'));
const Cast = lazy(()=> import('./Cast/Cast'));
const Reviews = lazy(()=> import('./Reviews/Reviews'));

export const App = () => {
 return(
  <BrowserRouter basename="goit-react-hw-05-movies">    
    <Suspense fallback={<Loader/>}>
      < Layout >
        <Routes>    
          <Route path="" element={<Home/>} />
          <Route path="movies" element={<Movies />} />    
          <Route path="movies/:movieId" element={<MoviesDetails/>}> 
            <Route path="cast" element={<Cast/>} />
            <Route path="reviews" element={<Reviews/>}/>
          </Route>      
        </Routes>
      </Layout> 
    </Suspense>        
  </BrowserRouter>
 );
};
