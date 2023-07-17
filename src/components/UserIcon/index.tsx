import { Avatar, Tooltip } from "@mantine/core";
import { UserIconProps } from "../../types/Types";

const UserIcon: React.FC<UserIconProps> = ({ name, URL }) => {
  return (
    <>
      <Tooltip label={name} withArrow>
        <Avatar radius="xl" src={URL || import.meta.env.VITE_USER_IMAGE} />
      </Tooltip>
    </>
  );
};

export default UserIcon;
