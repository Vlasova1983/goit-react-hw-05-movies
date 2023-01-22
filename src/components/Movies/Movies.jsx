import styles  from '../Movies/Movies.module.css';
import {useState,useEffect} from 'react';
import {Link, useSearchParams,useLocation} from 'react-router-dom';
import Notiflix from 'notiflix';
import axios from 'axios';



const Movies = () => {   
    const [value,setIsValue] = useState('');
    const [movies,setIsMovies] = useState([]);  
    const [searchParams, setSearchParams]=useSearchParams();   
    const location = useLocation();    
    const quary = searchParams.get('quary');

    useEffect(()=>{
        const fetchData = async () => {        
            try {           
                const response= await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=dbc34002be87151e0df6d0e75806eaf7&query=${quary}`);
                const data=response.data.results;                         
                setIsMovies(data);                      
            }
            catch (error) {
                Notiflix.Notify.failure('Sorry, your search did not match any results. Try again.');
            } 
            finally{
            }               
        };

        if(quary!==null) {fetchData()}
    },[quary]);  
    

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
