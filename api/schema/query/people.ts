import { gql } from '@apollo/client';

const PEOPLE = gql`
  query People {
    allPeople {
      id
      name
      image
      species {
        name
      }
      starships {
        name
      }
      films {
        title
      }
    }
  }
`;

interface Species {
  name: string
}

interface Starship {
  name: string
}

interface Film {
  title: string
}

export interface Person {
  id: string
  name?: string
  image?: string
  species?: Species
  starships?: Starship[]
  films?: Film[]
}

export interface PeopleInterface {
  allPeople?: Person[]
}

export default PEOPLE;
