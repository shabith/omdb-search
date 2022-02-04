import { composeStories } from '@storybook/testing-react';
import { render } from '@testing-library/react';

import * as stories from './item-list.stories';

const { Default } = composeStories(stories);

describe('Item List Component', () => {
  it('Should render component successfully', () => {
    const { getByTestId } = render(<Default {...Default.args} />);

    const listItem = getByTestId('item-list-comp');
    expect(listItem).toBeInTheDocument();
  });
});
