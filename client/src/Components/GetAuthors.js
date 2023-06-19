import React, {useEffect, useState} from "react";
import { useQuery, gql } from '@apollo/client';
import { LOAD_AUTHORS } from '../GraphQL/Queries';


function GetAuthors(){
    const { error, loading, data} = useQuery(LOAD_AUTHORS);
    
    //const [authors, setAuthors] = useState([]);
    // useEffect( () => {
    //     console.log(data);
    //     if(data){
    //         setAuthors(data.authors);
    //     }
    // }, [data]);

    return(
        <div>
            
            {loading && <>Data is Loading</>}
            {!loading && data && data.authors.map((val) => {
                return (
                    <div key={val.id}>
                         <h1>{val.id}</h1>
                        <h1>{val.name}</h1>
                        <h2>{val.age}</h2>
                    </div>
                );
            })}
        </div>
    );
}


export default GetAuthors;