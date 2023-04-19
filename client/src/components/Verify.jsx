import React, { useEffect, useRef, useState } from "react";
import api from "../api/config";

import "./verify.css";

export default function Verify() {
  const [message, setMessage] = useState("");
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [serverCode, setServerCode] = useState([]);
  const inputRefs = useRef([]);
  // let verificationCode = 556677;

  useEffect(() => {
    const fetchCode = async () => {
      const response = await api.get("/code");
      const getData = response.data;
      const getCodeFromServer = getData[getData.length - 1].code;
      setServerCode(getCodeFromServer);
    };
    fetchCode();

  }, []);

  const handleChange = (e, index) => {
    let newValue = e.target.value;

    if (newValue.length > 1) {
      // newValue = newValue.slice(1, 0); // get last digit
      newValue = newValue.slice(0, 1); //get first digit
    }

    setCode((prevCode) => {
      const newCode = [...prevCode];
      newCode[index] = newValue;
      return newCode;
    });
    if (newValue && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleClick = (e) => {
    e.preventDefault();
    let verifyCode = code.join("");
    if (Number(verifyCode) === serverCode) {
      setMessage("your code has been submitted");
      setCode(["","","","","",""])
    } else {
      setMessage("Verification Error");
    }
  };
  return (
    <div className="verify-container">
      <p>This is the code from the server: {serverCode}. Enter this code and the verfication will complete</p>
      <p style={{ color: message.includes("submitted") ? "green" : "red" }}>
        {message}
      </p>
      <b className="verification-code-class"> Verification Code </b>

      <form onSubmit={handleClick}>
        {code.map((digit, index) => (
          <input
            key={index}
            type="number"
            required
            pattern="[0-9]"
            min="0"
            max="9"
            id="numberInput"
            value={digit}
            onChange={(e) => handleChange(e, index)}
            ref={(el) => (inputRefs.current[index] = el)}
            // autoFocus
          />
        ))}

        <button className="submit-btn" type="submit">
          SUBMIT
        </button>
      </form>
    </div>
  );
}
