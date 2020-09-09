import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  display: flex;
  padding: 0 16px;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 950px;
  margin: 0 auto;
  padding: 32px 16px 32px 32px;
`;

export const PieGraphs = styled.section`
  width: 100%;
  display: flex;
  justify-content: space-between;

  & article + article {
    margin-left: 24px;
  }
`;

export const PieGraph = styled.article`
  min-width: 380px;

  strong {
    color: #00111f;
    font-size: 14px;
    font-weight: 500;
  }

  > div {
    height: 240px;
    width: 404px;
    background: #f9f9f9;
    border-radius: 16px;
    border: 1px solid rgba(146, 146, 146, 0.2);
    margin-top: 16px;
    padding: 24px;
    cursor: pointer;
    transition: 0.3s;

    &:hover {
      box-shadow: 0px 0px 10px #ccc;
      transform: scale(1.1);
    }
  }
`;

export const BarGraphContent = styled.section`
  width: 100%;
  margin-top: 32px;

  strong {
    color: #00111f;
    font-size: 14px;
    font-weight: 500;
  }
`;

export const BarGraph = styled.article`
  height: 500px;
  background: #f9f9f9;
  border-radius: 16px;
  border: 1px solid rgba(146, 146, 146, 0.2);
  margin-top: 16px;
  padding: 24px;
  cursor: pointer;

  transition: 0.3s;

  &:hover {
    box-shadow: 0px 0px 10px #ccc;
  }
`;
