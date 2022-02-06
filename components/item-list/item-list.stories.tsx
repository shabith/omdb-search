import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { StoreContext } from '@app/context/use-store';

import ItemList from '.';

import { storeDefaultValues } from 'mocks/store-mock';

export default {
  title: 'Design System/Containers/Item List',
  component: ItemList,
} as ComponentMeta<typeof ItemList>;

const Template: ComponentStory<typeof ItemList> = () => (
  <StoreContext.Provider value={storeDefaultValues}>
    <ItemList />
  </StoreContext.Provider>
);
export const Default = Template.bind({});

Default.args = {
  onItemClick: (imdbId: string) => console.log('on item clicked', imdbId),
  onClickWatchList: () => console.log('on watchlist clicked'),
};
