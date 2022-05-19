import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  :root {
    body.light {
      --bg: #fff;
      --color: #222;
      --mainColor: #ff9c19;
      --reverseBg: #1a1b1e;
    }

    body.dark {
      --bg: #1a1b1e;
      --color: #fff;
      --mainColor: #ffbd39;
      --reverseBg: #fff;
    }
  }

  /* reset */
  html,
  body,
  div,
  span,
  object,
  iframe,
  article,
  aside,
  canvas,
  details,
  figcaption,
  figure,
  footer,
  header,
  hgroup,
  menu,
  nav,
  section,
  main,
  summary,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  blockquote,
  pre,
  form,
  fieldset,
  legend,
  input,
  label,
  button,
  textarea,
  select,
  textarea,
  input,
  table,
  caption,
  tbody,
  tfoot,
  thead,
  tr,
  th,
  td,
  b,
  i,
  dl,
  dt,
  dd,
  ol,
  ul,
  li,
  abbr,
  address,
  cite,
  code,
  del,
  dfn,
  em,
  img,
  ins,
  kbd,
  q,
  samp,
  small,
  strong,
  sub,
  sup,
  var,
  data,
  time,
  mark,
  audio,
  video,
  a {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body :before,
  body :after {
    box-sizing: border-box;
  }

  html {
    font-size: 62.5%;
  }

  html,
  body {
    width: 100%;
    height: 100%;
  }

  body {
    line-height: 1.5;
    word-break: keep-all;
    -ms-text-size-adjust: 100%;
    -webkit-test-size-adjust: 100%;
    --webkit-font-smoothing: antialiased;
  }

  body,
  select,
  input,
  button,
  textarea,
  button,
  pre {
    font-size: 16px;
    font-family: 'NotoSansKR', sans-serif;
  }

  article,
  aside,
  canvas,
  details,
  figcaption,
  figure,
  footer,
  header,
  hgroup,
  menu,
  nav,
  section,
  main,
  summary {
    display: block;
  }

  blockquote,
  q {
    quotes: none;
  }

  blockquote {
    color: #4f5969;
    margin: 2rem 3.2rem 2rem -2.4rem;
    padding: 0 0 0 2.4rem;
    border-left: 0.4rem solid #005b99;
    font-size: 1.8rem;
    font-style: italic;
    margin-bottom: 3.2rem;
  }

  blockquote:before,
  blockquote:after,
  q:before,
  q:after {
    content: none;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin-bottom: 2.4rem;
    letter-spacing: -0.025em;
  }

  cite,
  em,
  dfn,
  address {
    font-style: normal;
  }

  fieldset,
  iframe {
    border: 0 none;
    min-width: 0;
  }

  ins {
    text-decoration: none;
  }

  del {
    text-decoration: line-through;
  }

  p {
    margin-bottom: 1.6rem;
  }

  ul,
  ol {
    margin-left: 0;
    margin-right: 0;
    padding: 0;
    margin-bottom: 2rem;
  }

  ul {
    >li {
      position: relative;
      padding-left: 1.2rem;
      list-style: none;

      &:before {
        content: "";
        position: absolute;
        top: 0.6em;
        left: 0;
        width: 0.6rem;
        height: 0.6rem;
        background: var(--color);
        border-radius: 50%;
      }
    }
  }
  
  ol {
    counter-reset: ol-list;

    > li {
      counter-increment: ol-list;
      position: relative;
      padding-left: 2rem;
      list-style: none;

      &:before {
        content: counter(ol-list) '.';
        position: absolute;
        top: 0;
        left: 0;
      }
    }
  }

  li > p {
    margin-bottom: 1.6rem;
  }

  li *:last-child {
    margin-bottom: 0;
  }

  li > ul {
    margin-left: 3.2rem;
    margin-top: 1.6rem;
  }

  img,
  fieldset,
  iframe {
    border: 0 none;
  }

  img,
  video,
  audio,
  object,
  embed,
  iframe {
    max-width: 100%;
    height: auto;
  }

  legend,
  caption {
    width: 1px;
    height: 1px;
    margin: -1px;
    font-size: 1px;
    opacity: 0;
    white-space: nowrap;
  }

  i,
  em,
  address {
    font-style: normal;
  }

  input,
  select,
  textarea {
    border-radius: 0;
    box-shadow: none;
    background: transparent;
  }

  input,
  select {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
  }

  label,
  button {
    cursor: pointer;
  }

  button {
    cursor: pointer;
    padding: 0;
    background: none;
    border: 0 none;
  }

  select::-ms-expand {
    display: none;
  }

  textarea {
    resize: vertical;
  }

  input[type="text"]::-ms-clear {
    display: none;
  }

  input[type="radio"],
  input[type="checkbox"],
  input[type="tel"],
  input[type="number"] {
    vertical-align: middle;
  }

  label>input[type="radio"],
  label>input[type="checkbox"] {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
  }

  input[type="number"] {
    -moz-appearace: textfield;
  }

  input[type="number"]::-webkit-inner-spin-button,
  input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
  }

  table {
    width: 100%;
    empty-cells: show;
    border-spacing: 0;
    table-layout: fixed;
  }

  table th {
    font-weight: normal;
  }

  a,
  a:visited {
    color: var(--color);
  }

  a:link,
  a:hover {
    text-decoration: none;
  }

  figure {
    img {
      max-width: 100%;
    }

    >a {
      cursor: zoom-in;
    }
  }

  footer {
    padding: 2.4rem 0;
  }

  /* gatsby-remark-vscode */
  body.light {
    .grvsc-container {
      background-color: #f8f8f8 !important;
    }
  }

  body.dark {
    .grvsc-container {
      background-color: #282c34 !important;
    }
  }

  .grvsc-container {
    margin: 1.6rem 0;
  }

  /* common */
  a.link,
  button.link {
    text-decoration: underline;
  }

  .blind {
    position: absolute;
    width: 1px;
    height: 1px;
    margin: -1px;
    overflow: hidden;
    white-space: nowrap;
    clip: rect(0, 0, 0, 0);
  }

  .cancel-line {
    text-decoration: line-through;
    opacity: 0.6;
  }

  .main-color {
    color: var(--mainColor);
  }
`;

export default GlobalStyle;
