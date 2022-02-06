import { composeStories } from '@storybook/testing-react';
import { render } from '@testing-library/react';

import * as stories from './icon.stories';

const { Default } = composeStories(stories);

describe('Icon Component', () => {
  it('Should render component successfully', () => {
    const { getByTestId } = render(<Default {...Default.args} />);

    const listItem = getByTestId('icon-collection');
    expect(listItem).toBeInTheDocument();
  });
});
