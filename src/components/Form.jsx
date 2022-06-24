import { Flex, Input, IconButton } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
const Form = ({ handleSubmit, change, value }) => {
  return (
    <Flex mr="5" ml="5" mt="5">
      <Input
        variant="outline"
        placeholder="Search for movie"
        value={value}
        onChange={(event) => {
          change(event.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSubmit();
          }
        }}
      />
      <IconButton
        aria-label="Search database"
        icon={<SearchIcon />}
        onClick={() => {
          handleSubmit();
        }}
      />
    </Flex>
  );
};
export default Form;
