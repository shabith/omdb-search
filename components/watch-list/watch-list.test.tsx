import { composeStories } from '@storybook/testing-react';
import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import * as stories from './watch-list.stories';

const { Default } = composeStories(stories);

describe('Watch List Component', () => {
  it('Should render component successfully', () => {
    const { getByTestId } = render(<Default />);

    const header = getByTestId('watch-list-comp');
    expect(header).toBeInTheDocument();
  });

  it('Should called onItemClick when clicking on title item', async () => {
    const mockCallback = jest.fn();
    const { container } = render(<Default {...Default.args} onItemClick={mockCallback} />);
    const firstArticle = container.querySelector('.content article .content-wrapper');
    if (firstArticle) {
      userEvent.click(firstArticle);
      await waitFor(() => {
        expect(mockCallback).toBeCalled();
      });
    }
    jest.clearAllMocks();
  });

  it('Should called onGoBack when clicking on back button', async () => {
    const mockCallback = jest.fn();
    const { container } = render(<Default {...Default.args} onGoBack={mockCallback} />);
    const firstArticle = container.querySelector('.header button');
    if (firstArticle) {
      userEvent.click(firstArticle);
      await waitFor(() => {
        expect(mockCallback).toBeCalled();
      });
    }
    jest.clearAllMocks();
  });
});
