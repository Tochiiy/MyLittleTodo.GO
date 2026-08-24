import { Box, Button, Flex, Input, VStack } from '@chakra-ui/react'
import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '../api/client'
import { useColorMode } from './ColorModeProvider'

export function TodoForm() {
  const { colorMode } = useColorMode()
  const [input, setInput] = useState('')
  const queryClient = useQueryClient()

  const createMutation = useMutation({
    mutationFn: (body: string) => api.createTodo(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] })
      setInput('')
    },
  })

  const handleSubmit = () => {
    if (input.trim()) {
      createMutation.mutate(input.trim())
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit()
    }
  }

  return (
    <VStack gap={4} w="100%" mt={6}>
      <Box w="100%">
        <Flex gap={2}>
          <Input
            placeholder="Add a new todo..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={createMutation.isPending}
            size="lg"
            borderRadius="lg"
            bg={colorMode === 'light' ? 'white' : 'gray.700'}
            borderColor={colorMode === 'light' ? 'gray.300' : 'gray.600'}
            _focus={{
              borderColor: 'blue.500',
              boxShadow: '0 0 0 1px blue.500',
            }}
            _placeholder={{
              color: colorMode === 'light' ? 'gray.400' : 'gray.500',
            }}
          />
          <Button
            colorPalette="blue"
            size="lg"
            onClick={handleSubmit}
            loading={createMutation.isPending}
            borderRadius="lg"
            px={8}
            fontWeight="bold"
          >
            Add
          </Button>
        </Flex>
      </Box>
    </VStack>
  )
}
