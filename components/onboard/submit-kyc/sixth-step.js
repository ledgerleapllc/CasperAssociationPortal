import { useHistory } from 'react-router-dom';

const SubmitKYCSixthStep = () => {
  const router = useHistory();
  return (
    <div className="pt-8">
      <p className="text-2.5xl animate__animated animate__fadeInLeft animate__delay-2s">
        Once all users have submitted and passed the KYC step, your organization
        will be eligible for membership.
      </p>
      <p className="text-sm text-dark1 mt-1 animate__animated animate__fadeInLeft animate__delay-4s">
        You can continue back to your dashboard for now.
      </p>
      <p className="mt-12 text-2.5xl">
        My status: <span className="text-success">Verified</span>
      </p>
      <div className="lg:flex lg:space-x-8 lg:items-center mt-12">
        <button
          type="button"
          className="lg:hidden my-5 text-lg text-white w-full lg:w-64 h-16 rounded-full bg-primary shadow-md focus:outline-none hover:opacity-40"
          onClick={() => router.push('/dashboard')}
        >
          To Dashboard
        </button>
      </div>
    </div>
  );
};

export default SubmitKYCSixthStep;
