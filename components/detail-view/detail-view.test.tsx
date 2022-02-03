import { composeStories } from '@storybook/testing-react';
import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import '../../testing/match-media.mock';
import * as stories from './detail-view.stories';

const { Default, LoadingDetails } = composeStories(stories);

describe('Detail View Component', () => {
  it('Should render component successfully', () => {
    const { getByTestId } = render(<Default {...Default.args} />);

    const detailView = getByTestId('detail-view-comp');
    expect(detailView).toBeInTheDocument();
  });

  it('Should show loading when it is in loading state', () => {
    const { container } = render(<LoadingDetails {...LoadingDetails.args} />);

    const detailSkeletons = container.querySelectorAll('.react-loading-skeleton');
    expect(detailSkeletons.length).not.toBe(0);
  });

  it('Should trigger onClose by clicking close button', async () => {
    const mockCallback = jest.fn();
    const { getAllByText } = render(
      <LoadingDetails {...LoadingDetails.args} onClose={mockCallback} />,
    );

    const closeBtn = getAllByText('Close');
    userEvent.click(closeBtn[0]);
    await waitFor(() => {
      expect(mockCallback).toHaveBeenCalled();
    });
    jest.clearAllMocks();
  });
});
