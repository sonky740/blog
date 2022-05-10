import { useStaticQuery, graphql } from 'gatsby';

interface SiteMetaData {
  site: {
    siteMetadata: SiteSiteMetadata;
  };
}

const useSiteMetadata = () => {
  const { site } = useStaticQuery<SiteMetaData>(
    graphql`
      query SiteMetadata {
        site {
          siteMetadata {
            title
            description
            author {
              name
              summary
            }
            siteUrl
            utterances {
              repo
            }
          }
        }
      }
    `
  );
  return site.siteMetadata;
};

export default useSiteMetadata;
