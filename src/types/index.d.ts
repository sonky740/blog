declare module '*.jpg';
declare module '*.png';
declare module '*.svg';
declare module '*.woff';
declare const __PATH_PREFIX__: string;

interface IndexType {
  data: {
    site: {
      siteMetadata: {
        title: string;
      };
    };
    allMarkdownRemark: {
      nodes: [];
    };
    markdownRemark?: {
      frontmatter: {
        title: string;
        description: string;
        date: string;
        keywords: string[];
      };
      excerpt: string;
      html: string;
      id?: string;
    };
    previous: {
      fields: {
        slug: string;
      };
      frontmatter: {
        title: string;
      };
    };
    next: {
      fields: {
        slug: string;
      };
      frontmatter: {
        title: string;
      };
    };
  };
  location: {};
}
