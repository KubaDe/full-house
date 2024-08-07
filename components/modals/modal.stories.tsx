import type { Meta, StoryObj } from "@storybook/react";
import { show as showModal } from "@ebay/nice-modal-react";
import { useMount } from "react-use";
import { Button } from "@/components/uiKit/button";
import { EditProfileModal } from "@/components/modals/editProfileModal";
import { ModalsProvider } from "@/components/providers/niceModalProvider";

type TestComponentProps = { action: () => void };
const TestComponent = ({ action }: TestComponentProps) => {
  useMount(action);

  return <Button onClick={action}>Open modal</Button>;
};

const meta = {
  title: "Modals",
  decorators: [
    (Story, props) => {
      return (
        <ModalsProvider>
          <Story {...props} args={{ ...props.args }} />
        </ModalsProvider>
      );
    },
  ],
  component: TestComponent,
  argTypes: {},
  parameters: {
    layout: "centered",
  },
  args: {},
} satisfies Meta<typeof TestComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const EditProfile: Story = {
  args: {
    action: () => void showModal(EditProfileModal, {}),
  },
} satisfies Story;
