import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import WatchList from '.';

export default {
  title: 'Design System/Containers/Watch List',
  component: WatchList,
} as ComponentMeta<typeof WatchList>;

const Template: ComponentStory<typeof WatchList> = (args) => <WatchList {...args} />;
export const Default = Template.bind({});

Default.args = {
  onGoBack: () => console.log('go back'),
};
