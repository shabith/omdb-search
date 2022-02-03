import { composeStories } from '@storybook/testing-react';
import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import * as stories from './list-item.stories';

const { Default, ActiveListItem } = composeStories(stories);

describe('List Item Component', () => {
  it('Should render component successfully', () => {
    const { getByTestId } = render(<Default {...Default.args} />);

    const listItem = getByTestId('list-item-comp');
    expect(listItem).toBeInTheDocument();
  });

  it('Should show active state when active mode is true', () => {
    const { getByTestId } = render(<ActiveListItem {...ActiveListItem.args} />);

    const listItem = getByTestId('list-item-comp');
    expect(listItem).toHaveStyle('background: #F1F1F1');
  });

  it('Should trigger onClick event with imdbId on click', async () => {
    const mockCallBack = jest.fn();
    const { getByTestId } = render(
      <Default {...ActiveListItem.args} onClick={(id) => mockCallBack(id)} />,
    );

    const listItem = getByTestId('list-item-comp');
    userEvent.click(listItem);
    await waitFor(() => {
      expect(mockCallBack).toHaveBeenCalledWith('tt0076759');
    });

    jest.clearAllMocks();
  });
});
