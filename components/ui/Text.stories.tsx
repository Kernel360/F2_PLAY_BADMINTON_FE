import { Meta, StoryObj } from '@storybook/react';
import Text from './Text';

const meta: Meta<typeof Text> = {
  title: 'Components/ui/Text',
  component: Text,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    children: {
      defaultValue: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      control: { type: 'text' },
    },
    size: {
      defaultValue: 'md',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      control: { type: 'select' },
    },
    weight: {
      defaultValue: 'regular',
      options: ['light', 'regular', 'bold'],
      control: { type: 'inline-radio' },
    },
    underline: {
      defaultValue: false,
      control: { type: 'boolean' },
    },
    block: {
      defaultValue: false,
      control: { type: 'boolean' },
    },
    transform: {
      options: [undefined, 'capitalize', 'uppercase', 'lowercase'],
      control: { type: 'inline-radio' },
    },
    align: {
      options: [undefined, 'left', 'center', 'right'],
      control: { type: 'inline-radio' },
    },
    lineClamp: {
      defaultValue: undefined,
      control: { type: 'number' },
    },
    color: {
      options: [undefined, 'primary', 'black', 'gray', 'white'],
      control: { type: 'inline-radio' },
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    size: 'md',
    weight: 'regular',
    underline: false,
    block: false,
    transform: undefined,
    align: undefined,
    lineClamp: undefined,
    color: undefined,
  },
};

export const Center: Story = {
  args: {
    children: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    size: 'md',
    weight: 'regular',
    underline: false,
    block: false,
    transform: undefined,
    align: 'center',
    lineClamp: undefined,
    color: undefined,
  },
};
