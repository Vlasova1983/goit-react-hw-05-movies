import styles  from '../Home/Home.module.css';
import {   Link,useLocation } from 'react-router-dom';
import {useState, useEffect} from 'react';
import Notiflix from 'notiflix';
import axios from 'axios';


export const Home = () => {    
    const [movies,setIsMovies] = useState([]);
    const location = useLocation();

    useEffect(()=>{
        fetchData();
    },[])      
    const fetchData = async () => {        
        try {           
            const response= await axios.get(`https://api.themoviedb.org/3/trending/movie/day?api_key=dbc34002be87151e0df6d0e75806eaf7`);
            const data=response.data.results;                         
            setIsMovies(data);                      
        }
        catch (error) {
            Notiflix.Notify.failure('Sorry, your search did not match any results. Try again.');
        } 
        finally{
        }               
    };

    const fetchLink=(item)=>{            
        return(            
            <Link state={{from:location}} to= {`movies/${item.id}`}  className={styles.link_movies} key={item.id} id={item.id}> - {item.title}</Link>
        )         
    };

    return (
        <>                
            <h2 className={styles.titel} >Trending today:</h2>
            <ul className={styles.list_movies}>
                {movies.map ((move)=>(fetchLink(move)))}   
            </ul>            
        </>        
    )
};

