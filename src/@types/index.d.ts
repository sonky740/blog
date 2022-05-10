declare module '*.jpg';
declare module '*.png';
declare module '*.svg';
declare module '*.woff';
declare const __PATH_PREFIX__: string;

interface IndexTypes {
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

interface LayoutType {
  location?: { pathname?: string };
  title: string;
  children: React.ReactNode;
}

interface PostTypes {
  frontmatter: {
    title: string;
    date: string;
    description: string;
    tags?: [];
  };
  excerpt: string;
  fields: {
    slug: string;
  };
}
