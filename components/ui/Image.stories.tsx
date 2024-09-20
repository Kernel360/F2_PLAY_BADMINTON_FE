import { Meta, StoryObj } from '@storybook/react';
import Image from './Image';

const meta: Meta<typeof Image> = {
  title: 'Components/ui/Image',
  component: Image,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    src: {
      defaultValue: 'https://dummyimage.com/400x250/000/ffffff',
      control: { type: 'text' },
    },
    radius: {
      defaultValue: 'sm',
      options: ['sm', 'md', 'lg', 'round', 'circular'],
      control: { type: 'inline-radio' },
    },
    width: {
      defaultValue: 400,
      control: { type: 'number' },
    },
    height: {
      defaultValue: 250,
      control: { type: 'number' },
    },
    alt: {
      defaultValue: '',
      control: { type: 'text' },
    },
    fit: {
      defaultValue: 'cover',
      options: ['cover', 'fill', 'contain'],
      control: { type: 'inline-radio' },
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    src: 'https://dummyimage.com/400x250/000/ffffff',
    radius: 'md',
    width: 400,
    height: 250,
    alt: '',
    fit: 'cover',
  },
};

export const Avatar: Story = {
  args: {
    src: 'https://dummyimage.com/50x50/000/ffffff',
    radius: 'circular',
    width: 50,
    height: 50,
    alt: '',
    fit: 'cover',
  },
};
