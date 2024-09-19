import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './Input';

const meta: Meta<typeof Input> = {
  title: 'Components/ui/Input',
  component: Input,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    placeholder: {
      control: { type: 'text' },
    },
    size: {
      control: 'select',
      dscription: 'Input sizes',
      options: ['sm', 'md', 'lg'],
    },
    radius: {
      control: 'select',
      description: 'Input radius',
      options: ['sm', 'md', 'lg', 'round'],
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    size: 'md',
    radius: 'md',
  },
};
