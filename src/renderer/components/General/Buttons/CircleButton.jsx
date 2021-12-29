import styled from 'styled-components';

const SmallCircle = styled.div`
  width: 17px;
  height: 17px;
  margin: 2px;
  border-radius: 50%;
  border: none;
  background-color: ${({ theme: { color } }) => color.orange};
  background-color: grey;
`;

const StyledCircleButton = styled.button`
  position: relative;
  background-color: inherit;
  padding: 0;
  border-radius: 20px;
  width: auto;
  display: flex;
  align-items: center;
  border: none;
  margin-right: 20px;

  &:hover {
    div {
      background-color: ${({ theme: { color } }) => color.orange};
    }
    p {
      color: ${({ theme: { color } }) => color.orange};
    }
  }
`;
const UtilityButtonText = styled.p`
  margin: 0 10px 0 5px;
  color: grey;
  font-size: 15px;
`;
export default function CricleButton({ children, onClick }) {
  return (
    <StyledCircleButton onClick={onClick}>
      <SmallCircle />
      <UtilityButtonText>{children}</UtilityButtonText>
    </StyledCircleButton>
  );
}
