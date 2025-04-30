import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css/LoginPage.css";

function LoginPage() {
  const containerRef = useRef(null);
  const navigate = useNavigate();

  const [isSignUp, setIsSignUp] = useState(false);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPw, setLoginPw] = useState("");
  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPw, setSignupPw] = useState("");

  useEffect(() => {
    const container = containerRef.current;
    if (isSignUp) {
      container.classList.add("right-panel-active");
    } else {
      container.classList.remove("right-panel-active");
    }
  }, [isSignUp]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:8080/member/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email: loginEmail, pw: loginPw }),
      });

      if (res.ok) {
        const data = await res.json();
        localStorage.setItem("userInfo", JSON.stringify(data));
        alert("로그인 성공!");
        navigate("/");
      } else {
        const errorData = await res.text();
        throw new Error(errorData);
      }
    } catch (error) {
      console.error("로그인 실패 : ", error);
      alert("로그인 실패 : " + error.message);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:8080/member/join", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: signupName,
          email: signupEmail,
          pw: signupPw,
        }),
      });

      if (!res.ok) throw new Error("Signup failed");

      const data = await res.text();
      console.log("회원가입 성공:", data);
      alert("회원가입 성공!");

      setIsSignUp(false);
    } catch (error) {
      console.error("회원가입 실패:", error);
      alert("회원가입 실패: " + error.message);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="wrapper">
        <div className="container" ref={containerRef}>
          {/* 회원가입 폼 */}
          <div className="sign-up-container">
            <form onSubmit={handleSignup}>
              <h1>Create Account</h1>
              <div className="social-links">
                <div><a href="#"><i className="fa fa-facebook" aria-hidden="true"></i></a></div>
                <div><a href="#"><i className="fa fa-twitter" aria-hidden="true"></i></a></div>
                <div><a href="#"><i className="fa fa-linkedin" aria-hidden="true"></i></a></div>
              </div>
              <span>or use your email for registration</span>
              <input
                type="text"
                placeholder="Name"
                value={signupName}
                onChange={(e) => setSignupName(e.target.value)}
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={signupEmail}
                onChange={(e) => setSignupEmail(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={signupPw}
                onChange={(e) => setSignupPw(e.target.value)}
                required
              />
              <button className="form_btn" type="submit">Sign Up</button>
            </form>
          </div>

          {/* 로그인 폼 */}
          <div className="sign-in-container">
            <form onSubmit={handleLogin}>
              <h1>Sign In</h1>
              <div className="social-links">
                <div><a href="#"><i className="fa fa-facebook" aria-hidden="true"></i></a></div>
                <div><a href="#"><i className="fa fa-twitter" aria-hidden="true"></i></a></div>
                <div><a href="#"><i className="fa fa-linkedin" aria-hidden="true"></i></a></div>
              </div>
              <span>or use your account</span>
              <input
                type="email"
                placeholder="Email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={loginPw}
                onChange={(e) => setLoginPw(e.target.value)}
                required
              />
              <button className="form_btn" type="submit">Sign In</button>
            </form>
          </div>

          {/* 오버레이 */}
          <div className="overlay-container">
            <div className="overlay-left">
              <h1>Welcome Back</h1>
              <p>To keep connected with us please login with your personal info</p>
              <button className="overlay_btn" onClick={() => setIsSignUp(false)}>Sign In</button>
            </div>
            <div className="overlay-right">
              <h1>Hello, Friend</h1>
              <p>Enter your personal details and start journey with us</p>
              <button className="overlay_btn" onClick={() => setIsSignUp(true)}>Sign Up</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
