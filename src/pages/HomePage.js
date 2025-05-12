import React, { useState } from "react";
import Header from "../pages/Header";
import ChatBot from "../pages/ChatBot";

import "../css/style.css";
import "../css/common.css";
import "../css/profile_home.css";

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

  while (daysArray.length % 7 !== 0) {
    daysArray.push({ day: daysArray.length % 7, currentMonth: false });
  }

  return (
    <>
      <Header currentDate={currentDate} setCurrentDate={setCurrentDate} today={today} />

      <div id="container">
        <div className="wrap">
          <table>
            <thead>
              <tr>
                <th>일</th><th>월</th><th>화</th><th>수</th><th>목</th><th>금</th><th>토</th>
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
                        </td>
                      );
                    })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <ChatBot />
    </>
  );
}

export default HomePage;
