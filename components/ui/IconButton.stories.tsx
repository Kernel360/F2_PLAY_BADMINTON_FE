import type { Meta, StoryObj } from '@storybook/react';
import IconButton from './IconButton';
import { Users } from 'lucide-react';

const meta: Meta<typeof IconButton> = {
  title: 'Components/ui/IconButton',
  component: IconButton,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },

  argTypes: {
    size: {
      control: 'inline-radio',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    radius: {
      control: 'inline-radio',
      options: ['sm', 'md', 'lg', 'round'],
    },
    color: {
      control: 'inline-radio',
      options: ['gray', 'purple', 'blue', 'red', 'transparent'],
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    size: 'md',
    radius: 'md',
    color: 'gray',
  },

  render: (args) => {
    return (
      <IconButton {...args}>
        <Users width={'80%'} height={'80%'} />
      </IconButton>
    );
  },
};
