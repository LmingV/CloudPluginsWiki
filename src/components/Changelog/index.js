import React from 'react';
import styles from './styles.module.css';

const TAG = {
  new: { label: '新增', cls: styles.tNew },
  opt: { label: '优化', cls: styles.tOpt },
  fix: { label: '修复', cls: styles.tFix },
  compat: { label: '兼容', cls: styles.tCompat },
};

/**
 * entries: [{ version, date, title?, latest?, items: [[tag, text], ...] }]
 * text may contain `code` spans.
 */
function renderText(text) {
  return text.split(/(`[^`]+`)/g).map((part, i) =>
    part.startsWith('`') && part.endsWith('`') ? <code key={i}>{part.slice(1, -1)}</code> : part,
  );
}

export default function Changelog({ entries }) {
  return (
    <div className={styles.timeline}>
      {entries.map((e) => (
        <section key={e.version} className={styles.entry} id={'v' + e.version.replace(/[^0-9a-z]/gi, '-')}>
          <div className={styles.dot} />
          <header className={styles.head}>
            <span className={styles.version}>v{e.version}</span>
            {e.latest && <span className={styles.latest}>最新</span>}
            <time className={styles.date}>{e.date}</time>
          </header>
          {e.title && <h3 className={styles.title}>{e.title}</h3>}
          <ul className={styles.items}>
            {e.items.map(([tag, text], i) => (
              <li key={i}>
                <span className={`${styles.tag} ${TAG[tag].cls}`}>{TAG[tag].label}</span>
                <span>{renderText(text)}</span>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
