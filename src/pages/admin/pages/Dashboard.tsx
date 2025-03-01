// src/pages/admin/pages/Dashboard.tsx
import { Box, Grid, Heading, useBreakpointValue } from '@chakra-ui/react'
import AdminLayout from '../layout/layout'
import DashboardCard from '../components/DashboardCard'

export default function Dashboard() {
  const totalColaboradores = 100
  const mediaPontuacao = 75
  const taxaParticipacao = '80%'

  const gridTemplateColumns = useBreakpointValue({
    base: 'repeat(1, 1fr)',
    md: 'repeat(3, 1fr)'
  })

  return (
    <AdminLayout>
      <Box p={4}>
        <Heading mb={6}>Dashboard</Heading>
        <Grid templateColumns={gridTemplateColumns} gap={6}>
          <DashboardCard title="Total de Colaboradores" value={totalColaboradores.toString()} />
          <DashboardCard title="Média de Pontuação" value={mediaPontuacao.toString()} />
          <DashboardCard title="Taxa de Participação" value={taxaParticipacao} />
        </Grid>
      </Box>
    </AdminLayout>
  )
}
