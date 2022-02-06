import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { localStoreId } from '@app/context/use-watchlist';

import WatchList from '.';

import { sampleWatchList } from 'mocks/watch-list-data';

export default {
  title: 'Design System/Containers/Watch List',
  component: WatchList,
} as ComponentMeta<typeof WatchList>;

const Template: ComponentStory<typeof WatchList> = (args) => {
  if (window) {
    window.localStorage.setItem(localStoreId, JSON.stringify(sampleWatchList));
  }
  return <WatchList {...args} />;
};
export const Default = Template.bind({});

Default.args = {
  onGoBack: () => console.log('go back cicked'),
  onItemClick: (item) => console.log('on item clicked', item),
};
