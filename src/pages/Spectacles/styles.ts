import styled from 'styled-components';
import { linearGradient } from 'polished';

export const Container = styled.div`
  width: 100%;
  padding: 0 16px;

  display: flex;
`;

export const Content = styled.div`
  flex: 1;
  padding: 32px 16px 32px 32px;
  background: ${linearGradient({
    colorStops: ['#F2F2F2', '#E2E2E2'],
    toDirection: 'to bottom right',
  })};
`;
