import { composeStories } from '@storybook/testing-react';
import { render } from '@testing-library/react';

import * as stories from './list-item.stories';

const { Default, ActiveListItem } = composeStories(stories);

describe('List Item Component', () => {
  it('Should render component successfully', () => {
    const { getByTestId } = render(<Default {...Default.args} />);

    const listItem = getByTestId('list-item-comp');
    expect(listItem).toBeInTheDocument();
  });

  it('Should show active state when active mode is true', () => {
    const { getByTestId } = render(<ActiveListItem {...ActiveListItem.args} />);

    const listItem = getByTestId('list-item-comp');
    expect(listItem).toHaveStyle('background: #F1F1F1');
  });
});
