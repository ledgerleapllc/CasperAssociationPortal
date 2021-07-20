const SubmitKYCFirstStep = ({ onIndividual, onEntity }) => (
  <div className="pt-8">
    <p className="text-2.5xl animate__animated animate__fadeInLeft animate__delay-2s">
      Association membership requires you to submit some information for
      compliance.
    </p>
    <p className="text-sm text-dark1 mt-1 animate__animated animate__fadeInLeft animate__delay-4s">
      This process is mandatory and can be completed entirely through this
      portal. First, we will need to know who
      <br />
      operates the node, an individual or an entity.
      <br />
      <br />
      <span className="font-medium italic">Individuals</span> - you will need to
      submit your name and DOB, then upload an identification document and proof
      of address document
      <br />
      <br />
      <span className="font-medium italic">Companies/Entities</span> - you will
      need to input basic information and contact emails for all persons who
      have either decision making power or own 10% or more of the entity. A link
      will be sent to each person to collect their information and documents
      directly. If another entity has decision making power or owns more than
      10% of the primary entity, that entity will need to also complete the same
      process of providing decision maker and shareholder details.
      <br />
      <br />
      Please begin by selecting one of the following options. My node is
      operated by a/an:
    </p>
    <div className="lg:flex lg:space-x-8 lg:items-center mt-12">
      <button
        type="button"
        className="text-lg text-white w-full lg:w-64 h-16 rounded-full bg-primary shadow-md focus:outline-none hover:opacity-40 animate__animated animate__fadeInUp animate__delay-6s"
        onClick={onIndividual}
      >
        Individual
      </button>
      <button
        type="button"
        className="text-lg text-primary w-full lg:w-64 h-16 rounded-full bg-white border-2 border-primary shadow-md focus:outline-none mt-2 lg:mt-0 hover:bg-primary hover:bg-opacity-40 hover:text-white animate__animated animate__fadeInUp animate__delay-7s"
        onClick={onEntity}
      >
        Entity
      </button>
    </div>
  </div>
);

export default SubmitKYCFirstStep;
