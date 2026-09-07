import React, { useEffect, useMemo, useState } from 'react';
import { Language } from '../types';

interface DeviceReadinessProps {
  lang: Language;
}

const DeviceReadiness: React.FC<DeviceReadinessProps> = ({ lang }) => {
  const [online, setOnline] = useState(() => navigator.onLine);
  const copy = lang === 'zh-HK'
    ? {
        title: '戶外使用前檢查', allReady: '裝置支援主要功能', attention: '部分功能可能受限制',
        available: '可使用', unavailable: '需要注意', note: '這裡只檢查功能是否存在；GPS 及方向權限會在你使用時才詢問。',
        items: { gps: 'GPS 定位', orientation: '方向／指南針', offline: '離線快取', network: '實時天氣網絡' },
      }
    : {
        title: 'Outdoor readiness check', allReady: 'Your device supports the main features', attention: 'Some features may be limited',
        available: 'Available', unavailable: 'Check needed', note: 'This only checks feature availability. GPS and orientation permission are requested when you use them.',
        items: { gps: 'GPS location', orientation: 'Orientation / compass', offline: 'Offline cache', network: 'Live weather connection' },
      };

  useEffect(() => {
    const onOnline = () => setOnline(true);
    const onOffline = () => setOnline(false);
    window.addEventListener('online', onOnline);
    window.addEventListener('offline', onOffline);
    return () => {
      window.removeEventListener('online', onOnline);
      window.removeEventListener('offline', onOffline);
    };
  }, []);

  const checks = useMemo(() => [
    { icon: 'fa-location-dot', label: copy.items.gps, ready: 'geolocation' in navigator },
    { icon: 'fa-compass', label: copy.items.orientation, ready: 'DeviceOrientationEvent' in window },
    { icon: 'fa-cloud-arrow-down', label: copy.items.offline, ready: 'serviceWorker' in navigator },
    { icon: 'fa-wifi', label: copy.items.network, ready: online },
  ], [copy.items, online]);
  const allReady = checks.every((check) => check.ready);

  return (
    <details className="group mt-5 rounded-2xl border border-white/10 bg-slate-900/55 text-left">
      <summary className="flex min-h-14 cursor-pointer list-none items-center gap-3 px-4 py-3 focus-visible:outline-none">
        <span className={`grid h-9 w-9 place-items-center rounded-xl ${allReady ? 'bg-emerald-500/15 text-emerald-300' : 'bg-amber-500/15 text-amber-300'}`}>
          <i className={`fas ${allReady ? 'fa-mobile-screen-button' : 'fa-triangle-exclamation'}`} />
        </span>
        <span className="min-w-0 flex-1">
          <strong className="block text-sm text-white">{copy.title}</strong>
          <span className="text-xs text-slate-400">{allReady ? copy.allReady : copy.attention}</span>
        </span>
        <i className="fas fa-chevron-down text-slate-400 transition-transform group-open:rotate-180" />
      </summary>
      <div className="grid gap-2 border-t border-white/10 p-4 sm:grid-cols-2">
        {checks.map((check) => (
          <div key={check.label} className="flex items-center gap-2 rounded-xl bg-white/5 px-3 py-2 text-sm">
            <i className={`fas ${check.icon} ${check.ready ? 'text-emerald-300' : 'text-amber-300'}`} />
            <span className="flex-1 text-slate-200">{check.label}</span>
            <span className="text-xs text-slate-400">{check.ready ? copy.available : copy.unavailable}</span>
          </div>
        ))}
        <p className="text-xs leading-5 text-slate-500 sm:col-span-2">{copy.note}</p>
      </div>
    </details>
  );
};

export default DeviceReadiness;
