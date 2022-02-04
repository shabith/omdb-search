import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import ItemList from '.';

export default {
  title: 'Design System/Containers/Item List',
  component: ItemList,
} as ComponentMeta<typeof ItemList>;

const Template: ComponentStory<typeof ItemList> = () => <ItemList />;
export const Default = Template.bind({});
