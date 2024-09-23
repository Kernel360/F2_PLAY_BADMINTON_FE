import { Meta, StoryObj } from '@storybook/react';
import Grid from './Grid';

const meta: Meta<typeof Grid> = {
  title: 'Components/ui/Grid',
  component: Grid,
  tags: ['autodocs'],
  argTypes: {
    spacing: {
      defaultValue: 'md',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      control: { type: 'inline-radio' },
    },
    justify: {
      defaultValue: 'start',
      options: ['start', 'center', 'end'],
      control: { type: 'inline-radio' },
    },
    align: {
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
    spacing: 'md',
    justify: 'start',
    align: 'start',
  },

  render: (args) => (
    <Grid {...args}>
      <div className="w-20 h-20 bg-red-500">hihi</div>
      <div className="w-20 h-20 bg-red-500">hihi</div>
      <div className="w-20 h-20 bg-red-500">hihi</div>
      <div className="w-20 h-20 bg-red-500">hihi</div>
      <div className="w-20 h-20 bg-red-500">hihi</div>
      <div className="w-20 h-20 bg-red-500">hihi</div>
    </Grid>
  ),
};
