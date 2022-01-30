import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Search from '.';

export default {
  title: 'Design System/Search',
  component: Search,
} as ComponentMeta<typeof Search>;

const Template: ComponentStory<typeof Search> = (args) => <Search {...args} />;
export const DefaultSearch = Template.bind({});

DefaultSearch.args = {
  onChange: (value) => {},
  delay: 300,
};
