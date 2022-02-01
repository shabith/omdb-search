import { composeStories } from '@storybook/testing-react';
import { render } from '@testing-library/react';

import * as stories from './years-filter.stories';

const { Default } = composeStories(stories);

describe('Year Filter Component', () => {
  it('Should render component successfully', () => {
    const { getByTestId } = render(<Default {...Default.args} />);
    expect(getByTestId('years-filter')).toBeInTheDocument();
  });

  it('Should have provided class name', () => {
    const { container } = render(<Default {...Default.args} className="custom" />);

    const rangeWrapper = container.querySelector('.custom');
    expect(rangeWrapper).toBeInTheDocument();
  });
});
