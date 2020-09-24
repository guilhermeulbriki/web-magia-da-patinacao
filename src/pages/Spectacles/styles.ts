import { Form } from '@unform/web';
import styled, { keyframes } from 'styled-components';

export const Container = styled.div`
  width: 100%;
  padding: 0 16px;

  display: flex;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 950px;
  margin: 54px auto;
  padding: 32px 16px 32px 32px;
  background: #f9f9f9;
  border-radius: 16px;

  display: flex;
`;

export const Table = styled.main`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding-right: 16px;

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    strong {
      font-size: 16px;
      font-weight: 500;
    }
  }
`;

export const TablePagination = styled.article`
  display: flex;
  align-items: center;
  margin-right: 16px;

  span {
    margin: 0 4px;
    font-size: 14px;
    color: #4f4f4f;

    > strong {
      margin-left: 4px;
    }
  }

  svg {
    cursor: pointer;
    transition: transform 0.2s;

    &:hover {
      transform: scale(1.2);
    }
  }
`;

const tableContentAnimation = keyframes`
  from {
    opacity: 0;
    transform: translateX(-20px);
  } to {
    opacity: 1;
    transform: translateX(0px);
  }
`;

export const TableContent = styled.div`
  padding: 16px;
  border: 1px solid #dadada;
  border-radius: 16px;
  margin-top: 16px;

  display: flex;
  justify-content: space-between;

  animation: ${tableContentAnimation} 0.8s ease-out;

  section {
    display: flex;
    flex-direction: column;
    align-items: center;

    strong {
      font-size: 14px;
      font-weight: 500;
      height: 24px;
      margin-bottom: 8px;
    }
  }
`;

export const TableRow = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  min-height: 24px;
  color: #4f4f4f;

  svg {
    cursor: pointer;
  }

  & + span {
    margin-top: 4px;
  }

  svg + svg {
    margin-left: 8px;
  }
`;

const contentEditionsAnimation = keyframes`
  from {
    opacity: 0;
    transform: translateX(20px);
  } to {
    opacity: 1;
    transform: translateX(0px);
  }
`;

export const ContentEditions = styled.aside`
  width: 270px;
  margin-left: 16px;

  animation: ${contentEditionsAnimation} 0.8s ease-out;
`;

export const AddEdition = styled(Form)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-right: 16px;

  > strong {
    font-size: 16px;
    font-weight: 500;
  }

  strong + div {
    margin-top: 16px;
  }

  div + div {
    margin-top: 8px;
  }
`;

export const AlterEdition = styled(Form)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-right: 16px;
  margin-top: 32px;

  > strong {
    font-size: 16px;
    font-weight: 500;
  }

  strong + div {
    margin-top: 16px;
  }

  div + div {
    margin-top: 8px;
  }
`;
