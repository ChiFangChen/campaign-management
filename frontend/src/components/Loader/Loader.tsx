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
  opacity: 0.6;
`;

const LoaderIcon = styled.div`
  width: 40px;
  height: 40px;
  border-width: 4px;
  border-style: solid;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;

export const Loader = (props: HTMLAttributes<HTMLDivElement>) => (
  <StyledLoader className="bg-gray-50 dark:bg-neutral-950" {...props}>
    <LoaderIcon className="border-gray-200 border-t-gray-300 dark:border-neutral-700 dark:border-t-neutral-800 " />
  </StyledLoader>
);
