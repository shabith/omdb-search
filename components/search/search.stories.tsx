import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Search from '.';

export default {
  title: 'Design System/Search',
  component: Search,
  parameters: {
    actions: { argTypesRegex: '^on.*' },
    backgrounds: {
      default: 'dark',
    },
  },
} as ComponentMeta<typeof Search>;

const Template: ComponentStory<typeof Search> = (args) => <Search {...args} />;
export const Default = Template.bind({});

Default.args = {
  onChange: (str: string) => {
    console.log('changed', str);
  },
  delay: 300,
};
