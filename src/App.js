import React, { useEffect, useState } from "react";
<<<<<<< HEAD
import { BrowserRouter, Route, Routes, Navigate, useLocation } from "react-router-dom";
=======
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
>>>>>>> origin/main

import LoginPage from "./pages/LoginPage";
import FindPage from "./pages/FindPage";
import HomePage from "./pages/HomePage";
import MyPage from "./pages/MyPage";
import MyInfoEditPage from "./pages/MyInfoEditPage";
import MyScheduleList from "./pages/MyScheduleList";
<<<<<<< HEAD
import ChatBot from "./pages/ChatBot";

import { AuthContext } from "./context/AuthContext";

const PrivateRoute = ({ user, children }) => {
  const location = useLocation();

  if (!user) {
    sessionStorage.setItem("redirectAfterLogin", location.pathname);
    return <Navigate to="/login" replace />;
  }

  return children;
};

// 🔥 ChatBot 예외 처리용
const ChatBotWrapper = () => {
  const location = useLocation();
  const excludedPaths = ["/login", "/find"]; // 제외할 경로

  if (excludedPaths.includes(location.pathname)) {
    return null;
  }

  return <ChatBot />;
=======

import { AuthContext } from "./context/AuthContext";

// ✅ 로그인 체크용 보호 라우트
const PrivateRoute = ({ user, children }) => {
  // return user ? children : <Navigate to="/login" />;
  return <HomePage />;
>>>>>>> origin/main
};

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8080/member/cookiechk", {
      credentials: "include",
    })
      .then(async (res) => {
        if (!res.ok) {
          setUser(null);
          return null;
        }
        return await res.json();
      })
      .then((res) => {
        if (res?.email) {
          setUser({ email: res.email, id: res.id, name: res.name });
          console.log("✅ 로그인된 유저:", res.email);
        } else {
          console.log("❌ 로그인된 유저 없음.");
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("❌ 세션 체크 실패:", error);
        setLoading(false);
      });
  }, []);

<<<<<<< HEAD
  if (loading) return <div>로딩 중...</div>;
=======
  // if (loading) return <div>로딩 중...</div>;
>>>>>>> origin/main

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <BrowserRouter>
        <Routes>
<<<<<<< HEAD
          <Route path="/login" element={<LoginPage />} />
          <Route path="/find" element={<FindPage />} />
          <Route path="/" element={<PrivateRoute user={user}><HomePage /></PrivateRoute>} />
          <Route path="/mypage" element={<PrivateRoute user={user}><MyPage /></PrivateRoute>} />
          <Route path="/mypage/edit" element={<PrivateRoute user={user}><MyInfoEditPage /></PrivateRoute>} />
          <Route path="/myschedule/mylist" element={<PrivateRoute user={user}><MyScheduleList /></PrivateRoute>} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>

        {/* ✅ 로그인·찾기 페이지 제외하고 항상 챗봇 표시 */}
        <ChatBotWrapper />
=======
          {/* ✅ 비로그인 상태에서도 접근 가능한 라우트 */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/find" element={<FindPage />} />

          {/* ✅ 보호된 라우트들 */}
          <Route
            path="/"
            element={
              <PrivateRoute user={user}>
                <HomePage />
              </PrivateRoute>
            }
          />
          <Route
            path="/mypage"
            element={
              <PrivateRoute user={user}>
                <MyPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/mypage/edit"
            element={
              <PrivateRoute user={user}>
                <MyInfoEditPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/myschedule/mylist"
            element={
              <PrivateRoute user={user}>
                <MyScheduleList />
              </PrivateRoute>
            }
          />

          {/* ✅ 기타 미지정 주소 → 로그인으로 리다이렉트 */}
          {/* <Route path="*" element={<Navigate to="/login" />} /> */}
        </Routes>
>>>>>>> origin/main
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
