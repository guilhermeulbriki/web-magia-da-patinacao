import styled, { keyframes } from 'styled-components';
import { lighten } from 'polished';

const pointerAnimetion = keyframes`
  from {
    opacity: 0.8;
    transform: translate(-5px, -25px);
  } to {
    opacity: 1;
    transform: translate(0px 0px);
  }
`;

export const Container = styled.div`
  width: 256px;
  min-height: 100vh;
  padding: 16px;
  background: #eaeaea;

  box-shadow: 2px 0px 8px #d6d6d6;
  z-index: 1;

  display: flex;
  align-items: center;
  flex-direction: column;

  > img {
    margin-top: auto;
    margin-bottom: 8px;
  }
`;

export const Profile = styled.div`
  width: 224px;
  height: 48px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  section {
    display: flex;
    flex-direction: column;

    span {
      font-size: 16px;
      font-weight: 500;
      color: #4f4f4f;
    }

    strong {
      margin-top: 8px;
      font-size: 16px;
      font-weight: 700;
    }
  }
`;

export const Content = styled.div`
  margin-top: 40px;
  margin-bottom: 32px;
  width: 100%;

  div {
    width: 100%;
    padding: 0;

    display: flex;
    align-items: center;
    justify-content: space-between;

    span {
      height: 37px;
      width: 172px;

      display: flex;
      cursor: pointer;
      align-items: center;

      img {
        margin-right: 12px;
      }

      a {
        font-size: 12px;
        color: #005678;
        font-weight: 600;
        text-decoration: none;

        transition: color 0.2s;
      }

      &:hover a {
        color: ${lighten(0.2, '#005678')};
      }
    }

    > img {
      display: none;

      animation: ${pointerAnimetion} 0.4s ease-in;
    }

    & + div {
      margin-top: 24px;
    }

    &.active {
      > img {
        display: inline;
      }
    }
  }
`;
