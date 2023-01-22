import styles  from '../MoviesDetails/MoviesDetails.module.css';
import { Link, useParams,useLocation,Outlet} from 'react-router-dom';
import {useEffect,useState,Suspense} from 'react';
import axios from 'axios';
import { Loader } from 'components/Loader/Loader';




const MoviesDetails = () => {
    const { movieId } = useParams(); 
    const [move,setIsMove] = useState({});
    const [genres,setIsGenres] = useState([]);    
    const location = useLocation();
    

    useEffect(()=>{        
        const fetchData = async () => {        
            try {           
                const response= await axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=dbc34002be87151e0df6d0e75806eaf7`);
                const data = response.data;                         
                setIsMove(data);
                setIsGenres(data.genres);                                                                       
            }
            catch (error) {} 
            finally{}               
        };
        fetchData();        
    },[movieId]) 
    
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