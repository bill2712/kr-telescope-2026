import React, { useEffect, useMemo, useState } from 'react';
import { Language } from '../types';

interface InstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

interface InstallAppPromptProps {
  lang: Language;
  visible?: boolean;
}

const InstallAppPrompt: React.FC<InstallAppPromptProps> = ({ lang, visible = true }) => {
  const [installPrompt, setInstallPrompt] = useState<InstallPromptEvent | null>(null);
  const [isOnline, setIsOnline] = useState(() => navigator.onLine);
  const [isInstalled, setIsInstalled] = useState(() => window.matchMedia('(display-mode: standalone)').matches);
  const [showIosHelp, setShowIosHelp] = useState(false);
  const [dismissed, setDismissed] = useState(() => {
    try {
      return localStorage.getItem('kr_telescope_install_prompt_dismissed') === 'true';
    } catch {
      return false;
    }
  });
  const isIos = useMemo(() => /iphone|ipad|ipod/i.test(navigator.userAgent), []);
  const copy = lang === 'zh-HK'
    ? {
        title: '安裝離線版', desc: '加入主畫面，戶外開啟更快；已瀏覽內容及最近天氣可在斷線時繼續查看。', install: '安裝',
        ios: '按 Safari 分享按鈕，再選「加入主畫面」。', close: '暫時不要', offline: '離線模式：天氣可能不是最新資料',
      }
    : {
        title: 'Install for offline use', desc: 'Add it to your home screen for faster outdoor access. Viewed content and recent weather remain available offline.', install: 'Install',
        ios: 'In Safari, select Share, then Add to Home Screen.', close: 'Not now', offline: 'Offline mode: weather data may not be current',
      };

  useEffect(() => {
    const onBeforeInstall = (event: Event) => {
      event.preventDefault();
      setInstallPrompt(event as InstallPromptEvent);
    };
    const onInstalled = () => {
      setIsInstalled(true);
      setInstallPrompt(null);
    };
    const onOnline = () => setIsOnline(true);
    const onOffline = () => setIsOnline(false);
    window.addEventListener('beforeinstallprompt', onBeforeInstall);
    window.addEventListener('appinstalled', onInstalled);
    window.addEventListener('online', onOnline);
    window.addEventListener('offline', onOffline);
    return () => {
      window.removeEventListener('beforeinstallprompt', onBeforeInstall);
      window.removeEventListener('appinstalled', onInstalled);
      window.removeEventListener('online', onOnline);
      window.removeEventListener('offline', onOffline);
    };
  }, []);

  const close = () => {
    setDismissed(true);
    try {
      localStorage.setItem('kr_telescope_install_prompt_dismissed', 'true');
    } catch {
      // Dismissing for this visit is enough when storage is unavailable.
    }
  };

  const install = async () => {
    if (isIos && !installPrompt) {
      setShowIosHelp(true);
      return;
    }
    if (!installPrompt) return;
    await installPrompt.prompt();
    const choice = await installPrompt.userChoice;
    if (choice.outcome === 'accepted') setInstallPrompt(null);
  };

  if (!visible) return null;

  return (
    <>
      {!isOnline && (
        <div role="status" className="fixed bottom-3 left-3 z-[190] flex min-h-11 items-center gap-2 rounded-xl border border-amber-300/30 bg-slate-950/95 px-4 text-sm font-bold text-amber-100 shadow-xl">
          <i className="fas fa-wifi" aria-hidden="true" /> {copy.offline}
        </div>
      )}
      {!dismissed && !isInstalled && (installPrompt || isIos) && (
        <aside className="fixed inset-x-3 bottom-3 z-[180] mx-auto max-w-xl rounded-2xl border border-cyan-400/30 bg-slate-950/95 p-4 shadow-2xl backdrop-blur-xl" aria-labelledby="install-app-title">
          <div className="flex items-start gap-3">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-cyan-500/15 text-cyan-300"><i className="fas fa-download" /></span>
            <div className="min-w-0 flex-1">
              <h2 id="install-app-title" className="font-black text-white">{copy.title}</h2>
              <p className="mt-1 text-sm leading-5 text-slate-300">{showIosHelp ? copy.ios : copy.desc}</p>
              <button type="button" onClick={install} className="mt-3 min-h-11 rounded-xl bg-cyan-500 px-4 text-sm font-black text-slate-950 hover:bg-cyan-400">
                <i className={`fas ${isIos && !installPrompt ? 'fa-share-from-square' : 'fa-download'} mr-2`} />{copy.install}
              </button>
            </div>
            <button type="button" onClick={close} aria-label={copy.close} className="grid h-11 w-11 shrink-0 place-items-center rounded-xl text-slate-300 hover:bg-white/10"><i className="fas fa-xmark" /></button>
          </div>
        </aside>
      )}
    </>
  );
};

export default InstallAppPrompt;
