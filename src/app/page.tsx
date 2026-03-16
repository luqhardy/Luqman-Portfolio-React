"use client";

import Image from "next/image";
//import ThreeDObjectClient from "./ThreeDObjectClient";
import React, { useState, useEffect } from "react";
import Icon from '@mdi/react';
import { mdiLinkedin } from '@mdi/js';
import { mdiGithub } from '@mdi/js';
import { mdiEmail } from '@mdi/js';
import { Analytics } from "@vercel/analytics/react";
//import LiquidGlass from "liquid-glass-react";




function ClickableEmailSubtitle({ text }: { text: string }) {
  const emailRegex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/;
  const match = text.match(emailRegex);
  if (!match) {
    return <span className="font-light text-xs leading-snug" style={{ whiteSpace: 'pre-line' }}>{text}</span>;
  }
  const email = match[0];
  const parts = text.split(email);
  const beforeText = parts[0];
  const afterText = parts[1] || '';
  return (
    <span className="font-light text-xs leading-snug" style={{ whiteSpace: 'pre-line' }}>
      {beforeText}
      <a href={`mailto:${email}`} className="text-blue-400 hover:underline">
        {email}
      </a>
      {afterText}
    </span>
  );
}

function Home() {
  // Theme state: 'system', 'light', 'dark'
  const [theme, setTheme] = useState<'system' | 'light' | 'dark'>('system');
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('light');
  // Language state
  const [language, setLanguage] = useState<'ja' | 'en'>('ja');

  // Theme effect: detect system theme and apply override
  useEffect(() => {
    // On mount, check localStorage for theme override
    try {
      const stored = localStorage.getItem('theme-override');
      if (stored === 'light' || stored === 'dark') {
        setTheme(stored);
      }
    } catch (_) { /* localStorage not available (SSR/Turbopack) */ }
  }, []);

  useEffect(() => {
    // Listen for system theme changes
    try {
      const mq = window.matchMedia('(prefers-color-scheme: dark)');
      const updateTheme = () => {
        if (theme === 'system') {
          setResolvedTheme(mq.matches ? 'dark' : 'light');
        }
      };
      mq.addEventListener('change', updateTheme);
      updateTheme();
      return () => mq.removeEventListener('change', updateTheme);
    } catch (_) { /* window not available (SSR/Turbopack) */ }
  }, [theme]);

  useEffect(() => {
    // Apply theme override
    try {
      if (theme === 'system') {
        const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setResolvedTheme(isDark ? 'dark' : 'light');
        localStorage.removeItem('theme-override');
      } else {
        setResolvedTheme(theme);
        localStorage.setItem('theme-override', theme);
      }
      // Set html class for Tailwind
      if (resolvedTheme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } catch (_) { /* window/localStorage/document not available (SSR/Turbopack) */ }
  }, [theme, resolvedTheme]);

  const content = {
    ja: {
      name: "ルクマン　ハディ",
      subtitle: "文部科学省国費外国人留学生　神戸電子専門学校\nAIシステム開発学科　1年生\n 株式会社ワオナス・一般社団法人クラウディス\nパート社員\n関西大学 JASSO交換留学生 2023-2024\nマレーシア出身 神戸市在住\nメール: hello@luqmanhadi.com",
      main: "Luqman Hadi"
    },
    en: {
      name: "ルクマン　ハディ",
      subtitle: "Japanese Government (MEXT) Scholar, Kobe Institute of Computing\nAI Systems Development, 1st Year\n Wownas Co., Ltd. Freelance Staff\n Kansai University JASSO Exchange Student 2023-2024\nMalaysian, based in Kobe City, Hyogo Pref, Japan\nContact: hello@luqmanhadi.com",
      main: "Luqman Hadi"
    }
  };
  const buttons = {
    ja: {
      0: "/jp/0.png",
      1: "/jp/pr.png",
      2: "/jp/blog.png",
      3: "/jp/voca.png",
      4: "/jp/1.png",
      5: "/jp/2.png",
      6: "/jp/3.png",
      7: "/jp/4.png",
      8: "/jp/5.png",
      9: "/jp/6.png",
    },
    en: {
      0: "/en/0.png",
      1: "/en/pr.png",
      2: "/en/blog.png",
      3: "/en/voca.png",
      4: "/en/1.png",
      5: "/en/2.png",
      6: "/en/3.png",
      7: "/en/4.png",
      8: "/en/5.png",
      9: "/en/6.png",
    },
  };

  return (
    <>
      <Analytics/>
      <div className={`relative overflow-hidden flex flex-col items-center justify-center min-h-screen transition-colors duration-300 ${resolvedTheme === 'dark' ? 'bg-black' : 'bg-white'}`}>
        {/* Shadcn Grid Background */}
        <div 
          className="absolute inset-0 z-0 pointer-events-none animate-grid-movement"
          style={{
            backgroundSize: '40px 40px',
            backgroundImage: resolvedTheme === 'dark' 
              ? 'linear-gradient(to right, rgba(255,255,255,0.15) 2px, transparent 2px), linear-gradient(to bottom, rgba(255,255,255,0.15) 2px, transparent 2px)' 
              : 'linear-gradient(to right, rgba(0,0,0,0.1) 2px, transparent 2px), linear-gradient(to bottom, rgba(0,0,0,0.1) 2px, transparent 2px)',
            maskImage: 'linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)'
          }}
        ></div>

        {/* Theme Toggle Button */}
        <div className="fixed top-4 right-4 z-50">
          <button
            onClick={() => {
              setTheme(theme === 'system' ? (resolvedTheme === 'dark' ? 'light' : 'dark') : (theme === 'dark' ? 'light' : 'dark'));
            }}
            className={`flex items-center gap-2 px-3 py-2 rounded-full shadow-md border transition-colors duration-300 focus:outline-none ${resolvedTheme === 'dark' ? 'bg-gray-800 border-gray-700 text-yellow-200 hover:bg-gray-700' : 'bg-white border-gray-300 text-gray-800 hover:bg-gray-200'}`}
            aria-label="Toggle light/dark mode"
            type="button"
          >
            {resolvedTheme === 'dark' ? (
              <span role="img" aria-label="Light mode">🌞</span>
            ) : (
              <span role="img" aria-label="Dark mode">🌙</span>
            )}
            <span className="text-xs font-semibold">
              {theme === 'system' ? 'System' : (theme === 'dark' ? 'Dark' : 'Light')}
            </span>
          </button>
          {theme !== 'system' && (
            <button
              onClick={() => setTheme('system')}
              className={`block mt-2 w-full px-3 py-1 rounded-full text-xs border transition-colors duration-300 focus:outline-none ${resolvedTheme === 'dark' ? 'bg-gray-900 border-gray-700 text-gray-300 hover:bg-gray-800' : 'bg-white border-gray-300 text-gray-600 hover:bg-gray-200'}`}
            >
              Use System
            </button>
          )}
        </div>
        <div className={`relative z-10 font-noto-sans-jp mt-10 text-center text-2xl flex flex-col items-center justify-center transition-colors duration-300 ${resolvedTheme === 'dark' ? 'text-white' : 'text-black'}`}>
          <div className={`p-8 md:p-12 mb-8 rounded-3xl backdrop-blur-xs shadow-2xl transition-all duration-300 flex flex-col items-center justify-center w-[90%] max-w-3xl ${resolvedTheme === 'dark' ? 'border border-white/10' : 'border border-black/5'}`}>
            <div className={'mb-8 rounded-[20px] shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden'}>
              {/* <ThreeDObjectClient /> */}
              <Image
                src="/2.jpg"
                alt="自己PR"
                width={200}
                height={200}
                className="hover:scale-105 transition-transform duration-500 rounded-[10px]"
              />
            </div>
            <h1>
              <span className="font-bold text-3xl">{content[language].main}</span><br />
              <span className="font-light text-lg mt-1 block opacity-90">{content[language].name}</span>
              <div className="mt-3 leading-7">
                <ClickableEmailSubtitle text={content[language].subtitle} />
              </div>
            </h1>
            <div className="mt-8 flex justify-center gap-4 items-center">
              <a
                href="https://linkedin.com/in/luqman-hadi/"
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-2 px-4 py-2 rounded-full font-semibold transition ${resolvedTheme === 'dark' ? 'hover:bg-white/10 text-white' : 'hover:bg-black/5 text-black'}`}
              >
                <Icon path={mdiLinkedin} size={1} color={resolvedTheme === 'dark' ? 'white' : '#0A66C2'} />
              </a>
              <a
                href="https://github.com/luqhardy"
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-2 px-4 py-2 rounded-full font-semibold transition ${resolvedTheme === 'dark' ? 'hover:bg-white/10 text-white' : 'hover:bg-black/5 text-black'}`}
              >
                <Icon path={mdiGithub} size={1} color={resolvedTheme === 'dark' ? 'white' : '#333'} />
              </a>
              <a
                href="mailto:hello@luqmanhadi.com"
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-2 px-4 py-2 rounded-full font-semibold transition ${resolvedTheme === 'dark' ? 'hover:bg-white/10 text-white' : 'hover:bg-black/5 text-black'}`}
              >
                <Icon path={mdiEmail} size={1} color={resolvedTheme === 'dark' ? 'white' : '#EA4335'} />
              </a>
              {/* Language Toggle Switch */}
              <div className="flex items-center gap-1 ml-2">
                <button
                  onClick={() => setLanguage(language === 'ja' ? 'en' : 'ja')}
                  className="relative w-16 h-8 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center px-1 transition-colors duration-300 focus:outline-none border border-gray-400 dark:border-gray-600"
                  aria-label="Toggle language"
                  type="button"
                >
                  <span className="absolute left-2 text-xl select-none pointer-events-none">🇯🇵</span>
                  <span className="absolute right-2 text-xl select-none pointer-events-none">🇬🇧</span>
                  <span
                    className={`absolute top-1 left-1 w-6 h-6 rounded-full bg-white shadow-md transition-transform duration-300 ${language === 'en' ? 'translate-x-8' : ''}`}
                    style={{ willChange: 'transform' }}
                  />
                </button>
              </div>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 px-2">
            <a
              href="https://garakei.luqmanhadi.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center m-2 rounded-4xl hover:shadow-lg shadow-gray-500/100 hover:scale-105 transition duration-300 ease-in-out"
            >
              <Image
                src={buttons[language][0]}
                alt="ガラケイ"
                width={300}
                height={300}
              />
            </a>
            <a
              href="https://pr.luqmanhadi.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center m-2 rounded-4xl hover:shadow-lg shadow-orange-500/100 hover:scale-105 transition duration-300 ease-in-out"
            >
              <Image
                src={buttons[language][1]}
                alt="自己PR"
                width={300}
                height={300}

              />
            </a>
            <a
              href="https://blog.luqmanhadi.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center m-2 rounded-4xl hover:shadow-lg shadow-yellow-500/100 hover:scale-105 transition duration-300 ease-in-out"
            >
              <Image
                src={buttons[language][2]}
                alt="Blog"
                width={300}
                height={300}

              />
            </a>
            <a
              href="https://vocalaysia.luqmanhadi.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center m-2 rounded-4xl hover:shadow-lg shadow-cyan-500/100 hover:scale-105 transition duration-300 ease-in-out"
            >
              <Image
                src={buttons[language][3]}
                alt="Vocalaysia"
                width={300}
                height={300}

              />
            </a>
            <a
              href="https://bunsekikun.luqmanhadi.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center m-2 rounded-4xl hover:shadow-lg shadow-blue-500/100 hover:scale-105 transition duration-300 ease-in-out"
            >
              <Image
                src={buttons[language][4]}
                alt="Shuutokun"
                width={300}
                height={300}

              />
            </a>
            <a
              href="https://shutokun.luqmanhadi.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center m-2 rounded-4xl hover:shadow-lg shadow-white hover:scale-105 transition duration-300 ease-in-out"
            >
              <Image
                src={buttons[language][5]}
                alt="Bunsekikun"
                width={300}
                height={300}
              />
            </a>
            <a
              href="https://iot.luqmanhadi.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center m-2 rounded-4xl hover:shadow-lg shadow-yellow-500/50 hover:scale-105 transition duration-300 ease-in-out"
            >
              <Image
                src={buttons[language][6]}
                alt="Portfolio"
                width={300}
                height={300}

              />
            </a>
            <a
              href="https://oshikatsu.luqmanhadi.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center m-2 rounded-4xl hover:shadow-lg shadow-pink-500/50 hover:scale-105 transition duration-300 ease-in-out"
            >
              <Image
                src={buttons[language][7]}
                alt="Oshikatsu"
                width={300}
                height={300}

              />
            </a>
            <a
              href="https://cloudis.luqmanhadi.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center m-2 rounded-4xl hover:shadow-lg shadow-gray-500/50 hover:scale-105 transition duration-300 ease-in-out"
            >
              <Image
                src={buttons[language][8]}
                alt="Cloudis"
                width={300}
                height={300}

              />
            </a>
            <a
              href="https://portfolio.luqmanhadi.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center m-2 rounded-4xl hover:shadow-lg shadow-gray-500/50 hover:scale-105 transition duration-300 ease-in-out"
            >
              <Image
                src={buttons[language][9]}
                alt="Portfolio"
                width={300}
                height={300}

              />
            </a>
          </div>
          <div className={`text-xs my-10 ${resolvedTheme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>
            <p>© 2025 Luqman Hadi</p>
            <p>All rights reserved.</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;