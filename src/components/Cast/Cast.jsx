import styles  from '../Cast/Cast.module.css';
import {useState,useEffect} from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Cast = () => {
    const [cast,setIsCast] = useState([]);
    const { movieId } = useParams(); 
   
    useEffect(()=>{    
        const fetchData = async () => {    
        try {           
            const response= await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=dbc34002be87151e0df6d0e75806eaf7`);
            const data = response.data.cast;                         
            setIsCast(data);                                       
        }
        catch (error) {} 
        finally{}               
    };

    fetchData();

},[movieId]) 

    const fetchLink=(item)=>{ 
        const poster = item.profile_path
            ? `https://image.tmdb.org/t/p/w500/${item.profile_path}`
            : `https://placehold.co/500x750?text=No+Image`;       
        return(
            <li key={item.id}>
                <img className={styles.image} src={poster} alt={item.name} width='100' height='150'/>   
                <p>{item.name}</p>
                <p>Character: {item.character}</p>            
            </li>
        )         
    };

    const  createMessage = ()=>{
        return(           
            <p key='Sorry, but there are no actors listed in this movie.'>Sorry, but there are no actors listed in this movie.</p>        
        )         
    }
    
    
    return(
        <ul className={styles.cast}>            
            {cast.length!==0 ?cast.map ((item)=>(fetchLink(item))):createMessage()} 
        </ul>
    );
};

export default Cast;