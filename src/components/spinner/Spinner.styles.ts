import styled from "styled-components";
import { keyframes } from 'styled-components'

export const SpinnerDiv = styled.div`
    display: flex;
    background-color: white;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    opacity: 0.6;
    z-index: 20;
`;

const SvgAnimation = keyframes`
    0% {
        transform: rotateZ(0deg);
    }
    100% {
        transform: rotateZ(360deg)
    }
`;

const CircleAnimation = keyframes`
  0%,
  25% {
    stroke-dashoffset: 280;
    transform: rotate(0);
  }
  
  50%,
  75% {
    stroke-dashoffset: 75;
    transform: rotate(45deg);
  }
  
  100% {
    stroke-dashoffset: 280;
    transform: rotate(360deg);
  }
`;

export const Svg = styled.svg`
  animation: 2s linear infinite ${SvgAnimation};
    width: 100px;
    height: 100px;
`

export const Circle = styled.circle`
  fill: transparent;
  stroke: #2f3d4c;
  stroke-width: 10;
  stroke-dasharray: 283;
  stroke-linecap: round;
  transform-origin: 50% 50%;
  stroke-dashoffset: 75;
  animation: 2.4s ease-in-out infinite both ${CircleAnimation};
`