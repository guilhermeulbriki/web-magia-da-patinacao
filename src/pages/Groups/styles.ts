import styled, { css, keyframes } from 'styled-components';
import { Form } from '@unform/web';
import { lighten } from 'polished';

interface IGroupsProps {
  selected: boolean;
  color: string;
}

interface IGroupScheduleActionsProps {
  action: 'alter' | 'delete' | null | undefined;
}

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

export const Group = styled.article<IGroupsProps>`
  padding: 16px;
  width: 100%;
  border-radius: 8px;
  transition: 0.3s;
  cursor: pointer;
  min-height: 150px;

  & + article {
    margin-top: 24px;
  }

  ${(props) =>
    css`
      background: ${lighten(0.3, props.color)};

      &:hover {
        box-shadow: 0px 0px 3px ${props.color};
      }
    `}

  ${(props) =>
    props.selected &&
    css`
      box-shadow: 0px 0px 6px ${props.color};
    `}

  > header {
    display: flex;
    justify-content: space-between;
    padding-bottom: 8px;
    border-bottom: 1px solid #929292;

    > span {
      display: flex;
      align-items: center;

      strong {
        font-size: 24px;
        font-weight: 500;
        margin-right: 8px;
      }
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
`;

export const GroupScheduleActions = styled.aside<IGroupScheduleActionsProps>`
  display: flex;
  flex-direction: column;

  svg {
    opacity: 0.6;
    transition: 0.2s;

    &.alter {
      ${(props) =>
        props.action === 'alter' &&
        css`
          opacity: 1;
          transform: scale(1.1);
        `}
    }

    &.delete {
      ${(props) =>
        props.action === 'delete' &&
        css`
          opacity: 1;
          transform: scale(1.1);
        `}
    }

    &:hover {
      opacity: 1;
      transform: scale(1.1);
    }

    & + svg {
      margin-top: 8px;
    }
  }
`;

export const GroupSchedule = styled(Form)`
  display: flex;
  align-items: center;

  & + form {
    margin-top: 8px;
  }

  > button {
    border: 0;
    background: transparent;
    display: flex;
    align-items: center;
  }

  > span {
    display: flex;
    align-items: center;
    margin-left: -8px;
  }

  div {
    display: flex;
    align-items: center;
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
