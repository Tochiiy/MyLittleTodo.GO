import { Container, Stack } from '@chakra-ui/react'
import './App.css'
import { Navbar } from './components/Navbar'
import { TodoForm } from './components/TodoForm'
import { TodoList } from './components/TodoList'
import { AuthForm } from './components/AuthForm'
import { useAuth } from './components/AuthProvider'

function App() {
  const { user } = useAuth()

  return (
    <Stack minH="100dvh">
      <Navbar />
      <Container
        maxW={{ base: '100%', sm: '560px', md: '640px' }}
        px={{ base: 4, sm: 6 }}
        mx="auto"
        w="100%"
      >
        {user ? (
          <>
            <TodoForm />
            <TodoList />
          </>
        ) : (
          <AuthForm />
        )}
      </Container>
    </Stack>
  )
}

export default App
