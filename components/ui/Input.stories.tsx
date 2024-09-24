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
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="gray"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-badge-alert"
    >
      <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
      <line x1="12" x2="12" y1="8" y2="12" />
      <line x1="12" x2="12.01" y1="16" y2="16" />
    </svg>
  );
}

export const Default: Story = {
  args: {
    size: 'md',
    radius: 'md',
  },
};

export const Icon: Story = {
  args: {
    size: 'md',
    radius: 'md',
    icon: <UserIcon />,
  },
};

export const Search: Story = {
  args: {
    size: 'md',
    radius: 'md',
    search: true,
  },
};
