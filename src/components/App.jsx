import {lazy,Suspense} from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import { Loader } from './Loader/Loader';

const Home = lazy(()=> import('./Home/Home'));
const Movies = lazy(()=> import('./Movies/Movies'));
const MoviesDetails = lazy(()=> import('./MoviesDetails/MoviesDetails'));
const Layout = lazy(()=> import('./Layout/Layout'));


export const App = () => {
 return(
  <BrowserRouter basename="goit-react-hw-05-movies">    
    <Suspense fallback={<Loader/>}>
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
    </Suspense>        
  </BrowserRouter>
 );
};
