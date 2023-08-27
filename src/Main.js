import React, { useRef } from "react";
import "./scss/style.scss";

function Main() {
  const rangeRef = useRef();
  const numberInputRef = useRef();
  const outPutRef = useRef();
  const lowercaseRef = useRef();
  const uppercaseRef = useRef();
  const numbersCheckboxRef = useRef();
  const symbolsCheckboxRef = useRef();

  function copy(e) {
    e.preventDefault();
    outPutRef.current.select();
    document.execCommand("copy");
  }

  function range(e) {
    e.preventDefault();
    numberInputRef.current.value = e.target.value;
  }

  function numberInput(e) {
    e.preventDefault();
    rangeRef.current.value = e.target.value;
  }

  function generate(e) {
    e.preventDefault();
    let passLength = numberInputRef.current.value;

    const numbers = "0123456789";
    const alphabet = "abcdefghijklmnopqrstuvwxyz";
    const alphabet2 = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const symbols = "!@#$%^&*()";

    let password = "";
    for (let i = 0; i < passLength; i++) {
      password += alphabet.charAt(Math.floor(Math.random() * alphabet.length));
    }
    if (lowercaseRef.current.checked && password === "") {
      for (let i = 0; i < passLength; i++) {
        password += alphabet.charAt(
          Math.floor(Math.random() * alphabet.length)
        );
      }
    }
    if (uppercaseRef.current.checked) {
      for (let i = 0; i < Math.floor(Math.random() * passLength); i++) {
        password = password.replace(
          password[Math.floor(Math.random() * passLength)],
          alphabet2.charAt(Math.floor(Math.random() * alphabet2.length))
        );
      }
    }
    if (numbersCheckboxRef.current.checked) {
      for (let i = 0; i < Math.floor(Math.random() * passLength); i++) {
        password = password.replace(
          password[Math.floor(Math.random() * passLength)],
          numbers.charAt(Math.floor(Math.random() * numbers.length))
        );
      }
    }
    if (symbolsCheckboxRef.current.checked) {
      for (let i = 0; i < Math.floor(Math.random() * passLength); i++) {
        password = password.replace(
          password[Math.floor(Math.random() * passLength)],
          symbols.charAt(Math.floor(Math.random() * symbols.length))
        );
      }
    }
    outPutRef.current.value = password;
  }

  return (
    <div className="wrapper">
      <div className="container">
        <form className="output-container">
          <div className="output-container">
            <input
              type="text"
              name="output"
              id="output"
              ref={outPutRef}
              readOnly
              placeholder="Your password"
            />
            <button type="button" id="copy" onClick={copy}></button>
          </div>
          <div className="options">
            <div>
              <input
                type="checkbox"
                name="uppercase"
                id="uppercase"
                ref={uppercaseRef}
              />
              <label htmlFor="uppercase">Uppercase</label>
            </div>
            <div>
              <input
                type="checkbox"
                name="lowercase"
                id="lowercase"
                defaultChecked
                ref={lowercaseRef}
              />
              <label htmlFor="lowercase">Lowercase</label>
            </div>
            <div>
              <input
                type="checkbox"
                name="numbers"
                id="numbers"
                ref={numbersCheckboxRef}
              />
              <label htmlFor="numbers">Numbers</label>
            </div>
            <div>
              <input
                type="checkbox"
                name="symbols"
                id="symbols"
                ref={symbolsCheckboxRef}
              />
              <label htmlFor="symbols">Symbols</label>
            </div>
            <div>
              <label htmlFor="pass-length">Password Length</label>
              <input
                type="range"
                name="pass-length"
                id="pass-length-range"
                ref={rangeRef}
                defaultValue={6}
                maxLength="40"
                onInput={range}
              />
              <input
                type="number"
                name="pass-length"
                id="pass-length-number"
                ref={numberInputRef}
                defaultValue={6}
                maxLength="40"
                onInput={numberInput}
              />
            </div>
          </div>
          <button type="submit" id="generate-btn" onClick={generate}>
            Generate Password
          </button>
        </form>
      </div>
    </div>
  );
}

export default Main;
