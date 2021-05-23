const VerifyNodeOwnershipFirstStep = ({ onSubmit }) => (
  <div className="pt-8">
    <p className="text-2.5xl">
      Please enter the public address of your validator node and press submit
    </p>
    <p className="text-sm mt-2 text-dark1">
      Clicking below will open up the hellosign document for capturing your
      electronic signature
    </p>
    <div className="md:relative mt-12">
      <input
        type="text"
        className="w-full h-16 text-xl px-7 pr-72 rounded-full shadow-md focus:outline-none"
      />
      <button
        type="button"
        className="md:absolute right-0 text-lg text-white w-full md:w-64 h-16 rounded-full bg-primary focus:outline-none mt-2 md:mt-0"
        onClick={onSubmit}
      >
        Submit
      </button>
    </div>
  </div>
);

export default VerifyNodeOwnershipFirstStep;
