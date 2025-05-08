import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import FindPage from "./pages/FindPage";
import HomePage from "./pages/HomePage";
import MyPage from "./pages/MyPage";
import MyInfoEditPage from "./pages/MyInfoEditPage";
import MyScheduleList from "./pages/MyScheduleList";

import { AuthContext } from "./context/AuthContext";

// ✅ 로그인 체크용 보호 라우트
const PrivateRoute = ({ user, children }) => {
  // return user ? children : <Navigate to="/login" />;
  return <HomePage />;
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

  // if (loading) return <div>로딩 중...</div>;

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <BrowserRouter>
        <Routes>
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
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
