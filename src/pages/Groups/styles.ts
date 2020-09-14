import styled, { keyframes } from 'styled-components';
import { Form } from '@unform/web';

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

  display: flex;
`;

export const GroupsContent = styled.main`
  width: 450px;

  > header {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    > strong {
      font-size: 36px;
      font-weight: 600;
      color: #00111f;
    }

    > span {
      font-size: 14px;
      color: #4f4f4f;
    }
  }
`;

const animatedAfter = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  } to {
    opacity: 1;
    transform: translateY(0px);
  }
`;

const animatedCitiesInitiate = keyframes`
  from {
    opacity: 0;
    transform: translateX(-100px);
  } to {
    opacity: 1;
    transform: translateX(0px);
  }
`;

export const GroupsListCities = styled.section`
  display: flex;
  margin-top: 24px;
  width: 100%;

  animation: ${animatedCitiesInitiate} 1s ease-out;

  span {
    white-space: nowrap;
    font-size: 14px;
    cursor: pointer;
    position: relative;
    color: #4f4f4f;

    & + span {
      margin-left: 16px;
    }

    &.active {
      font-weight: 500;
      color: #00111f;

      &::after {
        content: '';
        position: absolute;
        width: 100%;
        height: 2px;
        bottom: -4px;
        left: 0px;
        background: #0081b2;
        animation: ${animatedAfter} 0.3s ease-out;
      }
    }
  }
`;

export const GroupsList = styled.main`
  width: 100%;
  margin-top: 24px;
`;

export const Group = styled.article`
  background: #f9f9f9;
  padding: 16px;
  width: 100%;
  border-radius: 8px;
  transition: 0.3s;
  cursor: pointer;
  min-height: 150px;

  & + article {
    margin-top: 24px;
  }

  &:hover {
    box-shadow: 0px 0px 10px #ccc;
  }

  > header {
    display: flex;
    justify-content: space-between;
    padding-bottom: 8px;
    border-bottom: 1px solid #929292;

    strong {
      font-size: 24px;
      font-weight: 500;
    }

    aside {
      display: flex;
      flex-direction: column;

      span {
        font-size: 16px;
        color: #4f4f4f;
        text-align: end;

        & + span {
          margin-top: 4px;
          font-size: 14px;
        }
      }
    }
  }
`;

export const GroupSchedules = styled.div`
  display: flex;
  width: 100%;
  margin-top: 16px;
  justify-content: space-between;

  > main {
  }

  > aside {
    display: flex;
    flex-direction: column;

    svg {
      opacity: 0.6;
      transition: 0.2s;

      &:hover {
        opacity: 1;
        transform: scale(1.1);
      }

      & + svg {
        margin-top: 8px;
      }
    }
  }
`;

export const GroupSchedule = styled.section`
  display: flex;
  align-items: center;

  & + section {
    margin-top: 8px;
  }

  > p {
    color: #4f4f4f;
    font-size: 16px;
    font-weight: 500;
    margin-right: 24px;
  }

  > span {
    background: #005678;
    border-radius: 16px;
    padding: 4px 8px;

    color: #eaeaea;
    font-size: 16px;
    font-weight: 500;

    & + span {
      margin-left: 16px;
    }
  }
`;

export const GroupsEdit = styled.aside`
  flex: 1;
  margin-left: 32px;
  max-width: 351px;
`;

const animatedFormsInitiate = keyframes`
  from {
    opacity: 0;
    transform: translateX(100px);
  } to {
    opacity: 1;
    transform: translateX(0px);
  }
`;

export const AddGroup = styled(Form)`
  display: flex;
  flex-direction: column;

  animation: ${animatedFormsInitiate} 0.6s ease-out;

  > strong {
    font-size: 16px;
    color: #00111f;
    font-weight: 600;
  }

  > div {
    display: flex;
    justify-content: space-between;
    align-items: center;

    margin-top: 16px;

    div + div {
      margin-left: 8px;
    }
  }

  > button {
    margin: 24px auto 0 auto;
  }
`;

export const UpdateGroup = styled(Form)`
  margin-top: 48px;
  display: flex;
  flex-direction: column;

  animation: ${animatedFormsInitiate} 1s ease-out;

  > strong {
    font-size: 16px;
    color: #00111f;
    font-weight: 600;
  }

  > div {
    display: flex;
    justify-content: space-between;
    align-items: center;

    margin-top: 16px;

    div + div {
      margin-left: 8px;
    }
  }

  > button {
    margin: 24px auto 0 auto;
  }
`;
