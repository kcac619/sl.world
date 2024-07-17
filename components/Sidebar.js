// components/Sidebar.js
import {
  Box,
  Text,
  List,
  ListItem,
  useBreakpointValue,
  Flex,
} from "@chakra-ui/react";
import {
  AiOutlineHome,
  AiOutlineSearch,
  AiOutlineShoppingCart,
  AiOutlineHeart,
  AiOutlineFileText,
  AiOutlineUser,
  AiOutlineQuestionCircle,
} from "react-icons/ai"; // Import from react-icons/ai

const navItems = [
  { label: "Home", icon: <AiOutlineHome size={32} /> },
  { label: "Search", icon: <AiOutlineSearch size={32} /> },
  { label: "Cart", icon: <AiOutlineShoppingCart size={32} /> },
  { label: "Wishlist", icon: <AiOutlineHeart size={32} /> },
  { label: "Orders", icon: <AiOutlineFileText size={32} /> },
  { label: "Account", icon: <AiOutlineUser size={32} /> },
  { label: "Help", icon: <AiOutlineQuestionCircle size={32} /> },
];

const Sidebar = ({ isOpen, onClose, onOpen, ...rest }) => {
  const isCollapsed = useBreakpointValue({ base: !isOpen, md: !isOpen });
  return (
    <Box
      bg="white"
      pos="fixed"
      h="100%"
      //   shadow="md"
      zIndex={10}
      transition="width 0.3s" // Add a smooth transition
      {...rest} // Apply width from index.js
      onClick={isCollapsed ? onOpen : undefined} // Open sidebar on click when collapsed
      width={isCollapsed ? "45px" : "200px"} // Adjust width
    >
      <List spacing={3} p={isCollapsed ? 1 : 4}>
        {" "}
        {/* Adjust padding */}
        {navItems.map((item) => (
          <ListItem
            key={item.label}
            onClick={onClose}
            _hover={{ bg: "gray.100", cursor: "pointer" }}
            display="flex"
            alignItems="center"
            mb={30}
          >
            <Flex alignItems="center" ml={isCollapsed ? 0 : 2}>
              {item.icon} {/* Icon always visible */}
              {!isCollapsed && <Text ml={2}>{item.label}</Text>}{" "}
              {/* Label hidden when collapsed */}
            </Flex>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Sidebar;
