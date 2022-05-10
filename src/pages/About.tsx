import * as React from 'react';
import Layout from '../components/Layout';
import Seo from '../components/Seo';
import styled from 'styled-components';
import useSiteMetadata from '../hooks/useSiteMetadata';

const About = styled.article`
  h2 {
    padding-bottom: 1rem;
    margin-bottom: 1rem;
    font-size: 3.2rem;
  }
`;

const AboutIndex = ({ location }: IndexTypes) => {
  const site = useSiteMetadata();
  const siteTitle = site.title || `Title`;

  return (
    <Layout location={location} title={siteTitle}>
      <Seo title="About" />
      <About>
        {/* 간단 소개 */}
        {/* <h2>여기는 어디죠?</h2>
        <p></p>
        <ul>
          <li>Github: </li>
          <li>PortFolio: </li>
          <li>Blog: </li>
        </ul> */}

        {/* 간단 이력 */}
      </About>
    </Layout>
  );
};

export default AboutIndex;
