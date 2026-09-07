import React, { useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { Language } from '../types';
import { exportCanvasAsPdf } from '../utils/exportPdf';

export interface ObservationConditions {
  district: string;
  temperature: string | number;
  humidity: string | number;
  score: number;
  moonPhase: string;
  weatherSummary: string;
  suggestedTargets: string[];
}

interface ObservationJournalProps {
  lang: Language;
  conditions: ObservationConditions;
  onClose: () => void;
  onExported?: () => void;
}

interface ObservationRecord {
  id: number;
  observer: string;
  date: string;
  target: string;
  equipment: string;
  notes: string;
  conditions: ObservationConditions;
}

const STORAGE_KEY = 'kr_telescope_observation_records';

const readRecords = (): ObservationRecord[] => {
  try {
    const value = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    return Array.isArray(value) ? value.slice(0, 5) : [];
  } catch {
    return [];
  }
};

const drawWrappedText = (ctx: CanvasRenderingContext2D, text: string, x: number, y: number, maxWidth: number, lineHeight: number, maxLines: number) => {
  const characters = Array.from(text || '—');
  let line = '';
  let lineIndex = 0;
  for (const character of characters) {
    const candidate = line + character;
    if (ctx.measureText(candidate).width > maxWidth && line) {
      ctx.fillText(line, x, y + lineIndex * lineHeight);
      line = character;
      lineIndex += 1;
      if (lineIndex >= maxLines) return;
    } else {
      line = candidate;
    }
  }
  if (line && lineIndex < maxLines) ctx.fillText(line, x, y + lineIndex * lineHeight);
};

const ObservationJournal: React.FC<ObservationJournalProps> = ({ lang, conditions, onClose, onExported }) => {
  const isZh = lang === 'zh-HK';
  const copy = isZh ? {
    title: '我的觀星紀錄', subtitle: '天氣資料會自動加入；填好實際觀察後可直接下載 A4 PDF。', observer: '觀察者', date: '觀察日期',
    target: '觀察目標', equipment: '器材／倍率', notes: '我看見甚麼？', notesHint: '記下形狀、顏色、亮度、位置或任何疑問…',
    conditions: '觀察條件', score: '觀星指數', temp: '溫度', humidity: '濕度', moon: '月相', location: '地點',
    export: '儲存並匯出 PDF', exporting: '正在製作 PDF…', close: '關閉', recent: '最近紀錄', none: '尚未有已儲存紀錄', saved: 'PDF 已下載，紀錄亦已儲存在此裝置。',
    reportTitle: 'KidRise 觀星紀錄', checklist: '觀察步驟', checklistItems: ['先用肉眼定位目標', '使用低倍率開始', '穩定腳架後再對焦', '完成後收好鏡片及配件'], footer: 'KidRise Science · Astronomy Observation Journal',
  } : {
    title: 'My Stargazing Log', subtitle: 'Weather data is added automatically. Record what you saw, then download an A4 PDF.', observer: 'Observer', date: 'Observation date',
    target: 'Target', equipment: 'Equipment / magnification', notes: 'What did I see?', notesHint: 'Record shape, colour, brightness, position or any questions…',
    conditions: 'Observing conditions', score: 'Stargazing score', temp: 'Temperature', humidity: 'Humidity', moon: 'Moon phase', location: 'Location',
    export: 'Save and export PDF', exporting: 'Creating PDF…', close: 'Close', recent: 'Recent records', none: 'No saved records yet', saved: 'PDF downloaded and this record was saved on this device.',
    reportTitle: 'KidRise Stargazing Log', checklist: 'Observation checklist', checklistItems: ['Locate the target with your eyes', 'Begin with low magnification', 'Stabilise the tripod, then focus', 'Pack lenses and accessories safely'], footer: 'KidRise Science · Astronomy Observation Journal',
  };
  const today = useMemo(() => new Date().toLocaleDateString('en-CA', { timeZone: 'Asia/Hong_Kong' }), []);
  const targets = [isZh ? '月球' : 'Moon', ...conditions.suggestedTargets, isZh ? '其他' : 'Other'];
  const [observer, setObserver] = useState('');
  const [date, setDate] = useState(today);
  const [target, setTarget] = useState(targets[0]);
  const [equipment, setEquipment] = useState(isZh ? '低倍率望遠鏡' : 'Low-power telescope');
  const [notes, setNotes] = useState('');
  const [records, setRecords] = useState<ObservationRecord[]>(readRecords);
  const [isExporting, setIsExporting] = useState(false);
  const [saved, setSaved] = useState(false);

  const createReportCanvas = async () => {
    await document.fonts?.ready;
    const canvas = document.createElement('canvas');
    canvas.width = 1240;
    canvas.height = 1754;
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Canvas is unavailable');
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = '#dbeafe';
    ctx.lineWidth = 1;
    for (let x = 0; x < canvas.width; x += 50) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke(); }
    for (let y = 0; y < canvas.height; y += 50) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke(); }

    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, canvas.width, 180);
    ctx.fillStyle = '#67e8f9';
    ctx.font = "700 58px 'Noto Sans TC', sans-serif";
    ctx.fillText(copy.reportTitle, 70, 95);
    ctx.fillStyle = '#cbd5e1';
    ctx.font = "24px 'Noto Sans TC', sans-serif";
    ctx.fillText(`${copy.date}: ${date}`, 72, 140);

    const field = (label: string, value: string, x: number, y: number, width = 500) => {
      ctx.fillStyle = '#475569';
      ctx.font = "700 22px 'Noto Sans TC', sans-serif";
      ctx.fillText(label, x, y);
      ctx.fillStyle = '#0f172a';
      ctx.font = "700 30px 'Noto Sans TC', sans-serif";
      drawWrappedText(ctx, value || '—', x, y + 42, width, 38, 2);
    };
    field(copy.observer, observer.trim(), 70, 245);
    field(copy.target, target, 660, 245);
    field(copy.equipment, equipment.trim(), 70, 365, 1080);

    ctx.fillStyle = '#e0f2fe';
    ctx.fillRect(60, 490, 1120, 330);
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 3;
    ctx.strokeRect(60, 490, 1120, 330);
    ctx.fillStyle = '#075985';
    ctx.font = "700 30px 'Noto Sans TC', sans-serif";
    ctx.fillText(copy.conditions, 95, 550);
    const conditionLines = [
      `${copy.location}: ${conditions.district}`,
      `${copy.score}: ${conditions.score}/100 · ${conditions.weatherSummary}`,
      `${copy.temp}: ${conditions.temperature}°C · ${copy.humidity}: ${conditions.humidity}%`,
      `${copy.moon}: ${conditions.moonPhase}`,
    ];
    ctx.fillStyle = '#164e63';
    ctx.font = "26px 'Noto Sans TC', sans-serif";
    conditionLines.forEach((line, index) => ctx.fillText(line, 95, 610 + index * 50));

    ctx.fillStyle = '#ffffff';
    ctx.fillRect(60, 875, 1120, 460);
    ctx.strokeStyle = '#cbd5e1';
    ctx.strokeRect(60, 875, 1120, 460);
    ctx.fillStyle = '#334155';
    ctx.font = "700 30px 'Noto Sans TC', sans-serif";
    ctx.fillText(copy.notes, 95, 940);
    ctx.font = "28px 'Noto Sans TC', sans-serif";
    drawWrappedText(ctx, notes.trim(), 95, 1000, 1040, 46, 7);

    ctx.fillStyle = '#fef3c7';
    ctx.fillRect(60, 1380, 1120, 260);
    ctx.fillStyle = '#92400e';
    ctx.font = "700 28px 'Noto Sans TC', sans-serif";
    ctx.fillText(copy.checklist, 95, 1435);
    ctx.font = "23px 'Noto Sans TC', sans-serif";
    copy.checklistItems.forEach((item, index) => ctx.fillText(`□ ${item}`, 95 + (index % 2) * 535, 1490 + Math.floor(index / 2) * 58));
    ctx.fillStyle = '#64748b';
    ctx.font = "20px 'Noto Sans TC', sans-serif";
    ctx.textAlign = 'center';
    ctx.fillText(copy.footer, canvas.width / 2, 1710);
    return canvas;
  };

  const handleExport = async () => {
    setIsExporting(true);
    setSaved(false);
    try {
      const canvas = await createReportCanvas();
      await exportCanvasAsPdf(canvas, `KidRise-Stargazing-Log-${date}-${Date.now()}.pdf`, copy.reportTitle);
      const record: ObservationRecord = { id: Date.now(), observer: observer.trim(), date, target, equipment: equipment.trim(), notes: notes.trim(), conditions };
      const next = [record, ...records].slice(0, 20);
      setRecords(next);
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch { /* PDF export remains available. */ }
      setSaved(true);
      onExported?.();
    } catch (error) {
      console.error('PDF export failed:', error);
      alert(isZh ? 'PDF 匯出失敗，請再試一次。' : 'PDF export failed. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  return createPortal(
    <div role="dialog" aria-modal="true" aria-labelledby="observation-journal-title" className="fixed inset-0 z-[240] overflow-y-auto bg-slate-950/95 p-4 backdrop-blur-md sm:p-8">
      <div className="mx-auto max-w-4xl rounded-3xl border border-cyan-400/20 bg-[#161825] p-5 text-white shadow-2xl sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <div><p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-300">PDF</p><h2 id="observation-journal-title" className="mt-1 text-3xl font-black">{copy.title}</h2><p className="mt-2 text-sm leading-6 text-slate-300">{copy.subtitle}</p></div>
          <button type="button" onClick={onClose} className="grid min-h-11 min-w-11 place-items-center rounded-xl bg-white/10 text-xl" aria-label={copy.close}>×</button>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <label className="text-sm font-bold text-slate-300">{copy.observer}<input value={observer} onChange={(e) => setObserver(e.target.value)} maxLength={40} className="mt-2 min-h-12 w-full rounded-xl border border-white/10 bg-black/30 px-4 text-white outline-none focus:border-cyan-400" /></label>
          <label className="text-sm font-bold text-slate-300">{copy.date}<input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="mt-2 min-h-12 w-full rounded-xl border border-white/10 bg-black/30 px-4 text-white outline-none focus:border-cyan-400" /></label>
          <label className="text-sm font-bold text-slate-300">{copy.target}<select value={target} onChange={(e) => setTarget(e.target.value)} className="mt-2 min-h-12 w-full rounded-xl border border-white/10 bg-[#101221] px-4 text-white outline-none focus:border-cyan-400">{targets.map((item) => <option key={item}>{item}</option>)}</select></label>
          <label className="text-sm font-bold text-slate-300">{copy.equipment}<input value={equipment} onChange={(e) => setEquipment(e.target.value)} maxLength={80} className="mt-2 min-h-12 w-full rounded-xl border border-white/10 bg-black/30 px-4 text-white outline-none focus:border-cyan-400" /></label>
          <label className="text-sm font-bold text-slate-300 sm:col-span-2">{copy.notes}<textarea value={notes} onChange={(e) => setNotes(e.target.value)} maxLength={500} rows={5} placeholder={copy.notesHint} className="mt-2 w-full resize-none rounded-xl border border-white/10 bg-black/30 p-4 text-white outline-none focus:border-cyan-400" /></label>
        </div>
        <div className="mt-5 grid grid-cols-2 gap-2 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm sm:grid-cols-4">
          <span><b className="block text-cyan-300">{copy.score}</b>{conditions.score}/100</span><span><b className="block text-cyan-300">{copy.temp}</b>{conditions.temperature}°C</span><span><b className="block text-cyan-300">{copy.humidity}</b>{conditions.humidity}%</span><span><b className="block text-cyan-300">{copy.moon}</b>{conditions.moonPhase}</span>
        </div>
        {saved && <p role="status" className="mt-4 rounded-xl bg-emerald-500/15 p-3 text-sm font-bold text-emerald-200">✓ {copy.saved}</p>}
        <button type="button" onClick={handleExport} disabled={isExporting} className="mt-5 min-h-14 w-full rounded-2xl bg-cyan-400 px-5 text-lg font-black text-slate-950 shadow-lg disabled:opacity-60"><i className="fas fa-file-pdf mr-2" />{isExporting ? copy.exporting : copy.export}</button>
        <section className="mt-7 border-t border-white/10 pt-5"><h3 className="font-black text-white">{copy.recent}</h3>{records.length === 0 ? <p className="mt-2 text-sm text-slate-500">{copy.none}</p> : <ul className="mt-3 grid gap-2 sm:grid-cols-2">{records.slice(0, 4).map((record) => <li key={record.id} className="rounded-xl bg-white/5 p-3 text-sm"><b className="text-cyan-200">{record.target}</b><span className="ml-2 text-slate-400">{record.date}</span></li>)}</ul>}</section>
      </div>
    </div>,
    document.body,
  );
};

export default ObservationJournal;
