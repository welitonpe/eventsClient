import { Container, Title, Image, Box, Text } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import i18n from "../../i18n";
import imgBg from "../../assets/g12.png";

const Home = () => {
  const matches = useMediaQuery("(min-width: 56.25em)");

  return (
    <Container
      size="lg"
      px="xs"
      py="lg"
      style={{
        display: matches ? "flex" : "block",
        background:
          " linear-gradient(121deg, rgba(0,212,255,0) 74%, rgba(28,74,212,1) 100%)",
        borderRadius: "10px",
      }}
    >
      <Box>
        <Title
          size={matches ? 60 : 40}
          align={matches ? "left" : "center"}
          mb={40}
        >
          {i18n.translate("manage-your-busines")}
        </Title>
        <Text>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur
          recusandae voluptatibus nemo repellendus blanditiis iste eum error ad
          earum optio. Exercitationem dicta repellat illum minima quam obcaecati
          ullam magni sint!
        </Text>
      </Box>

      <Box mt={30} m={90}>
        <Image height={"100%"} src={imgBg} />
      </Box>
    </Container>
  );
};

export default Home;
