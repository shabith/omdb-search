import { composeStories } from '@storybook/testing-react';
import { render } from '@testing-library/react';

import * as stories from './header.stories';

const { Default } = composeStories(stories);

describe('Header Component', () => {
  it('Should render component successfully', () => {
    const { getByTestId } = render(<Default />);

    const header = getByTestId('header-comp');
    expect(header).toBeInTheDocument();
  });

  it('Should add provided class to the component', () => {
    const { container } = render(<Default {...Default.args} className="header-special-class" />);

    const classSelector = container.querySelectorAll('.header-special-class');

    expect(classSelector.length).toBe(1);
  });
});
