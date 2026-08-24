import {
  Box,
  Button,
  Container,
  Heading,
  HStack,
  SimpleGrid,
  Text,
  VStack,
} from '@chakra-ui/react'
import {
  FaCheckCircle,
  FaCloudUploadAlt,
  FaLock,
  FaMobileAlt,
  FaMoon,
  FaPlusCircle,
  FaRocket,
} from 'react-icons/fa'
import { AuthForm } from './AuthForm'

const features = [
  {
    icon: FaPlusCircle,
    title: 'Create Todos',
    desc: 'Add tasks instantly with a single click or the Enter key.',
    color: 'blue.500',
  },
  {
    icon: FaCheckCircle,
    title: 'Track Progress',
    desc: 'Check off completed tasks and watch your list shrink.',
    color: 'green.500',
  },
  {
    icon: FaLock,
    title: 'Secure Accounts',
    desc: 'Your todos are protected with JWT auth and bcrypt encryption.',
    color: 'purple.500',
  },
  {
    icon: FaCloudUploadAlt,
    title: 'Cloud Synced',
    desc: 'Your tasks are saved in the cloud — pick up on any device.',
    color: 'orange.500',
  },
  {
    icon: FaMoon,
    title: 'Dark Mode',
    desc: 'Easy on the eyes, day or night. Your preference is remembered.',
    color: 'indigo.500',
  },
  {
    icon: FaMobileAlt,
    title: 'Works Everywhere',
    desc: 'Fully responsive — phone, tablet, or desktop.',
    color: 'pink.500',
  },
]

export function Landing() {
  const scrollToAuth = () => {
    document.getElementById('get-started')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <Box>
      {/* Hero */}
      <Box
        as="section"
        py={{ base: 16, md: 24 }}
        px={4}
        textAlign="center"
        bgGradient="to-b"
        gradientFrom={{ base: 'white', _dark: 'gray.900' }}
        gradientTo="transparent"
      >
        <Container maxW="3xl" mx="auto">
          <HStack
            justify="center"
            gap={2}
            mb={6}
            px={4}
            py={2}
            borderRadius="full"
            bg="blue.50"
            _dark={{ bg: 'blue.900' }}
            w="fit-content"
            mx="auto"
          >
            <FaRocket color="blue.500" />
            <Text fontSize="sm" fontWeight="bold" color="blue.500">
              Simple. Fast. Yours.
            </Text>
          </HStack>

          <Heading
            as="h1"
            size={{ base: '2xl', md: '4xl' }}
            lineHeight={1.2}
            mb={6}
          >
            Organize your life,{' '}
            <Text
              as="span"
              bgGradient="to-r"
              gradientFrom="blue.400"
              gradientTo="purple.500"
              bgClip="text"
            >
              one todo at a time
            </Text>
          </Heading>

          <Text
            fontSize={{ base: 'lg', md: 'xl' }}
            color="gray.500"
            _dark={{ color: 'gray.400' }}
            maxW="xl"
            mx="auto"
            mb={10}
          >
            MyLittleTodo is the simplest way to keep track of what matters.
            Create an account, add your tasks, and stay on top of everything —
            anywhere, anytime.
          </Text>

          <HStack justify="center" gap={4} flexWrap="wrap">
            <Button
              colorPalette="blue"
              size="xl"
              borderRadius="full"
              px={10}
              fontWeight="bold"
              onClick={scrollToAuth}
            >
              Get Started — It's Free
            </Button>
          </HStack>
        </Container>
      </Box>

      {/* Features */}
      <Box as="section" py={{ base: 12, md: 20 }} px={4}>
        <Container maxW="5xl" mx="auto">
          <VStack gap={3} mb={12} textAlign="center">
            <Heading size={{ base: 'xl', md: '2xl' }}>Everything you need</Heading>
            <Text fontSize="lg" color="gray.500" _dark={{ color: 'gray.400' }}>
              No clutter. No noise. Just your todos.
            </Text>
          </VStack>

          <SimpleGrid columns={{ base: 1, sm: 2, lg: 3 }} gap={6}>
            {features.map((f) => (
              <Box
                key={f.title}
                p={6}
                borderRadius="xl"
                borderWidth="1px"
                borderColor="gray.200"
                _dark={{ borderColor: 'gray.700', bg: 'gray.800' }}
                bg="white"
                boxShadow="sm"
                transition="all 0.2s"
                _hover={{
                  transform: 'translateY(-4px)',
                  boxShadow: 'lg',
                }}
              >
                <Box fontSize="3xl" color={f.color} mb={4}>
                  <f.icon aria-hidden />
                </Box>
                <Heading size="md" mb={2}>
                  {f.title}
                </Heading>
                <Text color="gray.500" _dark={{ color: 'gray.400' }} fontSize="sm">
                  {f.desc}
                </Text>
              </Box>
            ))}
          </SimpleGrid>
        </Container>
      </Box>

      {/* Auth */}
      <Box as="section" id="get-started" px={4} pb={20}>
        <Container maxW={{ base: '100%', sm: '440px' }} mx="auto">
          <AuthForm />
        </Container>
      </Box>

      {/* Footer */}
      <Box as="footer" py={6} textAlign="center">
        <Text fontSize="sm" color="gray.400">
          ✓ MyLittleTodo — built with Go, React & MongoDB
        </Text>
      </Box>
    </Box>
  )
}
