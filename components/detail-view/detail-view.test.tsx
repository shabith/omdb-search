import { composeStories } from '@storybook/testing-react';
import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import * as stories from './detail-view.stories';

const { Default } = composeStories(stories);

describe('Detail View Component', () => {
  it('Should render component successfully', () => {
    const { getByTestId } = render(<Default {...Default.args} />);

    const detailView = getByTestId('detail-view-comp');
    expect(detailView).toBeInTheDocument();
  });

  it('Should show added class on the component', () => {
    const { container } = render(<Default {...Default.args} className="omdb-detail-component" />);

    const detailSkeletons = container.querySelectorAll('.omdb-detail-component');
    expect(detailSkeletons.length).toBe(1);
  });

  it('Should trigger onClose by clicking close button', async () => {
    const mockCallback = jest.fn();
    const { getAllByText } = render(<Default {...Default.args} onClose={mockCallback} />);

    const closeBtn = getAllByText('Close');
    userEvent.click(closeBtn[0]);
    await waitFor(() => {
      expect(mockCallback).toHaveBeenCalled();
    });
    jest.clearAllMocks();
  });
});
