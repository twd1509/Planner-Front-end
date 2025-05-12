import React, { useState, useEffect } from "react";
import styles from "../css/ScheduleForm.module.css";
import { LocalHostInfoContext } from "../context/LocalHostInfoContext";

const ScheduleModal = ({ isOpen, onClose, onSave, onNo }) => {
  
  const [data, setData] = useState({
    no: 0,
    title: "",
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
    location: "",
    memo: "",
    reminder: "",
    repeat: "",
    auth: 0,
    state: "",
    category: "",
    color: "",
    regDate: "",
  });
  
    useEffect(() => {
      if(onNo){
        
        fetch(
          `${LocalHostInfoContext.schedulePath}/api/getSchedule?no=${onNo}`
        ) // 일정 불러오는 백엔드 API 주소
        .then((res) => res.json())
        .then((info) => {
          // console.log(info);  // 실제 반환 값 확인
          setData(info); // 예: [{title, startDate, endDate, color}]
          
        })
        .catch((err) => {
          console.error("일정 불러오기 실패:", err);
        });
      }
    },[onNo]);
  const handleSubmit = () => {
    const newEvent = data;
    console.log(newEvent);
    let path = "";
    if(onNo == ""){
      path = "save";
    }else{
      path = "modify";
    }
    console.log(path);
    fetch(`${LocalHostInfoContext.schedulePath}/api/${path}`, {
      method: "POST",
      // credentials: "include", // 쿠키를 포함하도록 설정
      headers: {
        "Content-Type": "application/json", // JSON 타입 명시
      },
      body: JSON.stringify(newEvent), // 데이터를 JSON 문자열로 변환
    })
      .then((response) => {
        // 응답(Response 객체)을 처리하는 부분
        if (!response.ok) {
          throw new Error("서버 오류");
        }
        return response.json(); // JSON으로 변환 (또는 text(), blob(), etc.)
      })
      .then((data) => {
        // 위에서 response.json()이 완료된 후 실제 데이터를 다룸
        window.location.reload();
        console.log("서버 응답:", data);
        alert("성공적으로 전송되었습니다.");
      })
      .catch((error) => {
        // 오류가 발생했을 때 처리
        console.error("전송 실패:", error);
        alert("데이터 전송 실패");
      });
    onSave(newEvent);
    onClose();
  };

  const changeValue = (e) => {
    const { name, type, value, checked } = e.target;
    setData({
      ...data,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  if (!isOpen) return null;

  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.modalOverlay}>
        <div className={styles.modalContainer}>
          <h2 className={styles.modalTitle}>일정 등록</h2>

          <label className={styles.label}>제목</label>
          <input
            type="text"
            name="title"
            className={styles.input}
            value={data.title}
            onChange={(e) => changeValue(e)}
          />

          <label className={styles.label}>날짜</label>
          <input
            type="date"
            name="startDate"
            className={styles.input}
            value={data.startDate}
            onChange={(e) => changeValue(e)}
          />
          <input
            type="date"
            name="endDate"
            className={styles.input}
            value={data.endDate}
            onChange={(e) => changeValue(e)}
          />

          <label className={styles.label}>시간</label>
          <div className={styles.timeGroup}>
            <input
              type="time"
              name="startTime"
              className={styles.timeInput}
              value={data.startTime}
              onChange={(e) => changeValue(e)}
            />
            <input
              type="time"
              name="endTime"
              className={styles.timeInput}
              value={data.endTime}
              onChange={(e) => changeValue(e)}
            />
          </div>

          <label className={styles.label}>장소</label>
          <input
            type="text"
            name="location"
            className={styles.input}
            value={data.location}
            onChange={(e) => changeValue(e)}
          />

          <label className={styles.label}>메모</label>
          <textarea
            name="memo"
            className={styles.textarea}
            value={data.memo}
            onChange={(e) => changeValue(e)}
          />
          <div className={styles.formGroup}>
            <label className={styles.label}>알림설정</label>
            <input
              type="checkbox"
              name="reminder"
              value="design"
              checked={data.reminder}
              onChange={changeValue}
              id="interest1"
              className={styles.checkbox}
            />
          </div>
          <div className={styles.formGroup}>
            <select
              id="repeat"
              name="repeat"
              value={data.repeat}
              onChange={changeValue}
              className={styles.select}
            >
              <option value="반복안함">반복안함</option>
              <option value="매일">매일</option>
              <option value="주중">주중</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>공개 여부</label>
            <div className={styles.radioGroup}>
              <input
                type="radio"
                name="state"
                value="Y"
                checked={data.state === "Y"}
                onChange={changeValue}
                id="state1"
              />
              <label htmlFor="state1">공개</label>
              <input
                type="radio"
                name="state"
                value="N"
                checked={data.state === "N"}
                onChange={changeValue}
                id="state2"
              />
              <label htmlFor="state2">비공개</label>
            </div>
          </div>

          <div className={styles.buttonGroup}>
            <button onClick={onClose} className={styles.cancelButton}>
              취소
            </button>
            <button type="submit" className={styles.saveButton}>
              저장
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default ScheduleModal;
