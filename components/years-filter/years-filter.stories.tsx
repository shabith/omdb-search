import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import YearsFilter from '.';

export default {
  title: 'Design System/Years Filter',
  component: YearsFilter,
  parameters: { actions: { argTypesRegex: '^on.*' } },
} as ComponentMeta<typeof YearsFilter>;

const Template: ComponentStory<typeof YearsFilter> = (args) => <YearsFilter {...args} />;
export const DefaultYearsFilter = Template.bind({});

DefaultYearsFilter.args = {
  onChange: (values: number[]) => {
    console.log('changed', values);
  },
};
