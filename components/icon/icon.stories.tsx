import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { StoreContext } from '@app/context/use-store';

import ArrowLeft from './arrow-left';
import Bookmark from './bookmark';
import BookmarkAdded from './bookmark-added';
import Close from './close';
import Magnifier from './magnifier';

const IconCollection = () => (
  <div
    data-testid="icon-collection"
    style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gridTemplateRows: 100,
      gap: 20,
      alignItems: 'center',
      justifyItems: 'center',
    }}>
    <div>
      <ArrowLeft />
    </div>
    <div>
      <Bookmark />
    </div>
    <div>
      <BookmarkAdded />
    </div>
    <div>
      <Close />
    </div>
    <div>
      <Magnifier color="#ffffff" width={26} height={26} />
    </div>
  </div>
);

export default {
  title: 'Design System/Icons',
  component: IconCollection,
  parameters: {
    backgrounds: {
      default: 'dark',
    },
  },
} as ComponentMeta<typeof IconCollection>;

const Template: ComponentStory<typeof IconCollection> = () => <IconCollection />;
export const Default = Template.bind({});
