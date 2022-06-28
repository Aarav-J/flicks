import { Box, Text, Link, Stack, Flex } from "@chakra-ui/react";

const Nav = () => {
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      w="100%"
      mb={8}
      p={8}
      bg="#F8F8F8"
      color="#7692FF"
    >
      <Box w="100px">
        <Link href="/" style={{ textDecoration: "none" }}>
          <Text fontSize="lg" fontWeight="bold">
            Flicks
          </Text>
        </Link>
      </Box>
      <Box display="block" flexBasis={{ base: "100%", md: "auto" }}>
        <Stack
          spacing={8}
          align="center"
          justify="flex-end"
          direction="row"
          pt={0}
        >
          <Link href="/search">
            <Text display="block">Search</Text>
          </Link>
          <Link href="/watched">
            <Text display="block">Watched</Text>
          </Link>
        </Stack>
      </Box>
    </Flex>
  );
};
export default Nav;
