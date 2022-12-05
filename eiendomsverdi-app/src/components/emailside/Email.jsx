import React, { useRef } from "react";
import "./email.css";
import { useNavigate } from "react-router-dom";

const Email = () => {
  const navigate = useNavigate();
  const emailRef = useRef();

  let handleSubmit = async (event) => {};

  return (
    <div className="Email">
      <div className="rødpil">
        <button className="emailBack-btn"
          onClick={() => {
            navigate(-1);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75"
            />
          </svg>
        </button>
      </div>

      <div className="email-grid">
        <h1>Legg igjen kontaktinformasjon</h1>
        <p>
          Så tar vi kontakt neste måned eller neste gang det er endringer i
          renten{" "}
          <span role="img" aria-label="Rock">
            🤟
          </span>
        </p>

        <p style={{ margin: "0 0", marginTop: "30px" }}>E-post</p>
        <form onSubmit={handleSubmit}>
          <input
            className="email-input"
            ref={emailRef}
            type="email"
            required="required"
            placeholder="eksempel@mail.no"
          />

          <button type="submit" className="email-lagre">
            <span>Lagre</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Email;
