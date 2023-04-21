import React, { FC } from "react";
import {
  Pane,
  Heading,
  Popover,
  Text,
  Avatar,
  majorScale,
  Position,
  Menu,
  LogOutIcon,
} from "evergreen-ui";

const Navbar: FC<{
  navbarHeading: string;
  email: string;
  name: string;
  logoutFunction: () => void;
}> = ({ navbarHeading, name, email, logoutFunction }) => {
  return (
    <Pane padding={16} background="#F5F5F5">
      <div className="container">
        <Pane display="flex">
          <Pane flex={1} alignItems="center" display="flex">
            <Heading size={600} color="#0E3D85">
              {navbarHeading}
            </Heading>
          </Pane>
          <Pane>
            <Popover
              position={Position.BOTTOM_LEFT}
              content={
                <Pane>
                  <Pane background="tint1" padding={majorScale(2)}>
                    <Pane>
                      <Text>{name}</Text>
                    </Pane>
                    <Pane>
                      <Text color="muted">{email}</Text>
                    </Pane>
                  </Pane>
                  <Pane background="white">
                    <Menu>
                      <Menu.Item
                        icon={LogOutIcon}
                        intent="danger"
                        onSelect={logoutFunction}
                      >
                        Sign out
                      </Menu.Item>
                    </Menu>
                  </Pane>
                </Pane>
              }
            >
              <Pane
                elevation={2}
                background="white"
                borderRadius="100%"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Avatar name={name} size={48} cursor="pointer" />
              </Pane>
            </Popover>
          </Pane>
        </Pane>
      </div>
    </Pane>
  );
};

export default Navbar;
