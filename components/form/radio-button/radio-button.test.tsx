import { composeStories } from '@storybook/testing-react';
import { getAllByRole, render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import * as stories from './radio-button.stories';

const { Default } = composeStories(stories);

describe('Radio Button Component', () => {
  it('Should render component successfully', () => {
    const { getByText } = render(<Default {...Default.args} label="Banana" />);
    expect(getByText('Banana')).toBeInTheDocument();
  });
  it('Should called onChange event on click', async () => {
    const mockCallBack = jest.fn();
    const { container } = render(
      <Default
        {...Default.args}
        value="banana"
        onChange={(event) => mockCallBack(event.target.value)}
      />,
    );
    const radioButton = getAllByRole(container, 'radio')[0] as HTMLInputElement;
    userEvent.click(radioButton);
    await waitFor(() => {
      expect(mockCallBack).toHaveBeenCalledWith('banana');
    });

    jest.clearAllMocks();
  });
});
