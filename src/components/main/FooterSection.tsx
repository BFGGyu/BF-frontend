import styled from 'styled-components';

const FooterSection = () => {
  return (
    <FooterWrapper>
      <PlaceWrapper>
        <PlaceItem></PlaceItem>
        <PlaceItem></PlaceItem>
      </PlaceWrapper>
    </FooterWrapper>
  );
};

const FooterWrapper = styled.div`
  background-color: green;
  height: 30vh;
  width: 100%;
  display: flex;
  justify-content: center;
`;

const PlaceWrapper = styled.div`
  background-color: blue;
  height: 100%;
  width: 90%;
  display: flex;
  gap: 10px;
  justify-content: center;
  align-items: center;
`;

const PlaceItem = styled.div`
  background-color: white;
  height: 90%;
  width: 45%;
  border: 3px solid black;
  border-radius: 16px;
`;

export default FooterSection;
