import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import router from 'next/router';

import { LoadingScreen } from '../../../components/hoc/loading-screen';
import LayoutDashboard from '../../../components/layouts/layout-dashboard';
import { Card } from '../../../components/partials';
import { FirstPart } from '../../../components/dashboard/verification/first-part';
import { SwitchUserType } from '../../../components/dashboard/verification/switch-user-type';
import { IndividualVerification } from '../../../components/dashboard/verification/individual-verification';
import { EntityVerification } from '../../../components/dashboard/verification/entity-verification';
import { VerificationResult } from '../../../components/dashboard/verification/verification-result';
import { UserType } from '../../../shared/constants/user-type';

const Verification = () => {
  const user = useSelector(state => state.authReducer.userInfo);

  const [currentStep, setCurrentStep] = useState(null);

  useEffect(() => {
    if (user?.status === 'approved') {
      router.push('/dashboard');
    } else if (user?.status === 'pending') {
      setCurrentStep(4);
    } else {
      setCurrentStep(1);
    }
  }, []);

  const getContent = () => {
    switch (currentStep) {
      case 1:
        return <FirstPart goNext={() => setCurrentStep(2)} />;
      case 2:
        return <SwitchUserType goNext={() => setCurrentStep(3)} />;
      case 3:
        return user.type === UserType.individual ? (
          <IndividualVerification goNext={() => setCurrentStep(4)} />
        ) : (
          <EntityVerification goNext={() => setCurrentStep(4)} />
        );
      case 4:
        return <VerificationResult />;
      default:
        return <></>;
    }
  };

  return (
    <LayoutDashboard>
      <Card className="h-full lg:px-24 lg:py-11 lg:shadow-2xl" noShadow>
        <div className="w-full h-full">
          <div className="card-header lg:h-70px">
            <h3 className="text-dark2 text-xl lg:pr-32 font-medium mb-3.5">
              Verification & Profile
            </h3>
            <div className="border-primary border-b-2" />
          </div>
          <div className="card-body lg:mt-0 mt-8 pb-28 overflow-y-auto lg:h-100%-70px">
            <div className="lg:pr-24">{getContent()}</div>
          </div>
        </div>
      </Card>
    </LayoutDashboard>
  );
};

export default LoadingScreen(Verification, 'final-all');
