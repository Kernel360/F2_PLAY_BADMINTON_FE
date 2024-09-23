import { Meta, StoryObj } from '@storybook/react';
import { ImageCard, ImageCardDescription } from './ImageCard';

const meta: Meta<typeof ImageCard> = {
  title: 'Components/ui/ImageCard',
  component: ImageCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    size: {
      defaultValue: 'md',
      options: ['sm', 'md', 'lg'],
      control: { type: 'inline-radio' },
    },
  },
};

export default meta;

type Story = StoryObj<typeof ImageCard>;

export const Default: Story = {
  args: {
    size: 'md',
  },
  render: (args) => (
    <ImageCard size={args.size} src="https://picsum.photos/200/300">
      <ImageCardDescription>
        Card Footer Card Footer Card FooterCard Footer Card Footer
      </ImageCardDescription>
    </ImageCard>
  ),
};
