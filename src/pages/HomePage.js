import React, { useContext, useState, useRef, useEffect } from "react";
import Header from "../pages/Header";
import "../css/style.css";
import "../css/common.css";
import "../css/profile_home.css";
import "../css/Schedule.css";
import ScheduleForm from "../schedule/ScheduleForm";
import { LocalHostInfoContext } from "../context/LocalHostInfoContext";

function HomePage() {
  const today = new Date();
  const [currentDate, setCurrentDate] = useState(today);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startDay = firstDay.getDay();
  const totalDays = lastDay.getDate();
  const prevLastDay = new Date(year, month, 0).getDate();

  const daysArray = [];

  for (let i = startDay - 1; i >= 0; i--) {
    daysArray.push({ day: prevLastDay - i, currentMonth: false });
  }

  for (let i = 1; i <= totalDays; i++) {
    daysArray.push({ day: i, currentMonth: true });
  }

  let nextDay = 1;
  while (daysArray.length % 7 !== 0) {
    daysArray.push({ day: nextDay++, currentMonth: false });
  }

  const firstDayStr = firstDay.toISOString().split("T")[0];
  const lastDayStr = lastDay.toISOString().split("T")[0];

  const [schedules, setSchedules] = useState([]);

  useEffect(() => {
    fetch(
      `${LocalHostInfoContext.schedulePath}/api/scheduleList?firstday=${firstDayStr}&lastday=${lastDayStr}`
    )
      .then((res) => res.json())
      .then((data) => {
        setSchedules(data);
      })
      .catch((err) => {
        console.error("일정 불러오기 실패:", err);
      });
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [events, setEvents] = useState([]);
  const [no, setNo] = useState([]);

  const handleSave = (event) => {
    setEvents([...events, event]);
    console.log("일정 등록됨:", event);
  };

  return (
    <>
      <Header
        currentDate={currentDate}
        setCurrentDate={setCurrentDate}
        today={today}
      />

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
              {Array.from({ length: daysArray.length / 7 }).map(
                (_, weekIndex) => (
                  <tr key={weekIndex}>
                    {daysArray
                      .slice(weekIndex * 7, weekIndex * 7 + 7)
                      .map((date, idx) => {
                        const isToday =
                          date.currentMonth &&
                          year === today.getFullYear() &&
                          month === today.getMonth() &&
                          date.day === today.getDate();

                        let nowDate = null;
                        if (date.currentMonth) {
                          const paddedMonth = String(month + 1).padStart(2, "0");
                          const paddedDay = String(date.day).padStart(2, "0");
                          nowDate = year + "-" + paddedMonth + "-" + paddedDay;
                        }

                        return (
                          <td
                            key={idx}
                            className={`${
                              !date.currentMonth ? "disabled" : ""
                            } ${isToday ? "today" : ""}`}
                          >
                            <i className="day-number">{date.day}</i>
                            <div className="schedules">
                              {schedules.map((schedule, index) => {
                                if (
                                  nowDate >= schedule.startDate &&
                                  nowDate <= schedule.endDate
                                ) {
                                  return (
                                    <div
                                      key={index}
                                      className="schedule-item"
                                      onClick={() => {
                                        setIsModalOpen(true);
                                        setNo(schedule.no);
                                      }}
                                    >
                                      <div
                                        className="schedule-bar"
                                        style={{
                                          backgroundColor: "#1E90FF",
                                        }}
                                      >
                                        {nowDate == schedule.startDate
                                          ? schedule.title
                                          : ""}
                                      </div>
                                    </div>
                                  );
                                }
                              })}
                            </div>
                          </td>
                        );
                      })}
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      </div>

      <ScheduleForm
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        onNo={no}
      />
    </>
  );
}

export default HomePage;
