import {gql} from '@apollo/client';

export const LOAD_AUTHORS = gql `
    {
        authors {
            id
            name
            age
        }
    }
  
`;