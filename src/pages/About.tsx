import * as React from "react";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import Seo from "../components/Seo";
import styled from "styled-components";

const About = styled.article``;

const AboutIndex = ({ data, location }: IndexTypes) => {
  const siteTitle = data?.site?.siteMetadata?.title || `Title`;

  return (
    <Layout location={location} title={siteTitle}>
      <Seo title="All posts" />
      <About></About>
    </Layout>
  );
};

export default AboutIndex;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`;
