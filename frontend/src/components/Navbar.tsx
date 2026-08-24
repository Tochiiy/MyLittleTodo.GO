import { Box, Flex, Heading, IconButton, HStack, Text } from '@chakra-ui/react'
import { useColorMode } from './ColorModeProvider'
import { useAuth } from './AuthProvider'

export function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode()
  const { user, logout } = useAuth()

  return (
    <Box
      bg={colorMode === 'light' ? 'white' : 'gray.800'}
      boxShadow="md"
      p={4}
      borderBottom="1px solid"
      borderColor={colorMode === 'light' ? 'gray.200' : 'gray.700'}
      position="sticky"
      top="0"
      zIndex={10}
    >
      <Flex
        maxW="1200px"
        mx="auto"
        justify="space-between"
        align="center"
      >
        {/* Logo/Title */}
        <HStack gap={3}>
          <Box
            fontSize="2xl"
            fontWeight="bold"
            bgGradient="to-r"
            gradientFrom="blue.400"
            gradientTo="purple.500"
            bgClip="text"
          >
            ✓
          </Box>
          <Heading
            size="md"
            color={colorMode === 'light' ? 'gray.800' : 'white'}
          >
            MyLittleTodo
          </Heading>
        </HStack>

        {/* User + Dark/Light Mode Toggle */}
        <HStack gap={2}>
          {user && (
            <>
              <Text
                fontSize="sm"
                color={colorMode === 'light' ? 'gray.500' : 'gray.400'}
                display={{ base: 'none', sm: 'block' }}
              >
                {user.email}
              </Text>
              <IconButton
                onClick={logout}
                variant="ghost"
                size="sm"
                aria-label="Log out"
                title="Log out"
                fontSize="lg"
              >
                🚪
              </IconButton>
            </>
          )}
          <IconButton
            onClick={toggleColorMode}
            variant="ghost"
            size="lg"
            aria-label="Toggle dark mode"
            fontSize="2xl"
          >
            {colorMode === 'light' ? '🌙' : '☀️'}
          </IconButton>
        </HStack>
      </Flex>
    </Box>
  )
}
