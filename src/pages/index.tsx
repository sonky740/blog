import * as React from 'react';
import { Link, graphql } from 'gatsby';
import Layout from '../components/Layout';
import Seo from '../components/Seo';
import styled from 'styled-components';

const Article = styled.article`
  p {
    margin-bottom: 0;
  }

  h1,
  h2 {
    font-size: 2.4rem;
    color: var(--color);
    margin-bottom: 1.6rem;
    margin-top: 0;
  }

  header {
    margin-bottom: 1.6rem;

    small {
      font-size: 1.4rem;
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
        <Seo title="Empty posts" />
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
      <Seo title="Main" />
      <ol>
        {posts?.map((post: PostTypes) => {
          const title = post.frontmatter.title || post.fields.slug;

          return (
            <li key={post.fields.slug}>
              <Link to={post.fields.slug}>
                <Article>
                  <header>
                    <h2>{title}</h2>
                    <small>{post.frontmatter.date}</small>
                  </header>
                  <section>
                    <p
                      dangerouslySetInnerHTML={{
                        __html: post.frontmatter.description || post.excerpt,
                      }}
                    />
                  </section>
                </Article>
              </Link>
              {/* <div>
                {post.frontmatter.tags?.map(tag => {
                  return <span>{tag}</span>;
                })}
              </div> */}
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
          date(formatString: "YYYY년 MM월 DD일")
          title
          description
          tags
        }
      }
    }
  }
`;
