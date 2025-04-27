import { forwardRef, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";
import InputForm from "./InputForm";
import SubInputForm from "./SubInputForm";
import { useInput } from "../hooks/useInputs";
import { isNotEmpty, hasMinLength } from "../util/validation";

const CheckOut = forwardRef(function checkOut({ title }, ref) {
  const {
    value: firstName,
    handleUserValue: handleFNameChange,
    handleBlur: handleFNameBlur,
    hasError: FNameHasError,
    handleReset: resetFName,
  } = useInput("", (v) => isNotEmpty(v));

  const {
    value: lastName,
    handleUserValue: handleLNameChange,
    handleBlur: handleLNameBlur,
    hasError: LNameHasError,
    handleReset: resetLName,
  } = useInput("", (v) => isNotEmpty(v));

  const {
    value: phoneNumber,
    handleUserValue: handleNumberChange,
    handleBlur: handleNumberBlur,
    hasError: NumberHasError,
    handleReset: resetNumber,
  } = useInput("", (v) => isNotEmpty(v) && hasMinLength(v));
  const dialog = useRef();

  useImperativeHandle(ref, () => {
    return {
      open: () => {
        dialog.current.showModal();
      },
    };
  });

  function handleSubmit(event) {
    event.preventDefault();
    if (FNameHasError || LNameHasError || NumberHasError) {
      return;
    }
  }
  function handleR() {
    resetFName();
    resetLName();
    resetNumber();
  }
  return createPortal(
    <dialog id="dialogModal" ref={dialog}>
      <h2>{title}</h2>
      <form onSubmit={handleSubmit} className="control">
        <InputForm
          label="First-name"
          id="first-name"
          type="text"
          name="first-name"
          value={firstName}
          onBlur={handleFNameBlur}
          onChange={handleFNameChange}
          error={FNameHasError && "please enter your first name"}
        />
        <InputForm
          label="Last-name"
          id="Last-name"
          type="text"
          name="Last-name"
          value={lastName}
          onBlur={handleLNameBlur}
          onChange={handleLNameChange}
          error={LNameHasError && "please enter your last name"}
        />
        <InputForm
          label="Phone-number"
          id="Phone-number"
          type="text"
          name="Phone-number"
          value={phoneNumber}
          onBlur={handleNumberBlur}
          onChange={handleNumberChange}
          error={NumberHasError && "please enter a valid number"}
        />
        <SubInputForm />
        <div id="modal-actions">
          <button type="button" onClick={handleR}>
            Reset
          </button>
          <button type="submit">Submit</button>
        </div>
      </form>
    </dialog>,
    document.getElementById("modal")
  );
});
export default CheckOut;
