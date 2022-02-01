import { composeStories } from '@storybook/testing-react';
import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import * as stories from './button.stories';

const {
  WithoutIcon,
  WithoutIconToggleMode,
  WithIcon,
  ToggleModeSingleIcon,
  ToggleModeMultipleIcons,
} = composeStories(stories);

describe('Button Component', () => {
  it('Should render `no icon button` component successfully', () => {
    const { getByTestId } = render(<WithoutIcon {...WithoutIcon.args} />);

    const button = getByTestId('button-comp');
    expect(button).toBeInTheDocument();
  });

  it('Should render `no icon toggle` button component successfully', () => {
    const { getByTestId } = render(<WithoutIconToggleMode {...WithoutIconToggleMode.args} />);

    const button = getByTestId('button-comp');
    expect(button).toBeInTheDocument();
  });

  it('Should render `with single icon` button component successfully', () => {
    const { getByTestId } = render(<WithIcon {...WithIcon.args} />);

    const button = getByTestId('button-comp');
    expect(button.querySelectorAll('svg').length).toBe(1);
    expect(button).toBeInTheDocument();
  });

  it('Should render `with single icon` toggle button component successfully', () => {
    const { getByTestId } = render(<ToggleModeSingleIcon {...ToggleModeSingleIcon.args} />);

    const button = getByTestId('button-comp');
    expect(button.querySelectorAll('svg').length).toBe(1);
    expect(button).toBeInTheDocument();
  });

  it('Should render `with multiple icons` toggle button component successfully', () => {
    const { getByTestId } = render(<ToggleModeMultipleIcons {...ToggleModeMultipleIcons.args} />);

    const button = getByTestId('button-comp');
    expect(button.querySelectorAll('svg').length).toBe(1);
    expect(button).toBeInTheDocument();
  });

  it('Should called onClicked event on `toggle disabled` button click', async () => {
    const mockCallBack = jest.fn();
    const { getByTestId } = render(
      <WithoutIcon {...WithoutIcon.args} onClick={(isToggled) => mockCallBack(isToggled)} />,
    );
    const button = getByTestId('button-comp');
    userEvent.click(button);

    await waitFor(() => {
      expect(mockCallBack).toHaveBeenCalledWith(undefined);
    });

    jest.clearAllMocks();
  });

  it('Should called onClicked event on `toggle enabled` button click', async () => {
    const mockCallBack = jest.fn();
    const { getByTestId } = render(
      <ToggleModeSingleIcon
        {...ToggleModeSingleIcon.args}
        onClick={(isToggled) => mockCallBack(isToggled)}
      />,
    );
    const button = getByTestId('button-comp');
    userEvent.click(button);

    await waitFor(() => {
      expect(mockCallBack).toHaveBeenCalledWith(true);
    });

    userEvent.click(button);
    await waitFor(() => {
      expect(mockCallBack).toHaveBeenCalledWith(false);
    });

    jest.clearAllMocks();
  });

  it('Should changed icon when `toggle enabled` button click', async () => {
    const { getByTestId } = render(<ToggleModeMultipleIcons {...ToggleModeMultipleIcons.args} />);
    const button = getByTestId('button-comp');
    userEvent.click(button);

    const icon = getByTestId('bookmark-added-icon');
    expect(icon).toBeInTheDocument();

    jest.clearAllMocks();
  });
});
