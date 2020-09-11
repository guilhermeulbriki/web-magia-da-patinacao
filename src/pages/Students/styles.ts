import styled, { keyframes } from 'styled-components';

export const Container = styled.div`
  width: 100%;
  padding: 0 16px;

  display: flex;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 950px;
  margin: 0 auto;
  padding: 32px 16px 32px 32px;
`;

export const StudentData = styled.section`
  width: 100%;
  display: flex;
  justify-content: space-between;

  & article + article {
    margin-left: 24px;
  }
`;

const pieGraphAnimation = keyframes`
  from {
    transform: rotate(150deg);
  } to {
    transform: rotate(0deg);
  }
`;

const pieGraphLegendAnimation = keyframes`
  from {
    opacity: 0;
  } to {
    opacity: 1;
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

    > div div svg g g path {
      animation: ${pieGraphAnimation} 1.5s ease-out;
    }

    div div svg g g:last-child g {
      animation: ${pieGraphLegendAnimation} 1.5s ease-out;
    }

    transition: 0.3s;

    &:hover {
      box-shadow: 0px 0px 10px #ccc;
      transform: scale(1.1);
    }
  }
`;

export const ClassTable = styled.section`
  height: 240px;
  width: 404px;

  strong {
    color: #00111f;
    font-size: 14px;
    font-weight: 500;
  }
`;

export const BarGraph = styled.article`
  height: 240px;
  width: 404px;
  background: #f9f9f9;
  border-radius: 16px;
  border: 1px solid rgba(146, 146, 146, 0.2);
  margin-top: 16px;
  cursor: pointer;

  transition: 0.3s;

  &:hover {
    box-shadow: 0px 0px 10px #ccc;
  }
`;

export const StudentTable = styled.article`
  background: #f9f9f9;
  margin-top: 48px;
  border-radius: 16px;
  padding: 16px 24px;

  transition: 0.3s;

  &:hover {
    box-shadow: 0px 0px 10px #ccc;
  }

  header {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;

    section {
      display: flex;
      align-items: center;
      width: 100%;

      strong {
        color: #1f4a6e;
        font-size: 16px;
        font-weight: 600;
        margin-right: 16px;
      }
    }
  }

  footer {
    width: 100%;
    display: flex;

    > span {
      margin-right: 16px;
    }

    span {
      font-size: 14px;
      font-weight: 500;
      color: #00111f;
    }
  }
`;

export const StudentTableSearch = styled.section`
  height: 30px;
  width: 100%;
  max-width: 470px;
  margin-right: 32px;
  padding: 0 16px;
  border-radius: 16px;
  background: #eaeaea;

  display: flex;
  justify-content: space-between;

  > input {
    background: transparent;
    border: 0;
    width: 100%;
    padding-right: 16px;
    font-size: 14px;
    color: #4f4f4f;

    &::placeholder {
      color: #929292;
    }
  }
`;

export const StudentTablePagination = styled.aside`
  display: flex;
  align-items: center;

  svg {
    cursor: pointer;
  }

  > span {
    margin: 0 4px;
    font-size: 14px;
    display: flex;
    align-items: center;

    > strong {
      margin-left: 4px;
      color: #1f4a6e;
      font-size: 16px;
      font-weight: 500;
    }
  }
`;

export const StudentTableContent = styled.main`
  min-height: 300px;
  max-height: 600px;
  width: 100%;
  border-radius: 8px;
  border: 1px solid #dadada;
  margin: 20px 0;
  text-align: center;
  padding: 8px;
  overflow-y: auto;

  display: flex;
  justify-content: space-around;

  ::-webkit-scrollbar {
    width: 4px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #0084b9;
    border-radius: 8px;
  }

  ::-webkit-scrollbar-track {
    background-color: #00a3e4;
  }

  section {
    display: flex;
    flex-direction: column;

    > strong {
      font-size: 16px;
      color: #00111f;
      font-weight: 500;
      margin-bottom: 16px;
    }

    span {
      height: 20px;
      text-align: center;
      font-size: 14px;
      color: #00111f;
      font-weight: 400;
      margin-bottom: 8px;

      &.pending {
        color: #eb5757;
      }

      &.ok {
        color: #27ae60;
      }
    }
  }
`;
