import FONT from '@constants/fonts';
import { styled } from 'styled-components';

interface IButton {
  width?: string;
  height?: string;
  bgColor: string;
  color: string;
  onClick?: () => void;
  children: string;
}

const Button = ({ width, height, bgColor, color, onClick, children }: IButton) => {
  return (
    <ButtonWrapper
      style={FONT.HEADLINE2}
      $width={width}
      $height={height}
      $bgColor={bgColor}
      $color={color}
      onClick={onClick}
    >
      {children}
    </ButtonWrapper>
  );
};

interface ButtonProps {
  $width?: string;
  $height?: string;
  $bgColor: string;
  $color: string;
}

const ButtonWrapper = styled.div<ButtonProps>`
  width: ${(props) => props.$width || '100%'};
  height: ${(props) => props.$height || ''};
  background-color: ${(props) => props.$bgColor};
  color: ${(props) => props.$color};
  padding: 10px;
  border: 1px solid black;
  border-color: ${(props) => props.$color};
  border-radius: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

export default Button;
