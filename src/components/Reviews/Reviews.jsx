import {useEffect,useState} from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export const Reviews = () => {
    const [Reviews,setIsReviews] = useState([]);
    const { movieId } = useParams(); 

    useEffect(()=>{    
        const fetchData = async () => {    
            try {           
                const response= await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=dbc34002be87151e0df6d0e75806eaf7`);
                const data = response.data.results;                         
                setIsReviews(data);            
                                             
            }
            catch (error) {} 
            finally{}               
        };

        fetchData();

    },[movieId])

    const  createMessage = ()=>{
        return(           
            <p key='Sorry, but there are no reviews for this movie.'>Sorry, but there are no reviews for this movie.</p>        
        )         
    }

    const fetchLink=(item)=>{ 
         
        return(
            <li key={item.id}>                   
                <p>Author: {item.author}</p>
                <p> {item.content} </p>            
            </li>
        )         
    };
    
    
    return(       
        <ul >
            {Reviews.length!==0 ? Reviews.map ((item)=>(fetchLink(item))):createMessage()}   
        </ul>        
    );
};

