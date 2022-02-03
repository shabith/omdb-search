import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import ListItem from '.';

export default {
  title: 'Design System/List Item',
  component: ListItem,
} as ComponentMeta<typeof ListItem>;

const Template: ComponentStory<typeof ListItem> = (args) => <ListItem {...args} />;
export const Default = Template.bind({});
export const ActiveListItem = Template.bind({});

Default.args = {
  active: false,
  data: {
    id: '1',
    title: 'Star Wars: Episode IV - A New Hope',
    year: '1977',
    type: 'movie',
    imdbId: 'tt0076759',
    posterImage:
      'https://m.media-amazon.com/images/M/MV5BNzVlY2MwMjktM2E4OS00Y2Y3LWE3ZjctYzhkZGM3YzA1ZWM2XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg',
  },
};

ActiveListItem.args = {
  ...Default.args,
  active: true,
};
