import { composeStories } from '@storybook/testing-react';
import { render } from '@testing-library/react';

import * as stories from './years-filter.stories';

const { DefaultYearsFilter } = composeStories(stories);

describe('Year Filter Component', () => {
  it('Should render component successfully', () => {
    const { getByTestId } = render(<DefaultYearsFilter {...DefaultYearsFilter.args} />);
    expect(getByTestId('years-filter')).toBeInTheDocument();
  });
});
