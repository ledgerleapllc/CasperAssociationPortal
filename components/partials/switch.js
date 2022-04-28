const Switch = ({ checked, onChange }) => (
  <label className="switch">
    <input type="checkbox" checked={checked} onChange={onChange} />
    <span className="slider round" />
  </label>
);

export default Switch;
