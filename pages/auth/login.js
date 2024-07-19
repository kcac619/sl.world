// pages/auth/login.js
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getSession, signIn, useSession } from "next-auth/react";
import {
  Box,
  Flex,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  Tab,
  Tabs,
  TabList,
  TabPanel,
  TabPanels,
  Alert,
  AlertIcon,
  AlertTitle,
  CloseButton,
  Checkbox,
} from "@chakra-ui/react";
import bcrypt from "bcryptjs";
import axios from "axios";

const LoginSignup = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [remember, setRemember] = useState(false);
  //   const { data: session, status } = useSession();
  const router = useRouter();

  const handleEmailChange = (event) => setEmail(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);
  const handleRememberChange = (event) => setRemember(event.target.checked);

  //   useEffect(() => {
  //     console.log(remember);
  //   }, [remember]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError(null);

    try {
      if (tabIndex === 0) {
        // Login
        const result = await signIn("credentials", {
          redirect: false,
          email,
          password,
          remember,
        });
        console.log("Login result:", result);

        if (result.error) {
          setError(result.error);
        } else {
          // Redirect to the appropriate dashboard based on role
          // ...
          if (result.ok) {
            // Check if login was successful
            const session = await getSession();
            if (session?.user?.role === "admin") {
              // Optional chaining for safety
              router.push("/admin/dashboard");
            } else {
              router.push(router.query.callbackUrl || "/user/dashboard");
            }
          }
        }
      } else {
        // Signup
        const hashedPassword = await bcrypt.hash(password, 10);
        const res = await axios.post("/api/users", {
          email,
          password: hashedPassword,
          role: "user", // Set default role
        });

        if (res.data.status === 1) {
          // Redirect to login page
          setTabIndex(0);
          setEmail("");
          setPassword("");
        } else {
          setError(res.data.message);
        }
      }
    } catch (error) {
      console.error(error);
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <Flex
      minHeight="100vh"
      width="full"
      align="center"
      justifyContent="center"
      backgroundColor="gray.200" // Set background color for base breakpoint
    >
      <Box
        display={{ base: "block", md: "flex" }} // Show as flex on medium and larger screens
        maxWidth={{ base: "100%", md: "80%", lg: "100%" }} // Full width on base, 80% on medium, 100% on large
        width="100%"
      >
        {/* Video Background (lg only) */}
        <Box
          position="relative"
          w={{ base: "0%", md: "0%", lg: "66%" }} // Adjust width based on breakpoint
          h="100vh"
          display={{ base: "none", lg: "block" }} // Only display on large screens
          overflow="hidden"
        >
          <video
            src="/vid/login-video.mp4" // Replace with your stock video URL
            autoPlay
            loop
            muted
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
          <Box
            position="absolute"
            top={0}
            left={0}
            w="100%"
            h="100%"
            bg="blackAlpha.50" // Add a semi-transparent overlay for better readability
          />
        </Box>

        {/* Login UI */}
        <Flex
          direction="column"
          alignItems="center"
          justifyContent="center"
          w={{ base: "100%", md: "auto", lg: "34%" }} // Adjust width based on breakpoint
          p={8}
          backgroundColor="white"
          borderRadius={{ base: 0, md: "8px", lg: "8px" }} // Add borderRadius on medium and larger screens
          boxShadow={{ base: "none", md: "lg", lg: "lg" }} // Add boxShadow on medium and larger screens
        >
          <Heading mb={6} textAlign="center">
            {tabIndex === 0 ? "Login" : "Signup"}
          </Heading>

          {/* Error Alert */}
          {error && (
            <Alert status="error" mb={4}>
              <AlertIcon />
              <AlertTitle mr={2}>{error}</AlertTitle>
              <CloseButton
                position="absolute"
                right="8px"
                top="8px"
                onClick={() => setError(null)}
              />
            </Alert>
          )}

          {/* Tabs */}
          <Tabs
            index={tabIndex}
            onChange={setTabIndex}
            variant="soft-rounded"
            colorScheme="blue"
          >
            <TabList mb={4}>
              <Tab>Login</Tab>
              <Tab>Signup</Tab>
            </TabList>
            <TabPanels>
              {/* Login Form */}
              <TabPanel>
                <form onSubmit={handleSubmit}>
                  <FormControl id="email" isRequired mb={3}>
                    <FormLabel>Email</FormLabel>
                    <Input
                      value={email}
                      onChange={handleEmailChange}
                      type="email"
                    />
                  </FormControl>
                  <FormControl id="password" isRequired mb={3}>
                    <FormLabel>Password</FormLabel>
                    <Input
                      value={password}
                      onChange={handlePasswordChange}
                      type="password"
                    />
                  </FormControl>
                  <FormControl
                    id="remember"
                    display="flex"
                    alignItems="center"
                    mb={6}
                  >
                    <FormLabel htmlFor="remember" mb="0">
                      Remember me
                    </FormLabel>
                    <Checkbox
                      id="remember"
                      onChange={(event) => handleRememberChange(event)}
                      ml={2}
                    />
                  </FormControl>
                  <Button colorScheme="blue" type="submit" width="full">
                    Login
                  </Button>
                </form>
              </TabPanel>

              {/* Signup Form */}
              <TabPanel>
                {/* ... (Your signup form code remains the same) ... */}
                <form onSubmit={handleSubmit}>
                  <FormControl id="email" isRequired mb={3}>
                    <FormLabel>Email</FormLabel>
                    <Input
                      value={email}
                      onChange={handleEmailChange}
                      type="email"
                    />
                  </FormControl>
                  <FormControl id="password" isRequired mb={6}>
                    <FormLabel>Password</FormLabel>
                    <Input
                      value={password}
                      onChange={handlePasswordChange}
                      type="password"
                    />
                  </FormControl>
                  <Button colorScheme="teal" type="submit">
                    Signup
                  </Button>
                </form>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Flex>
      </Box>
    </Flex>
  );
};

export default LoginSignup;
