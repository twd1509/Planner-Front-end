import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/MyScheduleList.css';
import Header from "../pages/Header";

const MyScheduleList = () => {
  const today = new Date();
  const navigate = useNavigate();

  const posts = [
    {
      title: '제주도 여행 계획 정리',
      createdAt: '2025-05-01',
      updatedAt: '2025-05-02',
    },
    {
      title: 'React 리팩토링 일정',
      createdAt: '2025-04-28',
      updatedAt: '2025-04-29',
    },
    {
      title: 'Spring Boot 배포 테스트',
      createdAt: '2025-04-20',
      updatedAt: '2025-04-21',
    },
  ];

  return (
    <>
      <Header currentDate={today} setCurrentDate={() => {}} today={today} />
      <div className="post-list-wrapper">
        <h2 className="post-list-title">작성한 스케쥴 목록</h2>
        <ul className="post-list">
          {posts.map((post, index) => (
            <li key={index} className="post-item">
              <div className="post-title">{post.title}</div>
              <div className="post-meta">
                <span>작성일: {post.createdAt}</span>
                <span>수정일: {post.updatedAt}</span>
              </div>
            </li>
          ))}
        </ul>

        {/* 마이페이지로 이동 버튼 */}
        <div className="btn-wrapper">
          <button className="btn-basic" onClick={() => navigate("/mypage")}>
            마이페이지로 돌아가기
          </button>
        </div>
      </div>
    </>
  );
};

export default MyScheduleList;
