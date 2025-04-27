export default function SubInputForm() {
  return (
    <>
      <div>
        <label htmlFor="phone">How do you want to pay</label>
        <select id="role" name="role">
          <option value="Cash">Cash</option>
          <option value="visa">Visa</option>
        </select>
      </div>
      <div>
        <label htmlFor="terms-and-conditions">
          <input type="checkbox" id="terms-and-condtions" name="terms" />I agree
          to the terms and conditions
        </label>
      </div>
    </>
  );
}
