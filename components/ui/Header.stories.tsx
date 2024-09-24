import { Meta, StoryObj } from '@storybook/react';
import Header from './Header';

const meta: Meta<typeof Header> = {
  title: 'Components/ui/Header',
  component: Header,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    isLogin: { control: 'boolean' },
    isJoined: { control: 'boolean' },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const LoggedOut: Story = {
  args: {
    isLogin: false,
    isJoined: false,
  },
};

export const LoggedInNotJoined: Story = {
  args: {
    isLogin: true,
    isJoined: false,
  },
};

export const LoggedInJoined: Story = {
  args: {
    isLogin: true,
    isJoined: true,
  },
};
