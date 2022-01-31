import { composeStories } from '@storybook/testing-react';
import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { sleep } from '@app/utils/sleep';

import * as stories from './search.stories';
import MagnifierIcon from './magnifier-icon';

const { DefaultSearch } = composeStories(stories);

describe('Search Component', () => {
  it('Should render component successfully', () => {
    const { getByPlaceholderText } = render(<DefaultSearch {...DefaultSearch.args} />);

    const searchInput = getByPlaceholderText('Type title to search');
    expect(searchInput).toBeInTheDocument();
  });

  it('Should render icon successfully', () => {
    const { getByTestId } = render(<MagnifierIcon />);

    const searchInput = getByTestId('magnify-icon');
    expect(searchInput).toBeInTheDocument();
  });

  it('Should call onChange after 300ms after typing', async () => {
    const mockCallBack = jest.fn();
    const { getByTestId } = render(
      <DefaultSearch {...DefaultSearch.args} onChange={mockCallBack} delay={300} />,
    );
    const input = getByTestId('search-query');
    userEvent.type(input, 'S');
    await sleep(200);
    expect(mockCallBack).not.toHaveBeenCalledWith('S');
    userEvent.type(input, 't');
    userEvent.type(input, 'a');
    userEvent.type(input, 'r');
    await sleep(200);
    await waitFor(() => expect(mockCallBack).toHaveBeenCalledWith('Star'));
    jest.clearAllMocks();
  });
});
