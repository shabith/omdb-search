import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import WatchListItem from '.';

export default {
  title: 'Design System/Watch List Item',
  component: WatchListItem,
} as ComponentMeta<typeof WatchListItem>;

const Template: ComponentStory<typeof WatchListItem> = (args) => <WatchListItem {...args} />;
export const Default = Template.bind({});

Default.args = {
  onClick: (imdbId: string) => console.log('clicked', imdbId),
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
