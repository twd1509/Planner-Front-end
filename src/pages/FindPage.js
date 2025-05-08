import React, { useState } from "react";
import "../css/FindPage.css";
import { formatPhoneNumber } from "../utils/functions";
import { useNavigate } from "react-router-dom";

function FindPage() {
  const [mode, setMode] = useState("findId");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleFind = async (e) => {
    e.preventDefault();

    try {
      const endpoint = mode === "findId" ? "/member/findId" : "/member/findPw";
      const payload =
        mode === "findId"
          ? { name, phone }
          : { name, email, phone };

      const res = await fetch(`http://localhost:8080${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("검색 실패");

      const result = await res.text();
      const displayMessage =
        mode === "findPw"
          ? `임시 비밀번호는 [${result}] 입니다. 로그인 후 변경해주세요.`
          : `가입된 이메일: ${result}`;

      setMessage(displayMessage);
    } catch (error) {
      setMessage("검색 중 오류 발생 또는 회원 정보가 일치하지 않습니다.");
    }
  };

  return (
    <div className="find-page-wrapper">
      <div className="find-page-container">
        <h1 className="find-page-title">
          {mode === "findId" ? "FIND ACCOUNT" : "FIND PASSWORD"}
        </h1>

        <div className="find-page-tabs">
          <button
            className={`find-page-tab-btn ${mode === "findId" ? "active" : ""}`}
            type="button"
            onClick={() => {
              setMode("findId");
              setMessage("");
            }}
          >
            Account
          </button>
          <button
            className={`find-page-tab-btn ${mode === "findPw" ? "active" : ""}`}
            type="button"
            onClick={() => {
              setMode("findPw");
              setMessage("");
            }}
          >
            Password
          </button>
        </div>

        <form className="find-page-form" onSubmit={handleFind}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="find-page-input"
          />

          {mode === "findPw" && (
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="find-page-input"
            />
          )}

          <input
            type="text"
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(formatPhoneNumber(e.target.value))}
            required
            className="find-page-input"
            maxLength={13}
          />

          <div className="find-page-button-group">
            <button className="find-page-submit-btn" type="submit">
              {mode === "findId" ? "FIND ACCOUNT" : "FIND PASSWORD"}
            </button>
            <button
              type="button"
              className="find-page-submit-btn"
              onClick={() => navigate("/login")}
            >
              로그인 하러가기
            </button>
          </div>

        </form>

        {message && (
          <div
            className={`find-page-message ${
              message.startsWith("임시 비밀번호") || message.startsWith("가입된 이메일")
                ? "success"
                : "error"
            }`}
          >
            {message}
          </div>
        )}
      </div>
    </div>
  );
}

export default FindPage;
