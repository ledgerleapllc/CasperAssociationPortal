const LetterResult = () => (
  <div className="pt-8">
    <p className="text-2.5xl">Thanks!</p>
    <p className="text-sm mt-2 lg:mb-14 mb-14 text-dark1">
      An admin must approve the document you uploaded. This usually happens
      within 24hrs. You can check the status later.
    </p>
    <p className="text-2.5xl">
      Status: <span className="text-success">Pending</span>
    </p>
  </div>
);

export default LetterResult;
