import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { RadioButton } from '.';

export default {
  title: 'Design System/Radio Button',
  component: RadioButton,
  parameters: {
    backgrounds: {
      default: 'dark',
    },
  },
} as ComponentMeta<typeof RadioButton>;

const Template: ComponentStory<typeof RadioButton> = (args) => <RadioButton {...args} />;
export const Default = Template.bind({});

Default.args = {
  onChange: (event) => {
    console.log('changed', event);
  },
  id: 'banana-radio',
  name: 'banana-radio',
  value: 'banana',
  label: 'Banana',
  checked: false,
};
