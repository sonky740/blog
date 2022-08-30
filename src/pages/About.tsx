import * as React from 'react';
import Layout from '../components/Layout';
import Seo from '../components/Seo';
import useSiteMetadata from '../hooks/useSiteMetadata';
import About from '../components/About';

const AboutIndex: React.FC<IndexType> = ({ location }) => {
  const site = useSiteMetadata();
  const siteTitle = site.title || `Title`;

  return (
    <Layout location={location} title={siteTitle}>
      <Seo title="About" />
      <About>
        {/* 간단 소개 */}
        <h1 className="main-color">안녕하세요! 손기연입니다.</h1>
        <p>
          서버 엔지니어로 시작하여, 사내 IT 인프라 업무를 지나 5년차 퍼블리셔로
          지내면서 프론트엔드를 바라보고 있습니다.
          <br />
          여기엔 제가 그동안 업무를 해오면서 배운 것과 배울 것들, 그리고
          개인적인 생각들을 일기처럼 올릴 생각입니다.
        </p>
        <ul>
          <li>
            Github:{' '}
            <a
              href="https://github.com/sonky740"
              target="_blank"
              rel="noreferrer"
            >
              https://github.com/sonky740
            </a>
          </li>
          <li>
            PortFolio:{' '}
            <a
              href="https://sonkypf.gatsbyjs.io"
              target="_blank"
              rel="noreferrer"
            >
              https://sonkypf.gatsbyjs.io
            </a>
          </li>
        </ul>

        <hr />

        {/* 간단 이력 */}
        <h2 className="main-color">간단 이력</h2>

        <h3>민앤지 (2021.06 ~ 2022.09)</h3>
        <ol>
          <li>SKT PASS 운영</li>
          <li>티오르(TIOR) 운영 및 고도화</li>
          <li className="cancel-line">Sheeeda(캠핑) 구축</li>
          <li>아파트청약케어 운영 및 고도화</li>
          <li>더쎈카드 운영 및 고도화</li>
        </ol>

        <h3>인픽스 (2016.04 ~ 2021.06)</h3>
        <ol>
          <li>넥센 히어로즈 사이트 시스템 유지보수 운영</li>
          <li>효성그룹 및 계열사 홈페이지 리뉴얼 구축</li>
          <li>KB국민은행 개인 인터넷뱅킹 리뉴얼 구축</li>
          <li>포스코 차세대 MES 3.0 시스템 UI 구축</li>
          <li>KB국민은행 차세대 통합인증서 플랫폼 구축</li>
          <li>고객언어솔루션 구축</li>
          <li>우리은행 WON기업뱅킹 앱(웹뷰) 구축</li>
          <li>KB국민은행 오픈뱅킹 고도화</li>
          <li>우리은행 마이데이터 구축</li>
        </ol>
      </About>
    </Layout>
  );
};

export default AboutIndex;
