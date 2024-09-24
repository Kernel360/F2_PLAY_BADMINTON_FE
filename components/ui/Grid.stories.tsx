import { Meta, StoryObj } from '@storybook/react';
import Grid from './Grid';

const meta: Meta<typeof Grid> = {
  title: 'Components/ui/Grid',
  component: Grid,
  tags: ['autodocs'],
  argTypes: {
    columns: {
      defaultValue: 3,
      options: [3, 4, 5, 6],
      control: { type: 'inline-radio' },
    },
    spacing: {
      defaultValue: 'md',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      control: { type: 'inline-radio' },
    },
    placeContent: {
      defaultValue: 'start',
      options: ['start', 'center', 'end'],
      control: { type: 'inline-radio' },
    },
    placeItems: {
      defaultValue: 'start',
      options: ['start', 'center', 'end'],
      control: { type: 'inline-radio' },
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    columns: 3,
    spacing: 'md',
    placeContent: 'start',
    placeItems: 'start',
  },

  render: (args) => (
    <Grid {...args}>
      <div className="w-32 h-32 bg-red-500">hihi</div>
      <div className="w-32 h-32 bg-red-500">hihi</div>
      <div className="w-32 h-32 bg-red-500">hihi</div>
      <div className="w-32 h-32 bg-red-500">hihi</div>
      <div className="w-32 h-32 bg-red-500">hihi</div>
      <div className="w-32 h-32 bg-red-500">hihi</div>
      <div className="w-32 h-32 bg-red-500">hihi</div>
      <div className="w-32 h-32 bg-red-500">hihi</div>
      <div className="w-32 h-32 bg-red-500">hihi</div>
      <div className="w-32 h-32 bg-red-500">hihi</div>
    </Grid>
  ),
};
