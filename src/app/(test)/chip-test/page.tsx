// app/(test)/chip-test/page.tsx
'use client';

import { useState } from 'react';
import { ColorChip, DASHBOARD_COLORS } from '@/components/Chip/ColorChip';
import { AddChip } from '@/components/Chip/AddChip';
import { CountChip } from '@/components/Chip/CountChip';
import { StatusChip } from '@/components/Chip/StatusChip';
import { TagChip, TAG_COLORS } from '@/components/Chip/TagChip';
import styles from './page.module.css';

export default function ChipTestPage() {
  const [selectedColor, setSelectedColor] = useState(DASHBOARD_COLORS[0]);
  const [addClickCount, setAddClickCount] = useState(0);
  const [tags, setTags] = useState(['프로젝트', '백엔드', 'Next.js']);

  const handleDeleteTag = (tagToDelete: string) => {
    setTags(tags.filter(tag => tag !== tagToDelete));
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Chip 컴포넌트 테스트</h1>

      {/* 1. ColorChip - Small */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>1. ColorChip - Small (8px)</h2>
        <div className={styles.chipGroup}>
          {DASHBOARD_COLORS.map((color) => (
            <div key={color} className={styles.chipItem}>
              <ColorChip color={color} size="small" />
              <span className={styles.colorLabel}>{color}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 2. ColorChip - Medium */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>2. ColorChip - Medium (30px)</h2>
        <div className={styles.chipGroup}>
          {DASHBOARD_COLORS.map((color) => (
            <div key={color} className={styles.chipItem}>
              <ColorChip color={color} size="medium" />
              <span className={styles.colorLabel}>{color}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 3. ColorChip - 선택 가능 */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>
          3. ColorChip - 선택 가능 (선택된 색상: {selectedColor})
        </h2>
        <div className={styles.chipGroup}>
          {DASHBOARD_COLORS.map((color) => (
            <ColorChip
              key={color}
              color={color}
              size="medium"
              selected={selectedColor === color}
              onClick={() => setSelectedColor(color)}
            />
          ))}
        </div>
      </section>

      {/* 4. ColorChip - Custom 크기 */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>4. ColorChip - Custom 크기</h2>
        <div className={styles.chipGroup}>
          <div className={styles.chipItem}>
            <ColorChip color="#7AC555" size="custom" customSize={20} />
            <span className={styles.colorLabel}>20px</span>
          </div>
          <div className={styles.chipItem}>
            <ColorChip color="#760DDE" size="custom" customSize={40} />
            <span className={styles.colorLabel}>40px</span>
          </div>
          <div className={styles.chipItem}>
            <ColorChip color="#FFA500" size="custom" customSize={50} />
            <span className={styles.colorLabel}>50px</span>
          </div>
        </div>
      </section>

      {/* 5. AddChip - 크기 비교 */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>5. AddChip - 크기 비교</h2>
        <div className={styles.chipGroup}>
          <div className={styles.chipItem}>
            <AddChip 
              size="small" 
              onClick={() => setAddClickCount(addClickCount + 1)} 
            />
            <span className={styles.colorLabel}>Small (20px)</span>
          </div>
          <div className={styles.chipItem}>
            <AddChip 
              size="large" 
              onClick={() => setAddClickCount(addClickCount + 1)} 
            />
            <span className={styles.colorLabel}>Large (22px)</span>
          </div>
        </div>
      </section>

      {/* 6. AddChip - 인터랙션 */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>
          6. AddChip - 인터랙션 (클릭 횟수: {addClickCount})
        </h2>
        <div className={styles.chipGroup}>
          <div className={styles.chipItem}>
            <AddChip 
              onClick={() => setAddClickCount(addClickCount + 1)} 
            />
            <span className={styles.colorLabel}>클릭 가능</span>
          </div>
          <div className={styles.chipItem}>
            <AddChip 
              onClick={() => {}} 
              disabled={true} 
            />
            <span className={styles.colorLabel}>Disabled</span>
          </div>
        </div>
      </section>

      {/* 7. CountChip - 할 일 개수 */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>7. CountChip - 할 일 개수</h2>
        <div className={styles.chipGroup}>
          <div className={styles.chipItem}>
            <CountChip count={3} />
            <span className={styles.colorLabel}>3개</span>
          </div>
          <div className={styles.chipItem}>
            <CountChip count={0} />
            <span className={styles.colorLabel}>0개</span>
          </div>
          <div className={styles.chipItem}>
            <CountChip count={12} />
            <span className={styles.colorLabel}>12개</span>
          </div>
          <div className={styles.chipItem}>
            <CountChip count={999} />
            <span className={styles.colorLabel}>999개</span>
          </div>
        </div>
      </section>

      {/* 8. StatusChip - 상태 표시 */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>8. StatusChip - 상태 표시</h2>
        <div className={styles.chipGroup}>
          <StatusChip label="To Do" />
          <StatusChip label="On Progress" />
          <StatusChip label="Done" />
          <StatusChip label="real" />
          <StatusChip label="테스트 중" />
        </div>
      </section>

      {/* 9. TagChip - 해시 기반 색상 */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>9. TagChip - 해시 기반 색상 (일관성 테스트)</h2>
        <div className={styles.chipGroup}>
          <TagChip label="프로젝트" />
          <TagChip label="백엔드" />
          <TagChip label="프론트엔드" />
          <TagChip label="Next.js" />
          <TagChip label="TypeScript" />
          <TagChip label="디자인" />
          <TagChip label="기획" />
          <TagChip label="마케팅" />
        </div>
      </section>

      {/* 10. TagChip - 같은 태그 반복 (색상 일관성 확인) */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>10. TagChip - 같은 태그 반복 (항상 같은 색)</h2>
        <div className={styles.chipGroup}>
          <TagChip label="프로젝트" />
          <TagChip label="프로젝트" />
          <TagChip label="프로젝트" />
        </div>
        <div className={styles.chipGroup} style={{ marginTop: '12px' }}>
          <TagChip label="백엔드" />
          <TagChip label="백엔드" />
          <TagChip label="백엔드" />
        </div>
      </section>

      {/* 11. TagChip - 전체 색상 팔레트 */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>11. TagChip - 전체 색상 팔레트 (8가지)</h2>
        <div className={styles.chipGroup}>
          {TAG_COLORS.map((color, index) => (
            <div key={index} className={styles.chipItem}>
              <TagChip 
                label={`색상 ${index + 1}`}
                color={color}
              />
              <span className={styles.colorLabel}>
                {color.bg} / {color.text}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* 12. TagChip - 삭제 가능 (동적) */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>
          12. TagChip - 삭제 가능 (현재 태그: {tags.join(', ')})
        </h2>
        <div className={styles.chipGroup}>
          {tags.map((tag) => (
            <TagChip 
              key={tag}
              label={tag} 
              onDelete={() => handleDeleteTag(tag)}
            />
          ))}
        </div>
        {tags.length === 0 && (
          <p style={{ color: '#999', fontSize: '14px' }}>
            모든 태그가 삭제되었습니다.
          </p>
        )}
      </section>

      {/* 13. 전체 조합 */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>13. 전체 Chip 조합</h2>
        <div className={styles.grid}>
          <div className={styles.gridItem}>
            <p>ColorChip Small</p>
            <ColorChip color="#7AC555" size="small" />
          </div>
          <div className={styles.gridItem}>
            <p>ColorChip Medium</p>
            <ColorChip color="#7AC555" size="medium" />
          </div>
          <div className={styles.gridItem}>
            <p>AddChip</p>
            <AddChip onClick={() => alert('추가!')} />
          </div>
          <div className={styles.gridItem}>
            <p>CountChip</p>
            <CountChip count={5} />
          </div>
          <div className={styles.gridItem}>
            <p>StatusChip</p>
            <StatusChip label="To Do" />
          </div>
          <div className={styles.gridItem}>
            <p>TagChip</p>
            <TagChip label="프로젝트" />
          </div>
        </div>
      </section>
    </div>
  );
}