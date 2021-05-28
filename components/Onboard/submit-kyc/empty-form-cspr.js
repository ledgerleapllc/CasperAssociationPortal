const EmptyFormCspr = ({ isDisplayButton, appendForm }) => (
  <div>
    {isDisplayButton && (
      <button
        className="flex flex-col items-center"
        type="button"
        onClick={appendForm}
      >
        <img src="/images/ic_user_plus.svg" alt="User Plus" />
        <p className="text-bold text-primary text-sm">Add Owner</p>
      </button>
    )}
  </div>
);
export default EmptyFormCspr;
