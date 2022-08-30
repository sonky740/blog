import React from 'react';
import styled from 'styled-components';

interface Props {
  children: React.ReactNode;
}

const About = ({ children }: Props) => {
  return <AboutStyle>{children}</AboutStyle>;
};

const AboutStyle = styled.article`
  padding-bottom: 6rem;

  h1 {
    padding-bottom: 1rem;
    margin-bottom: 1rem;
    font-size: 3.2rem;
  }

  h2 {
    font-size: 2.8rem;
  }

  h3 {
    font-size: 2.4rem;
  }

  hr {
    width: 100%;
    height: 0.1rem;
    margin: 4rem 0;
    border: none;
    background: #aaa;
  }

  a {
    text-decoration: underline;
  }
`;

export default About;
