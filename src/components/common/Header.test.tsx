import Header from '@common/Header';
import { render } from '@testing-library/react';

describe('contentList test', () => {
  it('renders content', () => {
    const { getByText } = render(<Header />);
    const mainTitle = getByText('서비스명');
    expect(mainTitle).toBeInTheDocument();
  });
});
