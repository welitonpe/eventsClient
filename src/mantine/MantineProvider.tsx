import { useState } from "react";
import {
  MantineProvider,
  ColorSchemeProvider,
  ColorScheme,
} from "@mantine/core";
import { useColorScheme, useMediaQuery } from "@mantine/hooks";
import { Notifications } from "@mantine/notifications";

type AppMantineProviderProps = {
  children: JSX.Element;
};

const AppMantineProvider: React.FC<AppMantineProviderProps> = ({
  children,
}) => {
  const preferredColorScheme = useColorScheme("dark");
  const [colorScheme, setColorScheme] =
    useState<ColorScheme>(preferredColorScheme);
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));
  const matches = useMediaQuery("(min-width: 56.25em)");

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        theme={{ colorScheme }}
        withGlobalStyles
        withNormalizeCSS
      >
        <>
          <Notifications position={matches ? "bottom-left" : "top-left"} />
          {children}
        </>
      </MantineProvider>
    </ColorSchemeProvider>
  );
};

export default AppMantineProvider;
