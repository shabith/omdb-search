import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { StoreContext } from '@app/context/use-store';

import Header from '.';

import { storeDefaultValues } from 'mocks/store-mock';

export default {
  title: 'Design System/Containers/Header',
  component: Header,
} as ComponentMeta<typeof Header>;

const Template: ComponentStory<typeof Header> = () => (
  <StoreContext.Provider value={storeDefaultValues}>
    <Header />
  </StoreContext.Provider>
);
export const Default = Template.bind({});
