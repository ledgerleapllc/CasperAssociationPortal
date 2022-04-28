export const RemoveRecipientDialog = ({ info, onRemove, onBack }) => (
  <div className="text-center mx-auto py-28" style={{ maxWidth: '26rem' }}>
    <h3 className="text-xl text-center mb-2.5">
      Are you sure you want to remove {info?.email} from receiving contact form
      messages?
    </h3>
    <div className="w-100 flex gap-2.5 items-center mx-auto mt-8">
      <button
        type="button"
        className="w-full text-lg text-primary h-16 rounded-full bg-white border-2 border-primary shadow-md focus:outline-none hover:bg-primary hover:bg-opacity-40 hover:text-white"
        onClick={onBack}
      >
        No, Cancel
      </button>
      <button
        type="button"
        onClick={onRemove}
        className="w-full text-lg text-white h-16 rounded-full bg-primary shadow-md focus:outline-none hover:opacity-40"
      >
        Yes, Remove
      </button>
    </div>
  </div>
);
