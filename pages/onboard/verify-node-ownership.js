import { useRouter } from "next/router";
import { useState } from "react";

const VerifyNodeOwnership = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const router = useRouter();

  const totalSteps = 6;

  return (

  );
};

export default VerifyNodeOwnership;