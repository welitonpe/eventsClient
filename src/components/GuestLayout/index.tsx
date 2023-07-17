import { Outlet, useNavigate, useOutletContext } from "react-router-dom";
import {
  AppShell,
  Navbar,
  Header,
  useMantineTheme,
  Footer,
  Text,
  MediaQuery,
  Burger,
  Group,
  NavLink,
  useMantineColorScheme,
  ActionIcon,
} from "@mantine/core";
import { useState } from "react";
import { useMediaQuery } from "@mantine/hooks";
import i18n from "../../i18n";
import {
  IconBrandGooglePhotos,
  IconMoonStars,
  IconSun,
  IconX,
} from "@tabler/icons-react";
import SignUpModal from "../Modal/SingUpModal";
import LogInModal from "../Modal/LogInModal";
import { notifications } from "@mantine/notifications";
import { GuestOutlet } from "../../types/Types";

const GuestLayout = () => {
  const [opened, setOpened] = useState(false);
  const matches = useMediaQuery("(min-width: 56.25em)");
  const theme = useMantineTheme();
  const navigate = useNavigate();

  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";

  const { loged } = useOutletContext<GuestOutlet>();

  return (
    <AppShell
      styles={{
        main: {
          background:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      }}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      navbar={
        !matches ? (
          <Navbar
            p="md"
            hiddenBreakpoint="sm"
            hidden={!opened}
            width={{ sm: 200, lg: 300 }}
          >
            <NavLink
              label="With icon"
              icon={
                dark ? (
                  <IconSun size="1.1rem" />
                ) : (
                  <IconMoonStars size="1.1rem" />
                )
              }
              onClick={() => toggleColorScheme()}
            />

            <NavLink
              label="With icon"
              icon={
                dark ? (
                  <IconSun size="1.1rem" />
                ) : (
                  <IconMoonStars size="1.1rem" />
                )
              }
              onClick={() =>
                notifications.show({
                  title: i18n.translate("user-created-with-success"),
                  message: `The user  was created with success`,
                  icon: <IconX size="1.1rem" />,
                  color: "red",
                })
              }
            />

            <Text>Application navbar</Text>
          </Navbar>
        ) : (
          <></>
        )
      }
      footer={
        <Footer height={60} p="md">
          {/* Application footer */}
        </Footer>
      }
      header={
        <Header height={{ base: 50, md: 70 }} p="md">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              height: "100%",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <MediaQuery largerThan="sm" styles={{ display: "none" }}>
                <Burger
                  opened={opened}
                  onClick={() => setOpened((o) => !o)}
                  size="sm"
                  color={theme.colors.gray[6]}
                  mr="xl"
                />
              </MediaQuery>

              <IconBrandGooglePhotos
                size="2.1rem"
                style={{ marginRight: "16px" }}
              />
              <Text
                variant="gradient"
                gradient={{ from: "indigo", to: "cyan", deg: 45 }}
                sx={{ fontFamily: "Greycliff CF, sans-serif" }}
                ta="left"
                fz="xl"
                fw={700}
                onClick={() => navigate("/")}
              >
                {i18n.translate(import.meta.env.VITE_SOME_KEY).toUpperCase()}
              </Text>
            </div>
            <div style={{ display: "flex" }}>
              <div style={{ marginRight: "16px" }}>
                {!loged && (
                  <Group spacing="sm">
                    <LogInModal
                      triggerOptions={{
                        compatct: true,
                        radius: "xl",
                        name: i18n.translate("log-in"),
                      }}
                    />

                    <SignUpModal
                      triggerOptions={{
                        compatct: true,
                        radius: "xl",
                        name: i18n.translate("sign-up"),
                      }}
                    />
                  </Group>
                )}
              </div>
              <ActionIcon
                variant="outline"
                color={dark ? "yellow" : "blue"}
                onClick={() => toggleColorScheme()}
                title="Toggle color scheme"
              >
                {dark ? (
                  <IconSun size="1.1rem" />
                ) : (
                  <IconMoonStars size="1.1rem" />
                )}
              </ActionIcon>
            </div>
          </div>
        </Header>
      }
    >
      <Outlet />
    </AppShell>
  );
};

export default GuestLayout;
