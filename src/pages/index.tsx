import * as React from 'react';
import { Link, graphql } from 'gatsby';
import Layout from '../components/Layout';
import Seo from '../components/Seo';
import styled from 'styled-components';

interface PostType {
  frontmatter: {
    title: string;
    date: string;
    description: string;
    keywords?: [];
  };
  excerpt: string;
  fields: {
    slug: string;
  };
}

const BlogIndex = ({ data, location }: IndexType) => {
  const siteTitle = data?.site?.siteMetadata?.title || `Title`;
  const posts = data?.allMarkdownRemark.nodes;
  console.log(data);

  if (posts?.length === 0) {
    return (
      <Layout location={location} title={siteTitle}>
        <Seo title="Empty posts" />
        <p>
          포스트가 하나도 없어요!
          <br />왜 없지...
        </p>
      </Layout>
    );
  }

  return (
    <Layout location={location} title={siteTitle}>
      <Seo title="Main" />
      <ol>
        {posts?.map((post: PostType) => {
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
                {post.frontmatter.keywords?.map(keyword => {
                  return <span key={keyword}>{keyword}</span>;
                })}
              </div> */}
            </li>
          );
        })}
      </ol>
    </Layout>
  );
};

const Article = styled.article`
  p {
    margin-bottom: 0;
  }

  h1,
  h2 {
    font-size: 2.4rem;
    color: var(--mainColor);
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

  section {
    p {
      font-size: 1.8rem;
    }
  }
`;

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
          keywords
        }
      }
    }
  }
`;
