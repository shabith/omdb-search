import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import DetailView from '.';

export default {
  title: 'Design System/Detail View',
  component: DetailView,
} as ComponentMeta<typeof DetailView>;

const Template: ComponentStory<typeof DetailView> = (args) => <DetailView {...args} />;
export const Default = Template.bind({});
export const LoadingDetails = Template.bind({});

LoadingDetails.args = {
  loading: true,
};
