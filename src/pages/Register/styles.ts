import styled, { keyframes } from 'styled-components';

export const Container = styled.div`
  width: 100%;
  display: flex;
  padding: 0 16px;
`;

const imageAnimation = keyframes`
  from {
    opacity: 0;
    transform: translateX(-100px);
  } to {
    opacity: 1;
    transform: translateX(0px);
  }
`;

export const Content = styled.div`
  width: 100%;
  max-width: 950px;
  margin: 0 auto;
  padding: 32px 16px 32px 32px;
  position: relative;

  h1 {
    font-size: 36px;
    color: #00a3e4;
    font-weight: bold;
  }

  > img {
    position: absolute;
    top: 180px;
    right: 40px;

    animation: ${imageAnimation} 1s ease-out;
  }
`;

export const Inputs = styled.section`
  display: flex;
  flex-direction: column;
  max-width: 294px;
  margin-top: 24px;

  div + div {
    margin-top: 16px;
  }
`;
