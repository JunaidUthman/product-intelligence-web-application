import styles from './ScoreBadge.module.css';

interface ScoreBadgeProps {
  score: number | null;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

function getScoreLevel(score: number): 'excellent' | 'good' | 'fair' | 'poor' {
  if (score >= 0.85) return 'excellent';
  if (score >= 0.65) return 'good';
  if (score >= 0.45) return 'fair';
  return 'poor';
}

function getScoreLabel(score: number): string {
  if (score >= 0.85) return 'Excellent';
  if (score >= 0.65) return 'Good';
  if (score >= 0.45) return 'Fair';
  return 'Poor';
}

export default function ScoreBadge({ score, size = 'md', showLabel = false }: ScoreBadgeProps) {
  if (score === null || score === undefined) {
    return <span className={`${styles.badge} ${styles.none}`}>N/A</span>;
  }

  const level = getScoreLevel(score);
  const label = getScoreLabel(score);
  const percentage = Math.round(score * 100);

  return (
    <div className={`${styles.wrapper} ${styles[size]}`}>
      <div className={`${styles.badge} ${styles[level]}`} title={`Score: ${percentage}/100 — ${label}`}>
        <svg className={styles.ring} viewBox="0 0 36 36">
          <circle className={styles.ringBg} cx="18" cy="18" r="15.9" />
          <circle
            className={styles.ringFill}
            cx="18" cy="18" r="15.9"
            strokeDasharray={`${percentage} 100`}
          />
        </svg>
        <span className={styles.value}>{percentage}</span>
      </div>
      {showLabel && <span className={`${styles.label} ${styles[level]}`}>{label}</span>}
    </div>
  );
}
