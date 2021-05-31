import { useRouter } from 'next/router';

const SubmitKYCSixthStep = () => {
  const router = useRouter();
  return (
    <div className="pt-8">
      <p className="text-2.5xl animate__animated animate__fadeInLeft animate__delay-2s">
        Once all users have submitted and passed the KYC step, your organization
        will be eligible for membership.
      </p>
      <p className="text-sm text-dark1 mt-1 animate__animated animate__fadeInLeft animate__delay-4s">
        You can continue back to your dashboard for now.
      </p>
      <div className="md:flex md:space-x-8 md:items-center mt-12">
        <button
          type="button"
          className="md:hidden my-5 text-lg text-white w-full md:w-64 h-16 rounded-full bg-primary shadow-md focus:outline-none hover:opacity-40"
          onClick={() => router.push('/dashboard')}
        >
          To Dashboard
        </button>
      </div>
    </div>
  );
};

export default SubmitKYCSixthStep;
