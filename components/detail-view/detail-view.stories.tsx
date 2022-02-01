import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import DetailView from '.';

export default {
  title: 'Design System/Detail View',
  component: DetailView,
} as ComponentMeta<typeof DetailView>;

const Template: ComponentStory<typeof DetailView> = () => <DetailView />;
export const Default = Template.bind({});
