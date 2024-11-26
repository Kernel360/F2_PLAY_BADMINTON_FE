import {
  // type TabTriggerProps,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Tabs> = {
  title: "Components/ui/Tabs",
  component: Tabs,
  tags: ["autodocs"],
  argTypes: {
    color: {
      control: "inline-radio",
      options: ["gray", "purple", "blue", "red"],
    },
  },
};

export default meta;

type Story = StoryObj<typeof Tabs>;

export const Default: Story = {
  args: {
    color: "gray",
  },
  render: (args) => (
    <Tabs defaultValue="tab1">
      <TabsList>
        <TabsTrigger
          value="tab1"
          // color={args.color as TabTriggerProps["color"]}
        >
          Tab 1
        </TabsTrigger>
        <TabsTrigger
          value="tab2"
          // color={args.color as TabTriggerProps["color"]}
        >
          Tab 2
        </TabsTrigger>
        <TabsTrigger
          value="tab3"
          // color={args.color as TabTriggerProps["color"]}
        >
          Tab 3
        </TabsTrigger>
        <TabsTrigger
          value="tab4"
          // color={args.color as TabTriggerProps["color"]}
        >
          Tab 4
        </TabsTrigger>
      </TabsList>
      <TabsContent value="tab1">Content 1</TabsContent>
      <TabsContent value="tab2">Content 2</TabsContent>
      <TabsContent value="tab3">Content 3</TabsContent>
      <TabsContent value="tab4">Content 4</TabsContent>
    </Tabs>
  ),
};
