'use client';

import { useState } from 'react';
import ActionButton from '@/components/Buttons/shared/ActionButton/ActionButton';
import AddColumnButton from '@/components/Buttons/domains/dashboard/AddColumnButton/AddColumnButton';
import AddDashboardButton from '@/components/Buttons/domains/dashboard/AddDashboardButton/AddDashboardButton';
import AddTodoButton from '@/components/Buttons/domains/dashboard/AddTodoButton/AddTodoButton';
import DashboardButton from '@/components/Buttons/domains/dashboard/DashboardButton/DashboardButton';
import DeleteDashboardButton from '@/components/Buttons/domains/dashboard/DeleteDashboardButton/DeleteDashboardButton';
import LoginButton from '@/components/Buttons/domains/login/LoginButton/LoginButton';
import ModalButton from '@/components/Buttons/shared/ModalButton/ModalButton';
import PaginationButton from '@/components/Buttons/shared/PaginationButton/PaginationButton';
import TextButton from '@/components/Buttons/shared/TextButton/TextButton';
import CommentInput from '@/components/Input/domains/todo/CommentInput/CommentInput';
import DateInput from '@/components/Input/domains/todo/DateInput/DateInput';
import LoginInput from '@/components/Input/domains/login/LoginInput/LoginInput';
import TagInput from '@/components/Input/domains/todo/TagInput/TagInput';
import TextInput from '@/components/Input/domains/todo/TextInput/TextInput';
import IcX from '@/assets/icons/IcX';

