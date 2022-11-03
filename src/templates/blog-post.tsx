import React, { useEffect, useRef } from 'react';
import { Link, graphql } from 'gatsby';
import Layout from '../components/Layout';
import Seo from '../components/Seo';
import Comments from '../components/Comments';
import Post from '../components/Post';
import PostNav from '../components/PostNav';

const BlogPostTemplate = ({ data, location }: IndexType) => {
  const article = useRef<HTMLElement>(null);
  const post = data.markdownRemark;
  const siteTitle = data.site.siteMetadata?.title || 'Title';
  const { previous, next } = data;

  useEffect(() => {
    const title = article.current?.querySelectorAll('h3');
    title?.forEach(item => {
      const anchor = document.createElement('a');
      anchor.href = `#${item.innerText}`;
      anchor.className = 'title-anchor';
      anchor.textContent = '#';

      item.setAttribute('id', item.innerText);
      item.insertAdjacentElement('beforeend', anchor);
    });

    const anchor = article.current?.querySelectorAll('.title-anchor');
    anchor?.forEach(item => {
      function anchorScroll(e: Event) {
        e.preventDefault();
        const parent = item.parentNode as HTMLHeadingElement;

        window.scrollTo({
          behavior: 'smooth',
          top: window.scrollY + parent.getBoundingClientRect().top - 100,
        });
      }
      item.addEventListener('click', anchorScroll);

      return () => {
        item.removeEventListener('click', anchorScroll);
      };
    });
  }, []);

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
        <article
          dangerouslySetInnerHTML={{ __html: post?.html! }}
          ref={article}
        />
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
      excerpt(pruneLength: 2000)
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
