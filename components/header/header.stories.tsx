import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Header from '.';

export default {
  title: 'Design System/Containers/Header',
  component: Header,
} as ComponentMeta<typeof Header>;

const Template: ComponentStory<typeof Header> = () => <Header />;
export const Default = Template.bind({});
