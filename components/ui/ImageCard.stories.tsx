import { Meta, StoryObj } from '@storybook/react';
import { Card, CardDescription } from './ImageCard';

const meta: Meta<typeof Card> = {
  title: 'Components/ui/ImageCard',
  component: Card,
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

type Story = StoryObj<typeof Card>;

export const Default: Story = {
  args: {
    size: 'md',
  },
  render: (args) => (
    <Card size={args.size} src="https://picsum.photos/200/300">
      <CardDescription>
        Card Footer Card Footer Card FooterCard Footer Card Footer
      </CardDescription>
    </Card>
  ),
};
