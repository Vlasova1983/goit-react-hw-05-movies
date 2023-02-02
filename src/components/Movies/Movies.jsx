import styles  from '../Movies/Movies.module.css';

import {useState,useEffect,useContext} from 'react';
import {Link, useSearchParams,useLocation} from 'react-router-dom';

import Notiflix from 'notiflix';
import axios from 'axios';

import { FeatchContext } from 'context/FetchContext';


const Movies = () => {   
    const [value,setIsValue] = useState('');
    const [movies,setIsMovies] = useState([]);  
    const [searchParams, setSearchParams]=useSearchParams();   
    const location = useLocation();    
    const quary = searchParams.get('quary');
    const featchContext = useContext(FeatchContext);   
    const {url,key} = featchContext;
    useEffect(()=>{
        const fetchData = async () => {        
            try {           
                const response= await axios.get(`${url}/search/movie?${key}&query=${quary}`);
                const data=response.data.results;                         
                setIsMovies(data);                      
            }
            catch (error) {
                Notiflix.Notify.failure('Sorry, your search did not match any results. Try again.');
            }                         
        };

        if(quary!==null) {fetchData()}
    },[quary,url,key]);  
    

    const  handleChange = event => {    
        const { value}  = event.target;       
        setIsValue(value);              
    };

    const handleSubmit = event =>{ 
        event.preventDefault();
        setSearchParams({quary:value})                        
        setIsValue('');                      
    }; 
    
    const fetchLink=(item)=>{               
        return(
            <Link state={{from:location}} to={`/movies/${ item.id}`}  className={styles.link} key={item.id}>{item.title}</Link>
        )         
    };
        
    return (
       <>            
            <div className={styles.Searchbar}>                
                <form className={styles.SearchForm} onSubmit={handleSubmit}>                    
                    <button  type="submit" className={styles.SearchForm_button} >
                        <span className={styles.SearchForm_button_label} >Search</span>
                    </button>
                    <input
                        className={styles.SearchForm_input}
                        type="text"
                        autoComplete="off"
                        autoFocus
                        value={value}
                        placeholder="Search movies..."
                        onChange={handleChange} 
                     />                    
                </form>            
            </div>
            <ul className={styles.list}>                
                {movies.map ((move)=>(fetchLink(move)))}   
            </ul>            
       </> 
        
    );   
}
 
export default Movies;
