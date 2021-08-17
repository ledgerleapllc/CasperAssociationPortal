export const FirstPart = ({ goNext }) => (
  <div className="animate__animated animate__fadeInLeft animate__delay-8s">
    <p className="text-lg">First things first! It’s time to Get Verified.</p>
    <p className="text-lg mt-2 font-light text-dark1">
      Adding the identity of on owner or node operator increases trust on the
      network. Verifying with Casper gives you access to:
    </p>
    <ul className="text-lg text-dark1 font-light pl-4 py-8">
      <li>- A Casper Verified checkmark indicating your status live.</li>
      <li>- Your profile page showing your metrics, rank, and more.</li>
      <li>- Access to programs for trusted members.</li>
      <li>- Increased rewards (trusted nodes gain more delegations)</li>
    </ul>
    <button
      type="button"
      className="text-lg text-white w-full md:w-auto px-7 h-12 rounded-full bg-primary shadow-md focus:outline-none hover:opacity-40"
      onClick={goNext}
    >
      Begin Verification
    </button>
  </div>
);

