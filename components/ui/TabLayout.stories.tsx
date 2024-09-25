import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { UserStateProps } from '@/types/layoutTypes';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './Tabs';
import Header from './Header';

function TabLayout({ isLogin, isJoined }: UserStateProps) {
  return (
    <div className="w-full flex flex-col justify-center items-center">
      <Header isLogin={isLogin} isJoined={isJoined} />
      <Tabs defaultValue="tab1" className="w-full max-w-5xl mt-10 ">
        <TabsList>
          <TabsTrigger value="tab1" color="gray">
            소개
          </TabsTrigger>
          <TabsTrigger value="tab2" color="gray">
            일정
          </TabsTrigger>
          <TabsTrigger value="tab3" color="gray">
            회원
          </TabsTrigger>
          <TabsTrigger value="tab4" color="gray">
            관리
          </TabsTrigger>
        </TabsList>
        <div className="overflow-hidden rounded-[0.5rem] border bg-background shadow flex-1 space-y-4 p-8">
          <TabsContent value="tab1">Content 1</TabsContent>
          <TabsContent value="tab2">Content 2</TabsContent>
          <TabsContent value="tab3">Content 3</TabsContent>
          <TabsContent value="tab4">Content 4</TabsContent>
        </div>
      </Tabs>
    </div>
  );
}

const meta: Meta<typeof TabLayout> = {
  title: 'Components/ui/TabLayout',
  component: TabLayout,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    isLogin: {
      control: 'boolean',
      description: 'User login state',
    },
    isJoined: {
      control: 'boolean',
      description: 'User joined state',
    },
  },
};

export default meta;

type Story = StoryObj<typeof TabLayout>;

export const Default: Story = {
  args: {
    isLogin: false,
    isJoined: false,
  },
  render: (args) => (
    <TabLayout isLogin={args.isLogin} isJoined={args.isJoined} />
  ),
};

export const LoggedIn: Story = {
  args: {
    isLogin: true,
    isJoined: true,
  },
  render: (args) => (
    <TabLayout isLogin={args.isLogin} isJoined={args.isJoined} />
  ),
};

export const LoggedOut: Story = {
  args: {
    isLogin: false,
    isJoined: false,
  },
  render: (args) => (
    <TabLayout isLogin={args.isLogin} isJoined={args.isJoined} />
  ),
};

export const LoggedInNotJoined: Story = {
  args: {
    isLogin: true,
    isJoined: false,
  },
  render: (args) => (
    <TabLayout isLogin={args.isLogin} isJoined={args.isJoined} />
  ),
};
