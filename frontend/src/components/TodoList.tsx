import {
  Box,
  Button,
  Checkbox,
  Flex,
  HStack,
  Text,
  VStack,
  Separator,
  Spinner,
} from '@chakra-ui/react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { api, type Todo } from '../api/client'
import { useColorMode } from './ColorModeProvider'

export function TodoList() {
  const { colorMode } = useColorMode()
  const queryClient = useQueryClient()

  const { data: todos, isPending, isError } = useQuery({
    queryKey: ['todos'],
    queryFn: api.getTodos,
  })

  const invalidate = () => queryClient.invalidateQueries({ queryKey: ['todos'] })

  const toggleMutation = useMutation({
    mutationFn: (todo: Todo) =>
      api.updateTodo(todo.id, { body: todo.body, completed: !todo.completed }),
    onSuccess: invalidate,
  })

  const deleteMutation = useMutation({
    mutationFn: (id: string) => api.deleteTodo(id),
    onSuccess: invalidate,
  })

  if (isPending) {
    return (
      <Box mt={8} textAlign="center">
        <Spinner size="lg" color="blue.500" />
      </Box>
    )
  }

  if (isError) {
    return (
      <Box mt={8} p={8} textAlign="center">
        <Text color="red.500">Failed to load todos. Please refresh.</Text>
      </Box>
    )
  }

  if (!todos || todos.length === 0) {
    return (
      <Box
        mt={8}
        p={8}
        textAlign="center"
        bg={colorMode === 'light' ? 'gray.50' : 'gray.900'}
        rounded="lg"
        border="2px dashed"
        borderColor={colorMode === 'light' ? 'gray.300' : 'gray.600'}
      >
        <Text fontSize="lg" color={colorMode === 'light' ? 'gray.500' : 'gray.400'}>
          No todos yet. Add one to get started! ✨
        </Text>
      </Box>
    )
  }

  return (
    <VStack gap={0} w="100%" mt={8}>
      {todos.map((todo, index) => (
        <Box key={todo.id} w="100%">
          <Flex
            p={4}
            bg={colorMode === 'light' ? 'white' : 'gray.800'}
            align="center"
            justify="space-between"
            _hover={{
              bg: colorMode === 'light' ? 'gray.50' : 'gray.700',
            }}
            transition="background-color 0.2s"
          >
            <HStack gap={3} flex={1} minW={0}>
              <Checkbox.Root
                checked={todo.completed}
                onCheckedChange={() => toggleMutation.mutate(todo)}
                disabled={toggleMutation.isPending}
                size="lg"
                colorPalette="blue"
              >
                <Checkbox.HiddenInput />
                <Checkbox.Control />
              </Checkbox.Root>
              <Text
                fontSize="md"
                truncate
                textDecoration={todo.completed ? 'line-through' : 'none'}
                color={
                  todo.completed
                    ? colorMode === 'light'
                      ? 'gray.400'
                      : 'gray.600'
                    : colorMode === 'light'
                      ? 'gray.800'
                      : 'white'
                }
              >
                {todo.body}
              </Text>
            </HStack>

            <Button
              size="sm"
              colorPalette="red"
              variant="ghost"
              loading={deleteMutation.isPending && deleteMutation.variables === todo.id}
              onClick={() => deleteMutation.mutate(todo.id)}
              flexShrink={0}
            >
              Delete
            </Button>
          </Flex>
          {index < todos.length - 1 && (
            <Separator
              m={0}
              borderColor={colorMode === 'light' ? 'gray.200' : 'gray.700'}
            />
          )}
        </Box>
      ))}
    </VStack>
  )
}
