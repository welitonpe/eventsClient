import {
  Modal,
  Group,
  Button,
  useMantineTheme,
  ScrollArea,
} from "@mantine/core";
import i18n from "../../i18n";
import { BaseModalProps } from "../../types/Types";

const BaseModal: React.FC<BaseModalProps> = ({
  children,
  close,
  open,
  opened,
  titleModal = "",
  triggerName = i18n.translate("click"),
  triggerCompatct = false,
  triggerRadius = "xs",
  variant = undefined,
}) => {
  const theme = useMantineTheme();
  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title={titleModal}
        overlayProps={{
          color:
            theme.colorScheme === "dark"
              ? theme.colors.dark[9]
              : theme.colors.gray[2],
          opacity: 0.55,
          blur: 3,
        }}
        withCloseButton={false}
        scrollAreaComponent={ScrollArea.Autosize}
        transitionProps={{ transition: "fade" }}
        h={"100%"}
      >
        {children}
      </Modal>

      <Group position="center">
        <Button
          onClick={open}
          compact={triggerCompatct}
          radius={triggerRadius}
          variant={variant}
        >
          {triggerName}
        </Button>
      </Group>
    </>
  );
};

export default BaseModal;
