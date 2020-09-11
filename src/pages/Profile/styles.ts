import styled from 'styled-components';
import { lighten, shade } from 'polished';

export const Container = styled.div`
  > header {
    height: 144px;
    background: #ccc;

    display: flex;
    align-items: center;

    div {
      width: 100%;
      max-width: 1120px;
      margin: 0 auto;

      display: flex;
      align-items: center;
      justify-content: space-between;

      svg {
        cursor: pointer;
        color: #005678;
        width: 24px;
        height: 24px;

        transition: color 0.2s;

        &:hover {
          color: ${lighten(0.2, '#005678')};
        }
      }
    }
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  place-content: center;
  margin: -176px auto 0;

  width: 100%;

  form {
    margin: 80px 0;
    width: 340px;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;

    div {
      margin-bottom: 16px;
    }

    h1 {
      margin-bottom: 24px;
      font-size: 20px;
      text-align: left;
    }

    a {
      color: #f4ede8;
      display: block;
      margin-top: 24px;
      text-decoration: none;
      transition: color 0.2s;

      &:hover {
        color: ${shade(0.2, '#f4ede8')};
      }
    }

    input[name='old_password'] {
      margin-top: 24px;
    }
  }
`;

export const AvatarInput = styled.div`
  margin-bottom: 32px;
  position: relative;
  width: 186px;
  align-self: center;

  img {
    width: 186px;
    height: 186px;
    border-radius: 50%;
  }
`;
