import { BounceLoader } from 'react-spinners';
import styled from 'styled-components';

const Loading = () => {
  return (
    <LoadingWrapper>
      <BounceLoader color='#36d646' size={70} />
    </LoadingWrapper>
  );
};

const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 400px;
`;

export default Loading;
