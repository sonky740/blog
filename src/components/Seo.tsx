import * as React from 'react';
import { Helmet } from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';

interface SeoType {
  description?: string;
  lang?: string;
  meta?: [];
  title?: string;
  post?: {
    html: string;
    frontmatter: {
      keywords: string[];
    };
  };
}

const Seo = ({
  description = '',
  lang = 'ko',
  meta = [],
  title,
  post,
}: SeoType) => {
  const { site } = useStaticQuery(
    graphql`
      query {
        allMarkdownRemark {
          edges {
            node {
              excerpt(pruneLength: 1000)
            }
          }
        }
        site {
          siteMetadata {
            title
            description
            image
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
          name: 'google-site-verification',
          content: '7QkL6QRJHb45Cp_E-AcQv72CE3EYeyiGz82Kc1TFJNQ',
        },
        {
          name: 'title',
          content: title,
        },
        {
          name: 'description',
          content: metaDescription,
        },
        {
          name: 'og:image',
          content: site.siteMetadata.image,
        },
        {
          property: 'og:title',
          content: title,
        },
        {
          property: 'keywords',
          content: frontmatter?.keywords,
        },
        {
          property: 'og:description',
          content: metaDescription,
        },
        {
          property: 'og:type',
          content: 'website',
        },
      ].concat(meta!)}
    />
  );
};

export default Seo;
