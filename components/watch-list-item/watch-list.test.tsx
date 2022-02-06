import { composeStories } from '@storybook/testing-react';
import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import * as stories from './watch-list.stories';

const { Default } = composeStories(stories);

describe('Watch List Item Component', () => {
  it('Should render component successfully', () => {
    const { getByTestId } = render(<Default {...Default.args} />);

    const listItem = getByTestId('watch-list-item-comp');
    expect(listItem).toBeInTheDocument();
  });

  it('Should trigger onClick event with imdbId on click', async () => {
    const mockCallBack = jest.fn();
    const { container } = render(<Default {...Default.args} onClick={(id) => mockCallBack(id)} />);

    const listItem = container.querySelector('.content-wrapper');
    if (listItem) {
      userEvent.click(listItem);
      await waitFor(() => {
        expect(mockCallBack).toHaveBeenCalledWith(Default.args?.data?.imdbId);
      });
    }

    jest.clearAllMocks();
  });
});
