import * as React from "react";
import { Link, graphql } from "gatsby";
import Layout from "../components/Layout";
import Seo from "../components/Seo";
import styled from "styled-components";

const Article = styled.article`
  p {
    margin-bottom: 0;
  }

  h2 {
    font-size: 2.4rem;
    color: #222;
    margin-bottom: 0.8rem;
    margin-top: 0;
  }

  header {
    margin-bottom: 1rem;

    small {
      color: #aaa;
    }
  }
`;

const BlogIndex = ({ data, location }: IndexTypes) => {
  const siteTitle = data?.site?.siteMetadata?.title || `Title`;
  const posts = data?.allMarkdownRemark.nodes;

  if (posts?.length === 0) {
    return (
      <Layout location={location} title={siteTitle}>
        <Seo title="All posts" />
        <p>
          No blog posts found. Add markdown posts to "content/blog" (or the
          directory you specified for the "gatsby-source-filesystem" plugin in
          gatsby-config.js).
        </p>
      </Layout>
    );
  }

  return (
    <Layout location={location} title={siteTitle}>
      <Seo title="All posts" />
      <ol>
        {posts?.map((post: PostTypes) => {
          const title = post.frontmatter.title || post.fields.slug;

          return (
            <li key={post.fields.slug}>
              <Link to={post.fields.slug} itemProp="url">
                <Article>
                  <header>
                    <h2>
                      <span itemProp="headline">{title}</span>
                    </h2>
                    <small>{post.frontmatter.date}</small>
                  </header>
                  <section>
                    <p
                      dangerouslySetInnerHTML={{
                        __html: post.frontmatter.description || post.excerpt,
                      }}
                      itemProp="description"
                    />
                  </section>
                </Article>
              </Link>
              <span>{post.frontmatter.tags}</span>
            </li>
          );
        })}
      </ol>
    </Layout>
  );
};

export default BlogIndex;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          description
        }
      }
    }
  }
`;