export default function ComponentTestPage() {
  const [comment, setComment] = useState('');
  const [date, setDate] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [title, setTitle] = useState('');

  return (
    <div style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '40px' }}>
        컴포넌트 테스트 페이지
      </h1>

      {/* Action Buttons */}
      <section style={{ marginBottom: '60px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '20px' }}>Action Button</h2>
        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', alignItems: 'center' }}>
          <div>
            <p style={{ marginBottom: '8px', fontSize: '14px', color: '#787486' }}>
              Desktop Confirm
            </p>
            <ActionButton size="desktop" variant="confirm">
              수락
            </ActionButton>
          </div>
          <div>
            <p style={{ marginBottom: '8px', fontSize: '14px', color: '#787486' }}>Desktop Deny</p>
            <ActionButton size="desktop" variant="deny">
              거절
            </ActionButton>
          </div>
          <div>
            <p style={{ marginBottom: '8px', fontSize: '14px', color: '#787486' }}>
              Tablet Confirm
            </p>
            <ActionButton size="tablet" variant="confirm">
              수락
            </ActionButton>
          </div>
          <div>
            <p style={{ marginBottom: '8px', fontSize: '14px', color: '#787486' }}>Mobile Deny</p>
            <ActionButton size="mobile" variant="deny">
              거절
            </ActionButton>
          </div>
        </div>
      </section>

      {/* Add Column Button */}
      <section style={{ marginBottom: '60px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '20px' }}>
          Add Column Button
        </h2>
        <div style={{ display: 'flex', gap: '20px', flexDirection: 'column' }}>
          <AddColumnButton size="desktop" />
          <AddColumnButton size="tablet" />
          <AddColumnButton size="mobile" />
        </div>
      </section>

      {/* Add Dashboard Button */}
      <section style={{ marginBottom: '60px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '20px' }}>
          Add Dashboard Button
        </h2>
        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
          <AddDashboardButton size="desktop" />
          <AddDashboardButton size="tablet" />
          <AddDashboardButton size="mobile" />
        </div>
      </section>

      {/* Add Todo Button */}
      <section style={{ marginBottom: '60px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '20px' }}>
          Add Todo Button
        </h2>
        <div style={{ display: 'flex', gap: '20px', flexDirection: 'column' }}>
          <AddTodoButton size="desktop" />
          <AddTodoButton size="tablet" />
          <AddTodoButton size="mobile" />
        </div>
      </section>

      {/* Dashboard Button */}
      <section style={{ marginBottom: '60px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '20px' }}>
          Dashboard Button
        </h2>
        <div style={{ display: 'flex', gap: '20px', flexDirection: 'column' }}>
          <DashboardButton size="desktop" color="green" showCrown={true}>
            비브리지 (왕관)
          </DashboardButton>
          <DashboardButton size="tablet" color="purple" showCrown={false}>
            프로젝트 A
          </DashboardButton>
          <DashboardButton size="mobile" color="orange" showCrown={false}>
            팀 대시보드
          </DashboardButton>
          <DashboardButton size="desktop" color="blue" showCrown={false}>
            블루 프로젝트
          </DashboardButton>
          <DashboardButton size="desktop" color="pink" showCrown={false}>
            핑크 프로젝트
          </DashboardButton>
        </div>
      </section>

      {/* Delete Dashboard Button */}
      <section style={{ marginBottom: '60px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '20px' }}>
          Delete Dashboard Button
        </h2>
        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
          <DeleteDashboardButton size="desktop" />
          <DeleteDashboardButton size="tablet" />
          <DeleteDashboardButton size="mobile" />
        </div>
      </section>

      {/* Login Button */}
      <section style={{ marginBottom: '60px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '20px' }}>Login Button</h2>
        <div
          style={{
            display: 'flex',
            gap: '20px',
            flexDirection: 'column',
            alignItems: 'flex-start',
          }}
        >
          <LoginButton size="large" variant="active">
            로그인 (Large Active)
          </LoginButton>
          <LoginButton size="large" variant="inactive">
            로그인 (Large Inactive)
          </LoginButton>
          <LoginButton size="small" variant="active">
            회원가입 (Small Active)
          </LoginButton>
          <LoginButton size="small" variant="inactive">
            회원가입 (Small Inactive)
          </LoginButton>
        </div>
      </section>

      {/* Modal Button */}
      <section style={{ marginBottom: '60px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '20px' }}>Modal Button</h2>
        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
          <div>
            <p style={{ marginBottom: '8px', fontSize: '14px', color: '#787486' }}>Large</p>
            <div style={{ display: 'flex', gap: '10px' }}>
              <ModalButton variant="secondary" size="large">
                취소
              </ModalButton>
              <ModalButton variant="primary" size="large">
                확인
              </ModalButton>
            </div>
          </div>
          <div>
            <p style={{ marginBottom: '8px', fontSize: '14px', color: '#787486' }}>Small</p>
            <div style={{ display: 'flex', gap: '10px' }}>
              <ModalButton variant="secondary" size="small">
                취소
              </ModalButton>
              <ModalButton variant="primary" size="small">
                확인
              </ModalButton>
            </div>
          </div>
        </div>
      </section>

      {/* Pagination Button */}
      <section style={{ marginBottom: '60px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '20px' }}>
          Pagination Button
        </h2>
        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
          <div>
            <p style={{ marginBottom: '8px', fontSize: '14px', color: '#787486' }}>
              Large - All Active
            </p>
            <PaginationButton size="large" />
          </div>
          <div>
            <p style={{ marginBottom: '8px', fontSize: '14px', color: '#787486' }}>
              Large - Prev Disabled
            </p>
            <PaginationButton size="large" prevDisabled={true} />
          </div>
          <div>
            <p style={{ marginBottom: '8px', fontSize: '14px', color: '#787486' }}>
              Small - All Active
            </p>
            <PaginationButton size="small" />
          </div>
        </div>
      </section>

      {/* Text Button */}
      <section style={{ marginBottom: '60px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '20px' }}>Text Button</h2>
        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', alignItems: 'center' }}>
          <TextButton size="large" variant="delete">
            삭제
          </TextButton>
          <TextButton size="large" variant="comment">
            입력
          </TextButton>
          <TextButton size="small" variant="delete">
            삭제
          </TextButton>
          <TextButton size="small" variant="comment">
            입력
          </TextButton>
        </div>
      </section>

      <hr style={{ margin: '60px 0', border: 'none', borderTop: '2px solid #eeeeee' }} />

      {/* Comment Input */}
      <section style={{ marginBottom: '60px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '20px' }}>Comment Input</h2>
        <div style={{ display: 'flex', gap: '20px', flexDirection: 'column' }}>
          <CommentInput
            size="large"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            onSubmit={() => alert('댓글 제출!')}
          />
          <CommentInput
            size="small"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            onSubmit={() => alert('댓글 제출!')}
          />
        </div>
      </section>

      {/* Date Input */}
      <section style={{ marginBottom: '60px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '20px' }}>Date Input</h2>
        <DateInput
          label="마감일"
          placeholder="날짜를 입력해 주세요"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </section>

      {/* Login Input */}
      <section style={{ marginBottom: '60px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '20px' }}>Login Input</h2>
        <div style={{ display: 'flex', gap: '20px', flexDirection: 'column', maxWidth: '520px' }}>
          <LoginInput
            label="이메일"
            type="email"
            placeholder="이메일을 입력해 주세요"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <LoginInput
            label="비밀번호"
            type="password"
            placeholder="비밀번호를 입력해 주세요"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <LoginInput
            label="비밀번호 확인 (에러)"
            type="password"
            placeholder="비밀번호를 입력해 주세요"
            error="8자 이상 입력해 주세요."
          />
        </div>
      </section>

      {/* Tag Input */}
      <section style={{ marginBottom: '60px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '20px' }}>Tag Input</h2>
        <TagInput label="태그" placeholder="입력 후 Enter" tags={tags} onTagsChange={setTags} />
      </section>

      {/* Text Input */}
      <section style={{ marginBottom: '60px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '20px' }}>Text Input</h2>
        <div style={{ display: 'flex', gap: '20px', flexDirection: 'column' }}>
          <TextInput
            label="제목"
            required
            placeholder="제목을 입력해 주세요"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextInput label="설명" placeholder="설명을 입력해 주세요" />
        </div>
      </section>

      <hr style={{ margin: '60px 0', border: 'none', borderTop: '2px solid #eeeeee' }} />

      {/* X Icon */}
      <section style={{ marginBottom: '60px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '20px' }}>
          X (닫기) 아이콘
        </h2>
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center', flexWrap: 'wrap' }}>
          <div
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}
          >
            <IcX width={16} height={16} />
            <p style={{ fontSize: '12px', color: '#787486' }}>16x16</p>
          </div>
          <div
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}
          >
            <IcX width={20} height={20} />
            <p style={{ fontSize: '12px', color: '#787486' }}>20x20</p>
          </div>
          <div
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}
          >
            <IcX width={24} height={24} />
            <p style={{ fontSize: '12px', color: '#787486' }}>24x24 (기본)</p>
          </div>
          <div
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}
          >
            <IcX width={32} height={32} />
            <p style={{ fontSize: '12px', color: '#787486' }}>32x32</p>
          </div>
          <div
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}
          >
            <IcX width={24} height={24} color="#5534da" />
            <p style={{ fontSize: '12px', color: '#787486' }}>보라색</p>
          </div>
          <div
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}
          >
            <IcX width={24} height={24} color="#d6173a" />
            <p style={{ fontSize: '12px', color: '#787486' }}>빨간색</p>
          </div>
          <div
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}
          >
            <button
              style={{
                padding: '8px',
                border: '1px solid #d9d9d9',
                borderRadius: '4px',
                background: '#fff',
                cursor: 'pointer',
              }}
              onClick={() => alert('닫기!')}
            >
              <IcX width={20} height={20} />
            </button>
            <p style={{ fontSize: '12px', color: '#787486' }}>버튼 안</p>
          </div>
        </div>
      </section>
    </div>
  );
}
