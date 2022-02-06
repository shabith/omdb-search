import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import TypeFilter from '.';

export default {
  title: 'Design System/Type Filter',
  component: TypeFilter,
  parameters: {
    backgrounds: {
      default: 'dark',
    },
  },
} as ComponentMeta<typeof TypeFilter>;

const Template: ComponentStory<typeof TypeFilter> = (args) => <TypeFilter {...args} />;
export const Default = Template.bind({});

Default.args = {
  onChange: (value: string) => console.log('changed', value),
};
