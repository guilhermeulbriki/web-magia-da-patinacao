import styled, { keyframes } from 'styled-components';
import { linearGradient } from 'polished';

export const Container = styled.div`
  width: 100%;
  max-width: 1200px;
  padding: 0 16px;

  display: flex;
  margin: 0 auto;
`;

export const Content = styled.div`
  flex: 1;
  padding: 32px 16px 32px 32px;
  background: ${linearGradient({
    colorStops: ['#F2F2F2', '#E2E2E2'],
    toDirection: 'to bottom right',
  })};
`;

const rotateGraphic = keyframes`
from {
  opacity: 0;
  transform: rotate(-65deg);
} to {
  opacity: 1;
  transform: rotate(0deg);
}
`;

export const PieGraphs = styled.section`
  width: 100%;
  display: flex;
  justify-content: space-between;

  & article + article {
    margin-left: 24px;
  }
`;

export const Graph = styled.article`
  min-width: 410px;

  strong {
    color: #00111f;
    font-size: 16px;
    font-weight: 500;
  }

  > div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #f9f9f9;
    border-radius: 16px;
    border: 1px solid rgba(146, 146, 146, 0.2);
    margin-top: 16px;
    max-height: 240px;
    padding: 24px;

    main {
      height: 100%;
      max-width: 230px;
      display: flex;
      align-items: center;
      justify-content: center;

      animation: ${rotateGraphic} 1.5s;
    }
  }
`;

export const Legend = styled.ul`
  margin-left: 24px;
  padding-right: 8px;
  list-style: none;
  max-height: 200px;
  overflow-y: scroll;

  ::-webkit-scrollbar {
    width: 4px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #1f4a6e;
    border-radius: 4px;
  }

  li {
    width: 100%;

    display: flex;
    align-items: center;
    justify-content: space-between;

    svg {
      width: 24px;
      height: 24px;
      margin-right: 8px;
    }

    span {
      color: #162127;
      font-size: 14px;
    }

    & + li {
      margin-top: 24px;
    }
  }
`;
