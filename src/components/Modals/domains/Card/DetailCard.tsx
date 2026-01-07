'use client';

import { useRouter } from 'next/navigation';
import DefaultModal from '@/components/Modals/DefaultModal';
import { CardDetail } from '@/components/Card/CardUI.type';
import styles from '@/components/Modals/domains/Card/modalCard.module.css';
import DropdownMenu, { DropdownItem } from '@/components/Dropdown/dropdown-menu/dropdownmenu';
import { StatusChip } from '@/components/Chip/StatusChip';
import { TagChip } from '@/components/Chip/TagChip';
import CommentInput from '@/components/Input/domains/todo/CommentInput/CommentInput';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import {
  createComment,
  deleteComment,
  getComments,
  updateComment,
} from '@/app/dashboard/[dashboardId]/column/[columnId]/card/[cardId]/detail/cardDetail.api';
import { CommentServer } from '@/components/Input/domains/todo/TextInput/TextInput.type';
import CloseIcon from '@/assets/icons/IcX';
import IcLabel from '@/assets/icons/IcLabel';

export interface DetailCardRouteParams {
  dashboardId: number;
  columnId: number;
  cardId: number;
}

export interface DetailCardProps {
  cardData: CardDetail;
  columnTitle: string;
  routeParams: DetailCardRouteParams;
}

// UI 만들기
// 해당 하는 컴포넌트들 가져오기: DropdownMenu, StatusChip, TagChip
// 요청 데이터 --> cardData, '컬럼 title'
// 댓글 삭제하기 버튼 클릭하면, 삭제하시겠습니까? 모달 뜨게끔 바꾸기

const items: DropdownItem[] = [
  { id: 'edit', label: '수정하기' },
  { id: 'delete', label: '삭제하기', variant: 'danger' },
];

// 임시 이미지
const DUMMY_CARD_IMAGE = 'https://picsum.photos/id/1015/600/400.jpg';
const DUMMY_PROFILE_IMAGE = 'https://picsum.photos/id/1005/40/40.jpg';

