import { composeStories } from '@storybook/testing-react';
import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { sleep } from '@app/utils/sleep';
import MagnifierIcon from '@app/components/icon/magnifier';

import * as stories from './search.stories';

const { Default } = composeStories(stories);

describe('Search Component', () => {
  it('Should render component successfully', () => {
    const { getByPlaceholderText } = render(<Default {...Default.args} />);

    const searchInput = getByPlaceholderText('Type title to search');
    expect(searchInput).toBeInTheDocument();
  });

  it('Should render icon successfully', () => {
    const { getByTestId } = render(<MagnifierIcon />);

    const searchInput = getByTestId('magnify-icon');
    expect(searchInput).toBeInTheDocument();
  });

  it('Should have provided class name', () => {
    const { container } = render(<Default {...Default.args} className="custom" />);

    const searchInput = container.querySelector('.custom');
    expect(searchInput).toBeInTheDocument();
  });

  it('Should call onChange after 300ms after typing', async () => {
    const mockCallBack = jest.fn();
    const { getByTestId } = render(
      <Default {...Default.args} onChange={mockCallBack} delay={300} />,
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
