import { gql } from '@apollo/client';

const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

export interface User {
  email: string
  password: string
}

interface AuthenticatedUser {
  user: User
  token: string
}

export interface LoginInterface {
  login: AuthenticatedUser
}

export default LOGIN;
