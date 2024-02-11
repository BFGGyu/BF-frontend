import { render, screen } from '@testing-library/react';
import { RecoilRoot } from 'recoil';

import Header from '@common/Header';

describe('헤더 컴포넌트 렌더링', () => {
  it('Login 텍스트가 렌더링 되었나요?', () => {
    render(
      <RecoilRoot>
        <Header type={'white'} />
      </RecoilRoot>
    );
    const mainTitle = screen.getByText('Login');
    expect(mainTitle).toBeInTheDocument();
  });
});
