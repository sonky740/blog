import React from 'react';
import { Link, graphql } from 'gatsby';
import styled from 'styled-components';
import Layout from '../components/Layout';
import Seo from '../components/Seo';
import { defineCustomElements as deckDeckGoHighlightElement } from '@deckdeckgo/highlight-code/dist/loader';
import Comments from '../components/Comments';
deckDeckGoHighlightElement();

const Post = styled.article`
  header {
    padding-bottom: 1.6rem;
    margin-bottom: 1.6rem;
    border-bottom: 1px solid #eee;

    h1 {
      margin: 0 0 1.6rem 0;
    }

    p {
      font-size: 1.4rem;
      color: #aaa;
      margin-bottom: 0;
    }
  }

  article {
    min-height: 200px;

    h2 {
      font-size: 2rem;
    }

    h3 {
      font-size: 1.8rem;
    }

    h4 {
      font-size: 1.6rem;
    }
  }
`;

const PostNav = styled.nav`
  margin-top: 3.2rem;
  ul {
    margin: 0;
  }
`;

const PostNavUl = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  list-style: none;
  padding: 0;
  margin: 0;
`

const BlogPostTemplate: React.FC<IndexTypes> = ({ data, location }) => {
  const post = data.markdownRemark;
  const siteTitle = data.site.siteMetadata?.title || `Title`;
  const { previous, next } = data;

  return (
    <Layout location={location} title={siteTitle}>
      <Seo
        title={post?.frontmatter.title}
        description={post?.frontmatter.description || post?.excerpt}
      />
      <Post>
        <header>
          <h1>{post?.frontmatter.title}</h1>
          <p>{post?.frontmatter.date}</p>
        </header>
        <article dangerouslySetInnerHTML={{ __html: post?.html! }} />
      </Post>
      <PostNav>
        <PostNavUl>
          <li>
            {previous && (
              <Link to={previous.fields.slug} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.fields.slug} rel="next">
                {next.frontmatter.title} →
              </Link>
            )}
          </li>
        </PostNavUl>
      </PostNav>
      <Comments id={post?.id!} />
    </Layout>
  );
};

export default BlogPostTemplate;

export const pageQuery = graphql`
  query BlogPostBySlug(
    $id: String!
    $previousPostId: String
    $nextPostId: String
  ) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "YYYY년 MM월 DD일")
        description
      }
    }
    previous: markdownRemark(id: { eq: $previousPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
    next: markdownRemark(id: { eq: $nextPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
  }
`;
