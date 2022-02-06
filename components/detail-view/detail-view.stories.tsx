import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { StoreContext } from '@app/context/use-store';

import { storeDefaultValues } from '../../mocks/store-mock';

import DetailView from '.';

export default {
  title: 'Design System/Detail View',
  component: DetailView,
} as ComponentMeta<typeof DetailView>;

const Template: ComponentStory<typeof DetailView> = (args) => {
  return (
    <StoreContext.Provider value={storeDefaultValues}>
      <DetailView {...args} />
    </StoreContext.Provider>
  );
};
export const Default = Template.bind({});

Default.parameters = {
  mockData: [
    {
      url: '/api',
    },
  ],
};

Default.args = {
  onClose: () => {
    console.log('closed clicked');
  },
};
