import { composeStories } from '@storybook/testing-react';
import { render } from '@testing-library/react';

import * as stories from './detail-view.stories';

const { Default } = composeStories(stories);

describe('Detail View Component', () => {
  it('Should render component successfully', () => {
    const { getByTestId } = render(<Default />);

    const detailView = getByTestId('detail-view-comp');
    expect(detailView).toBeInTheDocument();
  });
});
