import React, { useEffect, useState } from "react";
import "../css/style.css";
import "../css/common.css";

function MyPage() {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8080/member/mypage", {
      credentials: "include", // 세션 쿠키 포함
    })
      .then((res) => {
        if (res.status === 401) {
          alert("세션이 만료되었습니다. 다시 로그인 해주세요.");
          window.location.href = "/login"; // 로그인 페이지로 이동
          return null;
        }
        return res.json();
      })
      .then((data) => {
        if (data) {
          setUserInfo(data);
        }
      })
      .catch((err) => {
        console.error("❌ 마이페이지 정보 불러오기 실패", err);
        alert("사용자 정보를 가져오는 중 오류가 발생했습니다.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return <p>로딩 중...</p>;
  if (!userInfo) return null;

  return (
    <div className="mypage-container">
      <h2>마이페이지</h2>
      <div className="profile-box">
        <img src="/img/profile.svg" alt="프로필" className="profile-img" />
        <div className="profile-info">
          <p><strong>이메일:</strong> {userInfo.email}</p>
          <p><strong>이름:</strong> {userInfo.name}</p>
          <p><strong>가입일:</strong> {userInfo.regdate || "정보 없음"}</p>
        </div>
      </div>
    </div>
  );
}

export default MyPage;
