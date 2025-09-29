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
    return <span className="font-light text-sm" style={{ whiteSpace: 'pre-line' }}>{text}</span>;
  }
  const email = match[0];
  const parts = text.split(email);
  const beforeText = parts[0];
  const afterText = parts[1] || '';
  return (
    <span className="font-light text-sm" style={{ whiteSpace: 'pre-line' }}>
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
    const stored = typeof window !== 'undefined' ? localStorage.getItem('theme-override') : null;
    if (stored === 'light' || stored === 'dark') {
      setTheme(stored);
    }
  }, []);

  useEffect(() => {
    // Listen for system theme changes
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const updateTheme = () => {
      if (theme === 'system') {
        setResolvedTheme(mq.matches ? 'dark' : 'light');
      }
    };
    mq.addEventListener('change', updateTheme);
    updateTheme();
    return () => mq.removeEventListener('change', updateTheme);
  }, [theme]);

  useEffect(() => {
    // Apply theme override
    if (theme === 'system') {
      const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setResolvedTheme(isDark ? 'dark' : 'light');
      localStorage.removeItem('theme-override');
    } else {
      setResolvedTheme(theme);
      localStorage.setItem('theme-override', theme);
    }
    // Set html class for Tailwind
    if (typeof document !== 'undefined') {
      if (resolvedTheme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }, [theme, resolvedTheme]);

  const content = {
    ja: {
      name: "ルクマン　ハディ",
      subtitle: "文部科学省国費外国人留学生　神戸電子専門学校\nAIシステム開発学科　1年生\n 株式会社ワオナス・一般社団法人クラウディス\nパート社員\nマレーシア出身 神戸市在住\nメール: hello@luqmanhadi.com",
      main: "Luqman Hadi"
    },
    en: {
      name: "ルクマン　ハディ",
      subtitle: "Japanese Government (MEXT) Scholar, Kobe Institute of Computing\nAI Systems Development, 1st Year\n Wownas Co., Ltd. Freelance Staff\nMalaysian, based in Kobe City, Hyogo Pref, Japan\nContact: hello@luqmanhadi.com",
      main: "Luqman Hadi"
    }
  };
  const buttons = {
    ja: {
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
    <Analytics />
    <div
      className={`flex flex-col items-center justify-center min-h-screen transition-colors duration-300 ${
        resolvedTheme === 'dark' ? 'bg-black' : 'bg-white'
      }`}
    >
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
      <div className={`font-noto-sans-jp text-center text-2xl flex flex-col items-center justify-center transition-colors duration-300 ${resolvedTheme === 'dark' ? 'text-white' : 'text-black'}`}> 
          <div >
            {/* <ThreeDObjectClient /> */}
          </div>
          <h1>
            <span className="font-bold text-3xl">{content[language].main}</span><br />
            <span className="font-light text-xl">{content[language].name}</span><br />
            <ClickableEmailSubtitle text={content[language].subtitle} />
          </h1>
          <div className="mt-6 flex justify-center gap-4  mb-5 items-center">
            <a
              href="https://linkedin.com/in/luqman-hadi/"
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-2 px-4 py-2 rounded font-semibold transition ${resolvedTheme === 'dark' ? 'hover:bg-gray-900 text-white' : 'hover:bg-gray-200 text-black'}`}
            >
              <Icon path={mdiLinkedin} size={1} color={resolvedTheme === 'dark' ? 'white' : '#0A66C2'} />
            </a>
            <a
              href="https://github.com/luqhardy"
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-2 px-4 py-2 rounded font-semibold transition ${resolvedTheme === 'dark' ? 'hover:bg-gray-900 text-white' : 'hover:bg-gray-200 text-black'}`}
            >
              <Icon path={mdiGithub} size={1} color={resolvedTheme === 'dark' ? 'white' : '#333'} />
            </a>
            <a
              href="mailto:hello@luqmanhadi.com"
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-2 px-4 py-2 rounded font-semibold transition ${resolvedTheme === 'dark' ? 'hover:bg-gray-900 text-white' : 'hover:bg-gray-200 text-black'}`}
            >
              <Icon path={mdiEmail} size={1} color={resolvedTheme === 'dark' ? 'white' : '#EA4335'} />
            </a>
            {/* Language Toggle Switch */}
            <div className="flex items-center gap-1 ml-2">
              <button
                onClick={() => setLanguage(language === 'ja' ? 'en' : 'ja')}
                className="relative w-16 h-8 bg-gray-200 rounded-full flex items-center px-1 transition-colors duration-300 focus:outline-none border border-gray-400"
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
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 px-2">
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