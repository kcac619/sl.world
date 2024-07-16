// components/Sidebar.js
import {
  Box,
  Text,
  List,
  ListItem,
  useBreakpointValue,
} from "@chakra-ui/react";

const navItems = [
  { label: "Home", icon: "🏠" },
  { label: "Search", icon: "🔍" },
  { label: "Cart", icon: "🛒" },
  { label: "Wishlist", icon: "❤️" },
  { label: "Orders", icon: "📝" },
  { label: "Account", icon: "👤" },
  { label: "Help", icon: "❓" },
];

const Sidebar = ({ isOpen, onClose, onOpen, ...rest }) => {
  const isCollapsed = useBreakpointValue({ base: !isOpen, md: !isOpen });
  return (
    <Box
      bg="white"
      pos="fixed"
      h="100vh"
      //   shadow="md"
      zIndex={10}
      transition="width 0.3s" // Add a smooth transition
      {...rest} // Apply width from index.js
      onClick={isCollapsed ? onOpen : undefined} // Open sidebar on click when collapsed
      width={isCollapsed ? "60px" : "200px"} // Adjust width
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
          >
            <Text
              ml={isCollapsed ? 0 : 2} // Adjust margin
              fontSize={isCollapsed ? "2xl" : "md"} // Adjust font size
            >
              {item.icon} {/* Icon always visible */}
              {!isCollapsed && item.label} {/* Label hidden when collapsed */}
            </Text>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Sidebar;
