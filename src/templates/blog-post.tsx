import React from 'react';
import { Link, graphql } from 'gatsby';
import styled from 'styled-components';
import Layout from '../components/Layout';
import Seo from '../components/Seo';
import Comments from '../components/Comments';

const Post = styled.article`
  header {
    padding-bottom: 1.6rem;
    margin-bottom: 1.6rem;
    border-bottom: 1px solid #eee;

    h2 {
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
    font-size: 1.8rem;

    h2 {
      font-size: 2.4rem;
    }

    h3 {
      font-size: 2.2rem;
    }

    h4 {
      font-size: 2rem;
    }

    a {
      text-decoration: underline;
    }

    em {
      opacity: 0.6;
    }

    strong {
      opacity: 1;

      em {
        opacity: inherit;
      }
    }
  }
`;

const PostNav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  list-style: none;
  padding: 0;
  margin: 3.2rem 0 0 0;

  > div {
    flex: 1;
    + div {
      text-align: right;
    }
  }
`;

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
          <h2>{post?.frontmatter.title}</h2>
          <p>{post?.frontmatter.date}</p>
        </header>
        <article dangerouslySetInnerHTML={{ __html: post?.html! }} />
      </Post>
      <PostNav>
        <div>
          {previous && (
            <Link to={previous.fields.slug} rel="prev">
              ← {previous.frontmatter.title}
            </Link>
          )}
        </div>
        <div>
          {next && (
            <Link to={next.fields.slug} rel="next">
              {next.frontmatter.title} →
            </Link>
          )}
        </div>
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
