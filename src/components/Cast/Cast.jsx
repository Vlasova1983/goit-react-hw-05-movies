import styles  from '../Cast/Cast.module.css';

import { useParams } from 'react-router-dom';
import {useState,useEffect,useContext} from 'react';

import axios from 'axios';
import Notiflix from 'notiflix';

import { FeatchContext } from 'context/FetchContext';

const Cast = () => {
    const [cast,setIsCast] = useState([]);
    const { movieId } = useParams(); 
    const featchContext = useContext(FeatchContext);   
    const {url,key} = featchContext;
   
    useEffect(()=>{    
        const fetchData = async () => {    
        try {           
            const response= await axios.get(`${url}/movie/${movieId}/credits?${key}`);
            const data = response.data.cast;                         
            setIsCast(data);                                       
        }
        catch (error) {
            Notiflix.Notify.failure('Oops, something went wrong. Try to refresh the page or return to the previous one.');
        } 
                     
    };

    fetchData();

},[movieId,url,key]) 

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