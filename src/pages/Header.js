import React, { useRef, useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Header({ currentDate, setCurrentDate, today }) {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [visible, setVisible] = useState(false);
  const profileRef = useRef(null);
  const menuRef = useRef(null);

  useEffect(() => {
    const showMenu = () => setVisible(true);
    const hideMenu = () => setVisible(false);

    const profile = profileRef.current;
    const menu = menuRef.current;

    profile?.addEventListener("mouseenter", showMenu);
    profile?.addEventListener("mouseleave", hideMenu);
    menu?.addEventListener("mouseenter", showMenu);
    menu?.addEventListener("mouseleave", hideMenu);

    return () => {
      profile?.removeEventListener("mouseenter", showMenu);
      profile?.removeEventListener("mouseleave", hideMenu);
      menu?.removeEventListener("mouseenter", showMenu);
      menu?.removeEventListener("mouseleave", hideMenu);
    };
  }, []);

  useEffect(() => {
    if (!user?.profile && user?.id) {
      fetch(`http://localhost:8080/member/${user.id}`, {
        credentials: "include",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data?.profile) {
            setUser((prev) => ({ ...prev, profile: data.profile }));
          }
        });
    }
  }, [user, setUser]);

  const handleLogout = async () => {
    try {
      const res = await fetch("http://localhost:8080/member/logout", {
        method: "POST",
        credentials: "include",
      });

      if (res.ok) {
        alert("로그아웃 되었습니다.");
        localStorage.removeItem("userInfo");
        navigate("/login");
      } else {
        throw new Error("로그아웃 실패");
      }
    } catch (error) {
      alert("로그아웃 중 오류 발생");
    }
  };

  return (
    <header id="header">
      <div className="wrap">
        <h1>
          <button
            onClick={() =>
              setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
            }
            className="btn-arrow prev"
          >
            이전
          </button>
          <p>{currentDate.getFullYear()}년 {currentDate.getMonth() + 1}월 {today.getDate()}일</p>
          <button
            onClick={() =>
              setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
            }
            className="btn-arrow next"
          >
            다음
          </button>
        </h1>

        <button onClick={() => setCurrentDate(today)} className="btn-basic today">오늘</button>

        <div className="util">
          <div className="util-planer">
            <select name="util-planer" defaultValue="personal">
              <option value="personal">개인 일정</option>
              <option value="group">가족 일정</option>
            </select>
          </div>
          <a href="#" className="btn-basic" data-util="setting">그룹 설정</a>
          <a href="#" className="btn-basic color" data-util="schedule">일정 등록하기</a>

          <a ref={profileRef} className="profile">
            <img
              src={
                user?.profile
                  ? `http://localhost:8080${user.profile}`
                  : "/img/profile.svg"
              }
              alt="프로필"
              className="profile-img"
            />
          </a>
          <ul
            ref={menuRef}
            className="dropdown"
            style={{ display: visible ? "block" : "none" }}
          >
            <li onClick={() => navigate("/mypage")}>마이페이지</li>
            <li onClick={handleLogout}>로그아웃</li>
          </ul>
        </div>
      </div>
    </header>
  );
}

export default Header;
