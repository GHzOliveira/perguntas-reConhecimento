import { Box, Heading, Text } from '@chakra-ui/react'

interface DashboardCardProps {
  title: string
  value: string
}

export default function DashboardCard({ title, value }: DashboardCardProps) {
  return (
    <Box borderWidth="1px" borderRadius="md" p={4} bg="white" boxShadow="md">
      <Heading as="h3" size="md" mb={2}>
        {title}
      </Heading>
      <Text fontSize="2xl" fontWeight="bold">
        {value}
      </Text>
    </Box>
  )
}
