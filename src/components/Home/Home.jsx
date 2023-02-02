import styles  from '../Home/Home.module.css';

import { Link,useLocation } from 'react-router-dom';
import {useState, useEffect, useContext} from 'react';

import Notiflix from 'notiflix';
import axios from 'axios';

import { FeatchContext } from 'context/FetchContext';


const Home = () => {    
    const [movies,setIsMovies] = useState([]);
    const location = useLocation();
    const featchContext = useContext(FeatchContext);   
    const {url,key} = featchContext; 

    useEffect(()=>{
        const fetchData = async () => {        
            try {           
                const response= await axios.get(`${url}/trending/movie/day?${key}`);
                const data=response.data.results;                         
                setIsMovies(data);                      
            }
            catch (error) {
                Notiflix.Notify.failure('Sorry, your search did not match any results. Try again.');
            } 
                  
        };
        fetchData();
    },[url,key])    

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

export default Home;