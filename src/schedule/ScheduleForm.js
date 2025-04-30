import React, { useState } from "react";
import styles from "../css/ScheduleForm.module.css";

const ScheduleModal = ({ isOpen, onClose, onSave }) => {
  const [data,setData] = useState({
    title : '',
    startDate : '',
    endDate : '',
    startTime : '',
    endTime : '',
    location : '',
    memo : '',
    reminder : '',
    repeat : '',
    auth : 0,
    state : '',
    category : '',
    color : ''
  });

  const handleSubmit = () => {
    const newEvent = { data};
    onSave(newEvent);
    onClose();
  };

  const changeValue=(e)=>{
    const {name,type,value,checked} = e.target;
    setData({
        ...data,
        [name]:type==="checkbox"?checked:value
    })
}

  if (!isOpen) return null;

  return (
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
          <button onClick={onClose} className={styles.cancelButton}>취소</button>
          <button onClick={handleSubmit} className={styles.saveButton}>저장</button>
        </div>
      </div>
    </div>
  );
};

export default ScheduleModal;
