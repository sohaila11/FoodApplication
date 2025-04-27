export default function InputForm({ label, id, error, ...props }) {
  return (
    <div className="control-div">
      <label htmlFor={id}>{label}</label>
      <input id={id} {...props} />
      <div className="error">{error && <p>{error}</p>}</div>
    </div>
  );
}
