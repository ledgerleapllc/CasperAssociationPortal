export const AdminVerifiedCompletion = ({ onNext }) => (
  <div className="py-40 text-center mx-auto" style={{ width: '400px' }}>
    <h3 className="text-xl text-center mb-2.5 font-medium">
      Thank you for your reviewing!
    </h3>
    <p className="text-xs text-gray mb-8">
      This user is now eligible for a Verification badge. Please activate their
      Verified status below
    </p>
    <div className="mx-auto w-96 flex gap-2.5 flex-col items-center">
      <button
        type="button"
        className="w-full text-lg text-white h-16 rounded-full bg-primary shadow-md focus:outline-none hover:opacity-40"
        onClick={onNext}
      >
        Next
      </button>
    </div>
  </div>
);
