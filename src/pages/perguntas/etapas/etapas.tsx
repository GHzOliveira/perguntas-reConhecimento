import { Box, Text } from "@chakra-ui/react";
import { useState } from "react";
import { Step1 } from "./step1/step1";
import { Step2 } from "./step2/step2";
import { Step3 } from "./step3/step3";
import Introducao from "./introducao/introducao";

const Questionnaire = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const nextStep = () => {
    if (currentStep === 3) {
      setIsCompleted(true);
    }
    setCurrentStep((prevStep) => prevStep + 1);
  };
  const resetToStep0 = () => setCurrentStep(0);

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Introducao nextStep={nextStep} isCompleted={isCompleted}/>
          </div>
        );
      case 1:
        return (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Text fontSize={"3rem"}>Parte 1 - Filosofia</Text>
            <Step1 nextStep={nextStep} />
          </div>
        );
      case 2:
        return (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Text fontSize={"3rem"}>Parte 2 - Estrégia</Text>
            <Step2 nextStep={nextStep} />
          </div>
        );
      case 3:
        return (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Text fontSize={"3rem"}>Parte 3 - Método</Text>
            <Step3 nextStep={nextStep} resetToStep1={resetToStep0} />
          </div>
        );
      case 4:
        return;
      default:
        return;
    }
  };

  return <Box>{renderStep()}</Box>;
};

export default Questionnaire;
