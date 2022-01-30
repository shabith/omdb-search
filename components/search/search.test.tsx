import { composeStories } from '@storybook/testing-react';
import { render } from '@testing-library/react';

import * as stories from './search.stories';

const { DefaultSearch } = composeStories(stories);

describe('Search Component', () => {
  it('Should render component successfully', () => {
    const { getByPlaceholderText } = render(<DefaultSearch {...DefaultSearch.args} />);

    const searchInput = getByPlaceholderText('search');
    expect(searchInput).toBeInTheDocument();
  });
});
