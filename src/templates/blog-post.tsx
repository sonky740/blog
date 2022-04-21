import * as React from "react";
import { Link, graphql } from "gatsby";
import styled from "styled-components";
import Layout from "../components/Layout";
import Seo from "../components/Seo";
import { defineCustomElements as deckDeckGoHighlightElement } from "@deckdeckgo/highlight-code/dist/loader";
import Comments from "../components/Comments";
deckDeckGoHighlightElement();

const Post = styled.article`
  header {
    h1 {
      margin: 0 0 1.6rem 0;
    }

    p {
      font-size: 1.4rem;
      color: #aaa;
    }
  }

  section {
    min-height: 200px;
  }
`;

const PostNav = styled.nav`
  ul {
    margin: 0;
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
          <h1>{post?.frontmatter.title}</h1>
          <p>{post?.frontmatter.date}</p>
        </header>
        <section dangerouslySetInnerHTML={{ __html: post?.html! }} />
      </Post>
      <PostNav>
        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
          }}
        >
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
        </ul>
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
