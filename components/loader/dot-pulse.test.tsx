import { composeStories } from '@storybook/testing-react';
import { render } from '@testing-library/react';

import * as stories from './index.stories';

const { DotPulseLoader } = composeStories(stories);

describe('Dot Pulse Loader Component', () => {
  it('Should render component successfully', () => {
    const { getByTestId } = render(<DotPulseLoader {...DotPulseLoader.args} />);

    const dotPulseLoader = getByTestId('dot-pulse-loader-comp');
    expect(dotPulseLoader).toBeInTheDocument();
  });
});
