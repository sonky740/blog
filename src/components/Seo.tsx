import * as React from 'react';
import { Helmet } from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';

interface SeoTypes {
  description?: string;
  lang?: string;
  meta: [];
  title?: string;
  post?: {
    frontmatter: {
      keywords: string[];
    };
  };
}

const Seo = ({ description, lang, meta, title, post }: SeoTypes) => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
          }
        }
      }
    `
  );

  const frontmatter = post?.frontmatter;
  const metaDescription = description || site.siteMetadata.description;
  const defaultTitle = site.siteMetadata?.title;

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={defaultTitle ? `%s | ${defaultTitle}` : undefined}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `keywords`,
          content: frontmatter?.keywords,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: `website`,
        },
      ].concat(meta)}
    />
  );
};

Seo.defaultProps = {
  lang: `ko`,
  meta: [],
  description: ``,
};

export default Seo;
