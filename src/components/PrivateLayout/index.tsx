import { Outlet, useNavigate } from "react-router-dom";
import {
	AppShell,
	Navbar,
	Header,
	useMantineTheme,
	Footer,
	Aside,
	Text,
	MediaQuery,
	Burger,
	NavLink,
} from "@mantine/core";
import { useState } from "react";
import i18n from "../../i18n";
import UserIcon from "../UserIcon";

const PrivateLayout = () => {
	const [opened, setOpened] = useState(false);
	const theme = useMantineTheme();

	const navigate = useNavigate();

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
				<Navbar
					hiddenBreakpoint="sm"
					hidden={!opened}
					width={{ sm: 200, lg: 300 }}
				>
					<Navbar.Section>{/* Header with logo */}</Navbar.Section>
					<Navbar.Section grow mt="md">
						{/* Links sections */}
					</Navbar.Section>
					<Navbar.Section>
						<NavLink
							label={import.meta.env.VITE_USER_NAME}
							icon={<UserIcon name={import.meta.env.VITE_USER_NAME} URL="" />}
						></NavLink>
					</Navbar.Section>
				</Navbar>
			}
			aside={
				<MediaQuery smallerThan="sm" styles={{ display: "none" }}>
					<Aside p="md" hiddenBreakpoint="sm" width={{ sm: 200, lg: 300 }}>
						<Text>Application sidebar</Text>
					</Aside>
				</MediaQuery>
			}
			footer={
				<Footer height={60} p="md">
					Application footer
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
						<div style={{ display: "flex" }}>
							<MediaQuery largerThan="sm" styles={{ display: "none" }}>
								<Burger
									opened={opened}
									onClick={() => setOpened((o) => !o)}
									size="sm"
									color={theme.colors.gray[6]}
									mr="xl"
								/>
							</MediaQuery>
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
					</div>
				</Header>
			}
		>
			<Outlet />
		</AppShell>
	);
};

export default PrivateLayout;
