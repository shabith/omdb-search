import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import YearsFilter from '.';

export default {
  title: 'Design System/Years Filter',
  component: YearsFilter,
  parameters: {
    backgrounds: {
      default: 'dark',
    },
  },
} as ComponentMeta<typeof YearsFilter>;

const Template: ComponentStory<typeof YearsFilter> = (args) => <YearsFilter {...args} />;
export const Default = Template.bind({});

Default.args = {
  onChange: (values: number[]) => {
    console.log('changed', values);
  },
};
