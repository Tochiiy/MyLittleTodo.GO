import { Box, Button, Heading, IconButton, Input, InputGroup, Text, VStack } from '@chakra-ui/react'
import { useState } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { useAuth } from './AuthProvider'
import { ApiError } from '../api/client'

export function AuthForm() {
  const { login, register } = useAuth()
  const [mode, setMode] = useState<'login' | 'register'>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      if (mode === 'login') {
        await login(email, password)
      } else {
        await register(email, password)
      }
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box
      as="form"
      onSubmit={handleSubmit}
      mt={16}
      p={8}
      w="100%"
      borderRadius="lg"
      boxShadow="md"
      bg="white"
      _dark={{ bg: 'gray.800' }}
    >
      <VStack gap={4} align="stretch">
        <Heading size="lg" textAlign="center">
          {mode === 'login' ? 'Welcome back 👋' : 'Create your account'}
        </Heading>
        <Text textAlign="center" color="gray.500">
          {mode === 'login'
            ? 'Log in to manage your todos'
            : 'Sign up to start organizing your todos'}
        </Text>

        {error && (
          <Text color="red.500" fontSize="sm" textAlign="center">
            {error}
          </Text>
        )}

        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          size="lg"
        />
        <InputGroup
          endElement={
            <IconButton
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              variant="ghost"
              size="sm"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </IconButton>
          }
        >
          <Input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
          />
        </InputGroup>

        <Button
          type="submit"
          colorPalette="blue"
          size="lg"
          fontWeight="bold"
          loading={loading}
        >
          {mode === 'login' ? 'Log in' : 'Sign up'}
        </Button>

        <Text textAlign="center" fontSize="sm" color="gray.500">
          {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
          <Text
            as="span"
            role="button"
            color="blue.500"
            fontWeight="bold"
            cursor="pointer"
            onClick={() => {
              setMode(mode === 'login' ? 'register' : 'login')
              setError('')
            }}
          >
            {mode === 'login' ? 'Sign up' : 'Log in'}
          </Text>
        </Text>
      </VStack>
    </Box>
  )
}
