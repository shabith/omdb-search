import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { DotPulse } from '.';

export default {
  title: 'Design System/Loaders',
  component: DotPulse,
} as ComponentMeta<typeof DotPulse>;

const Template: ComponentStory<typeof DotPulse> = () => <DotPulse />;
export const DotPulseLoader = Template.bind({});
