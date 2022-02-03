import { composeStories } from '@storybook/testing-react';
import { render } from '@testing-library/react';

import * as stories from './watch-list.stories';

const { Default } = composeStories(stories);

describe('Watch List Component', () => {
  it('Should render component successfully', () => {
    const { getByTestId } = render(<Default />);

    const header = getByTestId('watch-list-comp');
    expect(header).toBeInTheDocument();
  });
});
