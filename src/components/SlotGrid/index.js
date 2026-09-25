import React, { useState } from 'react';
import styles from './styles.module.css';

/**
 * Chest-style slot map.
 * props:
 *   rows      1-6
 *   content   array of slot numbers used by content-slots (auto placement, filled in array order)
 *   buttons   { slot: 'label' }  reserved button slots
 *   fixed     { slot: 'label' }  menu-slot placements
 *   auto      { slot: 'label' }  example items that landed via automatic placement
 *   title     caption above the grid
 */
export default function SlotGrid({ rows = 6, content = [], buttons = {}, fixed = {}, auto = {}, title }) {
  const [hover, setHover] = useState(null);
  const contentSet = new Set(content);
  const order = new Map(content.map((s, i) => [s, i + 1]));
  const cells = [];
  for (let slot = 0; slot < rows * 9; slot++) {
    let kind = 'empty';
    let label = '';
    if (buttons[slot] !== undefined) { kind = 'button'; label = buttons[slot]; }
    else if (fixed[slot] !== undefined) { kind = 'fixed'; label = fixed[slot]; }
    else if (auto[slot] !== undefined) { kind = 'auto'; label = auto[slot]; }
    else if (contentSet.has(slot)) { kind = 'content'; }
    cells.push(
      <div
        key={slot}
        className={`${styles.cell} ${styles[kind]}`}
        onMouseEnter={() => setHover(slot)}
        onMouseLeave={() => setHover(null)}
      >
        <span className={styles.num}>{slot}</span>
        {label && <span className={styles.label}>{label}</span>}
      </div>,
    );
  }
  const info = hover === null ? null : (() => {
    const row = Math.floor(hover / 9) + 1;
    const col = (hover % 9) + 1;
    let what = '未使用';
    if (buttons[hover] !== undefined) what = `按钮：${buttons[hover]}（不可放时装）`;
    else if (fixed[hover] !== undefined) what = `menu-slot 固定：${fixed[hover]}`;
    else if (auto[hover] !== undefined) what = `自动排列：${auto[hover]}`;
    else if (contentSet.has(hover)) what = `content-slots 第 ${order.get(hover)} 个位置`;
    return `格位 ${hover} · 第 ${row} 排第 ${col} 格 · ${what}`;
  })();

  return (
    <figure className={styles.wrap}>
      {title && <figcaption className={styles.title}>{title}</figcaption>}
      <div className={styles.grid}>{cells}</div>
      <div className={styles.info}>{info || '把鼠标移到格子上查看格位编号'}</div>
      <div className={styles.legend}>
        <span><i className={styles.content} />content-slots（自动排列可用）</span>
        <span><i className={styles.auto} />自动排入的时装</span>
        <span><i className={styles.fixed} />menu-slot 固定</span>
        <span><i className={styles.button} />按钮（保留）</span>
        <span><i className={styles.empty} />未使用</span>
      </div>
    </figure>
  );
}
