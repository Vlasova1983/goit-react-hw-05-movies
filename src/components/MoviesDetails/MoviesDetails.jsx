import styles  from '../MoviesDetails/MoviesDetails.module.css';
import { Link, useParams,useLocation} from 'react-router-dom';
import {useEffect,useState,lazy,Suspense} from 'react';
import axios from 'axios';
import { Loader } from 'components/Loader/Loader';


const Cast = lazy(()=> import('../Cast/Cast'));
const Reviews = lazy(()=> import('../Reviews/Reviews'));

const MoviesDetails = () => {
    const { movieId } = useParams(); 
    const [move,setIsMove] = useState({});
    const [genres,setIsGenres] = useState([]);
    const [LoadCast,setIsLoadCast] = useState(false);
    const [LoadReviews,setIsLoadReviews] = useState(false);     
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
   
    const onChangeLoadCast =()=>{
        setIsLoadCast(true);
        setIsLoadReviews(false)  
    }

    const onChangeLoadReviews =()=>{
        setIsLoadCast(false);
        setIsLoadReviews(true);  
    }


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
                    <Link state={{from:location.state?.from}} to={`/movies/${movieId}/cast`} className={styles.link_menu} onClick={()=>onChangeLoadCast()}> Cast</Link>
                    <Link state={{from:location.state?.from}} to={`/movies/${movieId}/reviews`}className={styles.link_menu} onClick={()=>onChangeLoadReviews()}> Reviews</Link>
                </ul> 

            </div>
            <Suspense fallback={<Loader/>}> 
                {LoadCast &&<Cast/>}
                {LoadReviews&& <Reviews/> }
            </Suspense> 
        </>
          
    );
};

export default MoviesDetails;