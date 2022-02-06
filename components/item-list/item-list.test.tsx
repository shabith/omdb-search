import { composeStories } from '@storybook/testing-react';
import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import * as stories from './item-list.stories';

const { Default } = composeStories(stories);

describe('Item List Component', () => {
  it('Should render component successfully', () => {
    const { getByTestId } = render(<Default {...Default.args} />);

    const listItem = getByTestId('item-list-comp');
    expect(listItem).toBeInTheDocument();
  });

  it('Should trigger onItemClick when you click on Item', async () => {
    const mockCallBack = jest.fn();

    const { container } = render(<Default {...Default.args} onItemClick={mockCallBack} />);

    const firstArticle = container.querySelector('.item-list-wrapper article');
    if (firstArticle) {
      userEvent.click(firstArticle);

      await waitFor(() => {
        expect(mockCallBack).toHaveBeenCalledWith('tt007659');
      });
    }

    jest.clearAllMocks();
  });

  it('Should trigger onClickWatchList when you click on WatchList Button', async () => {
    const mockCallBack = jest.fn();

    const { container } = render(<Default {...Default.args} onClickWatchList={mockCallBack} />);

    const watchListButton = container.querySelector('.watchlist-button-wrapper button');

    if (watchListButton) {
      userEvent.click(watchListButton);
      await waitFor(() => {
        expect(watchListButton).toHaveBeenCalled();
      });
    }

    jest.clearAllMocks();
  });

  it('Should add provided class to the component', () => {
    const { container } = render(<Default {...Default.args} className="item-list-special-class" />);

    const classSelector = container.querySelectorAll('.item-list-special-class');

    expect(classSelector.length).toBe(1);
  });
});
