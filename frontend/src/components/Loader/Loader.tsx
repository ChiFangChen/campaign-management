import { HTMLAttributes } from 'react';
import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const StyledLoader = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
  background-color: var(--tw-color-gray-50);
  opacity: 0.6;
`;

const LoaderIcon = styled.div`
  width: 40px;
  height: 40px;
  border: 4px solid var(--tw-color-gray-200); /* 淺色邊框 */
  border-top: 4px solid var(--tw-color-gray-300); /* 深色邊框 */
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;

export const Loader = (props: HTMLAttributes<HTMLDivElement>) => (
  <StyledLoader {...props}>
    <LoaderIcon />
  </StyledLoader>
);
