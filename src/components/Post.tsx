import React from 'react';
import styled from 'styled-components';

interface Props {
  children: React.ReactNode;
}

const Post = ({ children }: Props) => {
  return <PostStyle>{children}</PostStyle>;
};

const PostStyle = styled.article`
  header {
    padding-bottom: 1.6rem;
    margin-bottom: 1.6rem;
    border-bottom: 1px solid #eee;

    h2 {
      margin: 0 0 1.6rem 0;
      color: var(--mainColor);
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
      font-size: 2.2rem;
    }

    h3 {
      font-size: 2rem;
    }

    h4 {
      font-size: 1.8rem;
    }

    h3,
    h4 {
      &:hover {
        .title-anchor {
          opacity: 0.6;
        }
      }
    }

    a {
      text-decoration: underline;
    }

    .title-anchor {
      display: inline-block;
      margin-left: 0.4rem;
      text-decoration: none;
      opacity: 0;
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

    p {
      img,
      .gatsby-resp-image-wrapper {
        display: block;
        margin: 1.6rem auto;
      }
    }

    ul,
    ol {
      li {
        h3,
        h4 {
          margin-bottom: 0;
          line-height: 1.34;
        }
      }
    }

    hr {
      margin: 1.6rem 0;
      border-color: var(--mainColor);
    }
  }
`;

export default Post;
