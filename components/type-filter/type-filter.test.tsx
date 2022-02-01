import { composeStories } from '@storybook/testing-react';
import { getAllByRole, render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import * as stories from './type-filter.stories';

const { Default } = composeStories(stories);

describe('Type Filter Component', () => {
  it('Should render component successfully', () => {
    const { getByTestId } = render(<Default {...Default.args} />);
    expect(getByTestId('type-filter')).toBeInTheDocument();
  });

  it('Should have provided class name', () => {
    const { container } = render(<Default {...Default.args} className="custom" />);

    const searchInput = container.querySelector('.custom');
    expect(searchInput).toBeInTheDocument();
  });

  it('Should call onChange when click on filter item', async () => {
    const mockCallBack = jest.fn();
    const { container } = render(<Default {...Default.args} onChange={mockCallBack} />);
    const radioButton = getAllByRole(container, 'radio')[1] as HTMLInputElement;
    userEvent.click(radioButton);
    await waitFor(() => {
      expect(mockCallBack).toHaveBeenCalledWith('movie');
    });
  });
});
