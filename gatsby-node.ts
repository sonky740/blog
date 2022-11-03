import type { GatsbyNode } from 'gatsby';
const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');

export const createPages: GatsbyNode['createPages'] = async ({
  graphql,
  actions,
  reporter,
}) => {
  const { createPage } = actions;

  // Define a template for blog post
  const blogPost = path.resolve('./src/templates/blog-post.tsx');

  const allMarkdown: {
    errors?: any;
    data?: {
      allMarkdownRemark: { nodes: { id: number; fields: { slug?: string } }[] };
    };
  } = await graphql(`
    query allMarkdownQuery {
      allMarkdownRemark(
        sort: { fields: [frontmatter___date], order: ASC }
        limit: 1000
      ) {
        nodes {
          id
          fields {
            slug
          }
        }
      }
    }
  `);

  const posts = allMarkdown.data?.allMarkdownRemark.nodes;

  posts?.forEach((node, index) => {
    const previousPostId = index === 0 ? null : posts[index - 1].id;
    const nextPostId = index === posts.length - 1 ? null : posts[index + 1].id;
    const { slug } = node.fields;
    if (!slug) return;

    // Type-safe 'createPage' call.
    createPage({
      path: slug,
      component: blogPost,
      context: {
        id: node.id,
        nextPostId,
        previousPostId,
      },
    });
  });
};

export const onCreateNode: GatsbyNode['onCreateNode'] = ({
  node,
  actions,
  getNode,
}) => {
  const { createNodeField } = actions;

  if (node.internal.type === 'MarkdownRemark') {
    const value = createFilePath({ node, getNode });

    createNodeField({
      name: 'slug',
      node,
      value,
    });
  }
};

export const createSchemaCustomization: GatsbyNode['createSchemaCustomization'] =
  ({ actions }) => {
    const { createTypes } = actions;

    createTypes(`
    type SiteSiteMetadata {
      author: Author
      siteUrl: String
    }

    type Author {
      name: String
      summary: String
    }

    type MarkdownRemark implements Node {
      frontmatter: Frontmatter
      fields: Fields
    }

    type Frontmatter {
      title: String
      description: String
      date: Date @dateformat
    }

    type Fields {
      slug: String
    }
  `);
  };
