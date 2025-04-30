import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import MyPage from "./pages/MyPage";
import SettingPage from "./pages/SettingPage";
import LogoutPage from "./pages/LogoutPage";

import { AuthContext } from "./context/AuthContext";



function App() {
  const [user, setUser] = useState(null);      // 로그인된 유저 정보
  const [loading, setLoading] = useState(true); // 세션 확인 중 여부

  useEffect(() => {
    // 세션 쿠키 기반 로그인 확인
    fetch("http://localhost:8080/member/cookiechk", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((res) => {
        console.log("세션 확인 결과:", res); // ✨ 세션 결과 콘솔 출력

        if (res.email) {
          setUser({ email: res.email, grade: res.grade });
          console.log("로그인된 유저:", res.email); // ✨ 로그인 성공했을 때 콘솔 출력
        } else {
          console.log("로그인된 유저 없음."); // ✨ 로그인 안됐을 때 콘솔 출력
        }

        setLoading(false);
      })
      .catch((error) => {
        console.error("세션 체크 실패:", error);
        setLoading(false);
      });
  }, []);

  // if (loading) return <div>로딩 중...</div>;

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={user ? <HomePage /> : <Navigate to="/login" />} /> */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/setting" element={<SettingPage />} />
          <Route path="/logout" element={<LogoutPage />} />
          <Route path="/logout" element={<LogoutPage />} />
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
