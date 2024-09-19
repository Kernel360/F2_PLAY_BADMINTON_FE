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

function UserIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      className="lucide lucide-search"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

export const Default: Story = {
  args: {
    size: 'md',
    radius: 'md',
  },
};

export const Search: Story = {
  args: {
    size: 'md',
    radius: 'md',
    icon: <UserIcon />,
  },
};
