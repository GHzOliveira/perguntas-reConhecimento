import { Box, Text } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { Step1 } from './step1/step1'
import { Step2 } from './step2/step2'
import { Step3 } from './step3/step3'
import Introducao from './introducao/introducao'
import { UserResponse } from '../../../types/FormType'

const Questionnaire = () => {
  const [currentStep, setCurrentStep] = useState(0)
  const [userId, setUserId] = useState<number>(0)

  useEffect(() => {
    const userSession: string | null = sessionStorage.getItem('userSession')
    if (userSession) {
      const parsedSession: UserResponse = JSON.parse(userSession)
      if (parsedSession && typeof parsedSession.id === 'number') {
        setUserId(parsedSession.id)
      }
    }
  }, [])

  const nextStep = () => {
    setCurrentStep(prevStep => prevStep + 1)
  }
  const resetToStep0 = () => setCurrentStep(0)

  const renderStep = (): JSX.Element | null => {
    switch (currentStep) {
      case 0:
        return (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            <Introducao nextStep={nextStep} userId={userId} />
          </div>
        )
      case 1:
        return (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            <Text fontSize={'3rem'}>Parte 1</Text>
            <Step1 nextStep={nextStep} />
          </div>
        )
      case 2:
        return (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            <Text fontSize={'3rem'}>Parte 2</Text>
            <Step2 nextStep={nextStep} />
          </div>
        )
      case 3:
        return (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            <Text fontSize={'3rem'}>Parte 3</Text>
            <Step3 nextStep={nextStep} resetToStep1={resetToStep0} />
          </div>
        )
      default:
        return null
    }
  }

  return <Box>{renderStep()}</Box>
}

export default Questionnaire
