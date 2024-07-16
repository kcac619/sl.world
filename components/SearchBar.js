// components/SearchBar.js
import { InputGroup, InputLeftElement, Input } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

const SearchBar = () => {
  return (
    <InputGroup ml={4} flex="1" maxW="400px">
      <InputLeftElement pointerEvents="none">
        <SearchIcon color="gray.300" />
      </InputLeftElement>
      <Input
        type="text"
        color={"white"}
        _placeholder={{ color: "white" }} // This line changes the placeholder color to white
        placeholder="Stone ID / Certificate no"
      />
    </InputGroup>
  );
};

export default SearchBar;
