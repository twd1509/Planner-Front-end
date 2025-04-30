import React, { useContext, useState, useRef, useEffect } from "react"; // useRef, useEffect 추가
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "../css/style.css";
import "../css/common.css";
import ScheduleForm from "../schedule/ScheduleForm";


function HomePage() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const today = new Date();
  const [currentDate, setCurrentDate] = useState(today);

  const [visible, setVisible] = useState(false); // dropdown 보이기 상태
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

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth(); // 0부터 시작
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  const startDay = firstDay.getDay(); // 월의 시작 요일 (0:일 ~ 6:토)
  const totalDays = lastDay.getDate(); // 이번달 총 일 수

  // 이전달 마지막 날
  const prevLastDay = new Date(year, month, 0).getDate();

  // 날짜 배열 만들기 (이전달 + 이번달 + 다음달 빈칸 포함)
  const daysArray = [];

  // 1. 이번달 시작 전, 이전달 날짜 채우기
  for (let i = startDay - 1; i >= 0; i--) {
    daysArray.push({
      day: prevLastDay - i,
      currentMonth: false, // 이전달
    });
  }

  // 2. 이번달 날짜
  for (let i = 1; i <= totalDays; i++) {
    daysArray.push({
      day: i,
      currentMonth: true, // 이번달
    });
  }

  // 3. 끝나고 다음달 날짜 채우기 (7의 배수로 맞추기 위해)
  while (daysArray.length % 7 !== 0) {
    daysArray.push({
      day: daysArray.length % 7,
      currentMonth: false, // 다음달
    });
  }

  // 일정 등록
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [events, setEvents] = useState([]);

  const handleSave = (event) => {
    setEvents([...events, event]);
    console.log("일정 등록됨:", event);
  };
  
  return (
    <>
      {/* 헤더 */}
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
            <a href="#" onClick={() => setIsModalOpen(true)} className="btn-basic color" data-util="schedule">일정 등록하기</a>

            {/* 일정 등록 폼 */}
            <ScheduleForm
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              onSave={handleSave}
            />

            {/* ✅ 프로필 및 드롭다운 메뉴 */}
            <a href="#" ref={profileRef} className="profile"></a>
            <ul
              ref={menuRef}
              className="dropdown"
              style={{ display: visible ? "block" : "none" }}
            >
              <li onClick={() => navigate("/mypage")}>마이페이지</li>
              <li onClick={() => navigate("/setting")}>설정</li>
              <li onClick={() => navigate("/logout")}>로그아웃</li>
            </ul>
          </div>
        </div>
      </header>

      {/* 캘린더 */}
      <div id="container">
        <div className="wrap">
          <table>
            <thead>
              <tr>
                <th>일</th>
                <th>월</th>
                <th>화</th>
                <th>수</th>
                <th>목</th>
                <th>금</th>
                <th>토</th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: daysArray.length / 7 }).map((_, weekIndex) => (
                <tr key={weekIndex}>
                  {daysArray
                    .slice(weekIndex * 7, weekIndex * 7 + 7)
                    .map((date, idx) => {
                      const isToday =
                        date.currentMonth &&
                        year === today.getFullYear() &&
                        month === today.getMonth() &&
                        date.day === today.getDate();

                      return (
                        <td
                          key={idx}
                          className={`${!date.currentMonth ? "disabled" : ""} ${isToday ? "today" : ""}`}
                        >
                          <i>{date.day}</i>
                          {/* ✨ 이벤트 샘플 추가하고 싶으면 여기에 */}
                          {/* {date.day === 28 && date.currentMonth && (
                            <div className="event" data-color="blue">
                              개인 일정 제목입니다.
                            </div>
                          )} */}
                        </td>
                      );
                    })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default HomePage;
