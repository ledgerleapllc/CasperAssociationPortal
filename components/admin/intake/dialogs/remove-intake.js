export const RemoveIntakeDialog = ({ email, removeIntake, cancel }) => (
  <div className="py-16 text-center w-96 mx-auto">
    <h3 className="text-xl text-center mb-2.5">
      Are you sure you want to remove {email} from this table?
    </h3>
    <p className="text-xs text-gray mb-8">
      They will have to start the registration process over if you continue.
    </p>
    <div className="flex gap-2.5 flex-col items-center">
      <button
        type="button"
        className="w-full text-lg text-white h-16 rounded-full bg-primary shadow-md focus:outline-none hover:opacity-40"
        onClick={removeIntake}
      >
        Remove User
      </button>
      <button
        type="button"
        className="mt-3 text-primary underline"
        onClick={cancel}
      >
        Cancel
      </button>
    </div>
  </div>
);
