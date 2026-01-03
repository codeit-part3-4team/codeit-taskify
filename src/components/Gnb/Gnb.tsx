/**
 * @component Gnb
 * @description
 * 전역 네비게이션 바(Global Navigation Bar) 컴포넌트입니다.
 * Compound Component 패턴을 사용하여 Left, Center, Right 영역을 자유롭게 구성할 수 있습니다.
 *
 * @example
 * ```tsx
 * <Gnb>
 *   <Gnb.Left><Logo /></Gnb.Left>
 *   <Gnb.Right><UserMenu /></Gnb.Right>
 * </Gnb>
 * ```
 */

import { ReactNode } from 'react';
import styles from '@/components/Gnb/Gnb.module.css';

interface GnbMainProps {
  children: ReactNode;
  className?: string;
}

interface GnbSubComponentProps {
  children: ReactNode;
  className?: string;
}

interface GnbComponent extends React.FC<GnbMainProps> {
  Left: React.FC<GnbSubComponentProps>;
  Center: React.FC<GnbSubComponentProps>;
  Right: React.FC<GnbSubComponentProps>;
}

// 메인 컴포넌트
const Gnb: GnbComponent = ({ children, className = '' }) => {
  return (
    <header className={`${styles.gnb} ${className}`.trim()}>
      {children}
    </header>
  );
};

// 서브 컴포넌트들
Gnb.Left = ({ children, className = '' }: GnbSubComponentProps) => {
  return <div className={`${styles.left} ${className}`.trim()}>{children}</div>;
};

Gnb.Center = ({ children, className = '' }: GnbSubComponentProps) => {
  return <div className={`${styles.center} ${className}`.trim()}>{children}</div>;
};

Gnb.Right = ({ children, className = '' }: GnbSubComponentProps) => {
  return <div className={`${styles.right} ${className}`.trim()}>{children}</div>;
};


Gnb.displayName = 'Gnb';
Gnb.Left.displayName = 'Gnb.Left';
Gnb.Center.displayName = 'Gnb.Center';
Gnb.Right.displayName = 'Gnb.Right';

export default Gnb;
export type { GnbMainProps, GnbSubComponentProps };