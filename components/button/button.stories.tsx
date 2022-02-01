import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import BookmarkIcon from '@app/components/icon/bookmark';
import BookmarkAddedIcon from '@app/components/icon/bookmark-added';

import Button from '.';

export default {
  title: 'Design System/Button',
  component: Button,
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;
export const WithoutIcon = Template.bind({});
export const WithoutIconLoading = Template.bind({});
export const WithoutIconDisabled = Template.bind({});
export const WithoutIconToggleMode = Template.bind({});
export const WithIcon = Template.bind({});
export const ToggleModeSingleIcon = Template.bind({});
export const ToggleModeMultipleIcons = Template.bind({});

WithoutIcon.args = {
  toggleMode: false,
  label: 'Button',
};

WithoutIconDisabled.args = {
  toggleMode: false,
  label: 'Button',
  disabled: true,
};

WithoutIconLoading.args = {
  toggleMode: false,
  label: 'Button',
  loading: true,
};

WithoutIconToggleMode.args = {
  toggleMode: true,
  label: 'Toggle Button',
};

WithIcon.args = {
  toggleMode: false,
  label: 'Button',
  icons: [<BookmarkIcon />],
};

ToggleModeSingleIcon.args = {
  toggleMode: true,
  label: 'Toggle Button',
  icons: [<BookmarkIcon />],
  isActive: false,
};

ToggleModeMultipleIcons.args = {
  toggleMode: true,
  label: 'Toggle Button',
  icons: [<BookmarkIcon />, <BookmarkAddedIcon />],
  isActive: false,
};
