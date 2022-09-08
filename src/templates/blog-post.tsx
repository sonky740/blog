import React from 'react';
import { Link, graphql } from 'gatsby';
import Layout from '../components/Layout';
import Seo from '../components/Seo';
import Comments from '../components/Comments';
import Post from '../components/Post';
import PostNav from '../components/PostNav';

const BlogPostTemplate = ({ data, location }: IndexType) => {
  const post = data.markdownRemark;
  const siteTitle = data.site.siteMetadata?.title || `Title`;
  const { previous, next } = data;

  return (
    <Layout location={location} title={siteTitle}>
      <Seo
        title={post?.frontmatter.title}
        description={post?.frontmatter.description || post?.excerpt}
        post={post}
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
        keywords
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
