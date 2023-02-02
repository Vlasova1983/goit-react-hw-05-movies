import styles  from '../MoviesDetails/MoviesDetails.module.css';

import { Link, useParams,useLocation,Outlet} from 'react-router-dom';
import {useEffect,useState,Suspense,useContext} from 'react';

import axios from 'axios';
import Notiflix from 'notiflix';

import { Loader } from 'components/Loader/Loader';
import { FeatchContext } from 'context/FetchContext';

const MoviesDetails = () => {
    const { movieId } = useParams(); 
    const [move,setIsMove] = useState({});
    const [genres,setIsGenres] = useState([]);    
    const location = useLocation();
    const featchContext = useContext(FeatchContext);   
    const {url,key} = featchContext;
    
    useEffect(()=>{        
        const fetchData = async () => {        
            try {           
                const response= await axios.get(`${url}/movie/${movieId}?${key}`);
                const data = response.data;                         
                setIsMove(data);
                setIsGenres(data.genres);                                                                       
            }
            catch (error) {
                Notiflix.Notify.failure('Oops, something went wrong. Try to refresh the page or return to the previous one.');
            }                         
        };
        fetchData();        
    },[movieId,url,key]) 
    
    const fetchLink=(item)=>{        
        return(
            <li  className={styles.link_genres} key={item.name}>{item.name}</li>
        )         
    };
   
    


    return (       
        <> 
            <div>
                <Link to={location.state?.from?? '/movies'} >Go back</Link>            
                <div className={styles.content}>
                    <img className={styles.image} src={`https://image.tmdb.org/t/p/w500/${move.poster_path}`} alt="" />
                    <div className={styles.info} >
                        <p>{move.title} ({move.release_date}) </p>                
                        <p>Overview</p> 
                        <p> {move.overview}</p>
                        <p className={styles.genres}>Genres</p>
                        <ul className={styles.genres}>{genres.map ((item)=>(fetchLink(item)))}</ul>
                    </div>
                </div>      
        
                <ul className={styles.list_menu}>Additional Information
                    <Link state={{from:location.state?.from}} to={`cast`} className={styles.link_menu}> Cast</Link>
                    <Link state={{from:location.state?.from}} to={`reviews`}className={styles.link_menu}> Reviews</Link>
                </ul> 

            </div>
            
             <Suspense fallback={<Loader/>}> 
                <Outlet />
            </Suspense>  
        </>
          
    );
};

export default MoviesDetails;