export default function DetailCard({ cardData: card, columnTitle, routeParams }: DetailCardProps) {
  console.log(card.tags);

  const { dashboardId, columnId, cardId } = routeParams;

  // 임시 이미지
  const cardImageSrc = card.imageUrl ?? DUMMY_CARD_IMAGE;
  const profileImageSrc = card.assigneeProfileUrl ?? DUMMY_PROFILE_IMAGE;

  const router = useRouter();

  const [content, setContent] = useState<string>('');
  const [comments, setComments] = useState<CommentServer[]>([]);

  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [editContent, setEditContent] = useState<string>('');

  async function handleCommentSubmit() {
    if (!content.trim()) return;

    try {
      const newComment = await createComment({
        content,
        cardId,
        columnId,
        dashboardId,
      });

      setComments((prev) => [newComment, ...prev]);
      setContent('');
    } catch (error) {
      console.error('댓글 작성 실패', error);
    }
  }

  async function handleDeleteComment(commentId: number) {
    try {
      await deleteComment(commentId);
      setComments((prev) => prev.filter((c) => c.id !== commentId));
    } catch (error) {
      console.error('댓글 삭제 실패', error);
    }
  }

  async function handleUpdateComment(commentId: number) {
    if (!editContent.trim()) return;

    try {
      const updatedComment = await updateComment(commentId, editContent);

      setComments((prev) =>
        prev.map((comment) => (comment.id === commentId ? updatedComment : comment)),
      );

      setEditingCommentId(null);
      setEditContent('');
    } catch (error) {
      console.error('댓글 수정 실패', error);
    }
  }

  useEffect(() => {
    async function fetchComments() {
      try {
        const response = await getComments(cardId);
        console.log(response);
        setComments(response.comments);
      } catch (error) {
        console.error('댓글 조회 실패', error);
      }
    }

    fetchComments();
  }, [cardId]);

  const commentResponse = getComments(cardId);
  console.log(commentResponse);

  // const commentIds = commentResponse.comments.map((comment) => comment.id);
  // const comments = commentResponse.comments;

  // const handleCommentSubmit = async () => {
  //   if (!comment.trim()) return;

  //   try {
  //     await api.addComment(cardId, comment);
  //     setComment('');
  //     // 댓글 목록 새로고침
  //     fetchComments();
  //   } catch (error) {
  //     console.error('댓글 추가 실패:', error);
  //   }
  // };

  async function handleDelete(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // ✅ DELETE 요청
    // await deleteCard();
    router.refresh(); // 페이지에서 (GET) 다시 실행
    router.back();
  }

  return (
    <>
      <DefaultModal>
        <div className={styles.cardDetail}>
          <div className={styles.cardDetailBox}>
            <h4 className={styles.title}>{card.title}</h4>
            <div className={styles.cardDetailHeader}>
              <div className={styles.left}>
                <div className={styles.statusBox}>
                  <div className={styles.status}>
                    <StatusChip label={`${columnTitle}`} />
                  </div>
                  {card.tags?.length ? (
                    <ul className={styles.tags}>
                      {card.tags.map((tag) => (
                        <li key={tag}>
                          <TagChip label={tag} />
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
                <div className={styles.desciptionBox}>
                  <p className={styles.description}>{card.description}</p>
                </div>
              </div>
              <div className={styles.right}>
                <div className={styles.assigneeBox}>
                  <div className={styles.assignee}>
                    <div className={styles.assigneeTitle}>담당자</div>
                    <div className={styles.assigneeNameBox}>
                      <div className={styles.assigneeProfile}>
                        <Image
                          src={profileImageSrc}
                          alt="profileImage"
                          fill
                          style={{ objectFit: 'cover' }}
                        />
                      </div>
                      <div className={styles.assigneeName}>
                        {card.assigneeName ?? '담당자 없음'}
                      </div>
                    </div>
                  </div>
                  {card.dueDateText && (
                    <div className={styles.dueDateBox}>
                      <div className={styles.dueDateTitle}>마감일</div>
                      <div className={styles.dueDate}>{card.dueDateText}</div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className={styles.cardDetailContent}>
              <div className={styles.imageUrl}>
                <Image src={cardImageSrc} alt="cardImage" fill style={{ objectFit: 'cover' }} />
              </div>
              <div className={styles.commentInputBox}>
                <CommentInput
                  className={styles.commentInput}
                  size="large"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  onSubmit={() => handleCommentSubmit()}
                />
              </div>
              {comments.length > 0 && (
                <div className={styles.commentSection}>
                  <div className={styles.commentListBox}>
                    <ul>
                      {comments.map((comment) => (
                        <li key={comment.id} className={styles.commentBox}>
                          <div className={styles.commentUser}>
                            <Image
                              src={comment.author.profileImageUrl ?? DUMMY_PROFILE_IMAGE}
                              alt="profileImage"
                              fill
                              style={{ objectFit: 'cover' }}
                            />
                          </div>
                          <div className={styles.commentInfo}>
                            <div className={styles.infoBox}>
                              <div className={styles.nickname}>{comment.author.nickname}</div>
                              <div className={styles.createTime}>{comment.createdAt}</div>
                            </div>

                            {editingCommentId === comment.id ? (
                              <>
                                <CommentInput
                                  size="small"
                                  value={editContent}
                                  onChange={(e) => setEditContent(e.target.value)}
                                  onSubmit={() => handleUpdateComment(comment.id)}
                                />
                              </>
                            ) : (
                              <div className={styles.comment}>{comment.content}</div>
                            )}
                            <div className={styles.ButtonBox}>
                              <button
                                type="button"
                                className={styles.commentButton}
                                onClick={() => {
                                  setEditingCommentId(comment.id);
                                  setEditContent(comment.content);
                                }}
                              >
                                수정
                              </button>
                              <button
                                type="button"
                                onClick={() => handleDeleteComment(comment.id)}
                                className={styles.commentButton}
                              >
                                삭제
                              </button>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>

            <div className={styles.ButtonMenus}>
              <div className={styles.cardDetailMenu}>
                <DropdownMenu
                  items={items}
                  className={styles.ButtonMenu}
                  highlightedId="edit"
                  triggerLabel={<IcLabel />}
                  align="left"
                  onSelect={(item) => {
                    if (item.id === 'edit') {
                      router.push(`/card/${cardId}/edit`);
                    }

                    if (item.id === 'delete') {
                      router.push(`/card/${cardId}/delete-card`);
                    }
                  }}
                />
              </div>

              <div className={styles.closeButtonBox}>
                <button type="button" onClick={() => router.back()}>
                  <CloseIcon className={styles.closeButton} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </DefaultModal>
    </>
  );
}
