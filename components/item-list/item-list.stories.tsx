import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import ItemList from '.';

export default {
  title: 'Design System/Containers/Item List',
  component: ItemList,
} as ComponentMeta<typeof ItemList>;

const Template: ComponentStory<typeof ItemList> = (args) => <ItemList {...args} />;
export const Default = Template.bind({});
export const LoadingList = Template.bind({});

Default.args = {
  isDirty: true,
};

LoadingList.args = {
  loading: true,
};
