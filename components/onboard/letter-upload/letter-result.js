const LetterResult = () => (
  <div className="pt-8">
    <p className="text-2.5xl">Thanks!</p>
    <p className="text-sm mt-2 lg:mb-14 mb-14 text-dark1">
      An admin will review the document you uploaded. This usually happens{' '}
      within 24 hours. You will receive an email once the review process is
      complete.
    </p>
    <p className="text-2.5xl">
      Status: <span className="text-success">Pending</span>
    </p>
  </div>
);

export default LetterResult;
