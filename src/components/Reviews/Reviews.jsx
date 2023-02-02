import {useEffect,useState,useContext} from 'react';
import { useParams } from 'react-router-dom';

import axios from 'axios';
import Notiflix from 'notiflix';

import { FeatchContext } from 'context/FetchContext';

const Reviews = () => {
    const [Reviews,setIsReviews] = useState([]);
    const { movieId } = useParams(); 
    const featchContext = useContext(FeatchContext);   
    const {url,key} = featchContext;   
    useEffect(()=>{    
        const fetchData = async () => {    
            try {           
                const response= await axios.get(`${url}/movie/${movieId}/reviews?${key}`);
                const data = response.data.results;                         
                setIsReviews(data);                                             
            }
            catch (error) {
                Notiflix.Notify.failure('Oops, something went wrong. Try to refresh the page or return to the previous one.');
            }                          
        };

        fetchData();

    },[movieId,url,key])

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

export default Reviews;

