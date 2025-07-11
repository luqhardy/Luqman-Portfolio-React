"use client";

import Image from "next/image";
import ThreeDObjectClient from "./ThreeDObjectClient";
import React, { useState } from "react";
import Icon from '@mdi/react';
import { mdiLinkedin } from '@mdi/js';
import { mdiGithub } from '@mdi/js';
import { mdiEmail } from '@mdi/js';

export default function Home() {
  const [language, setLanguage] = useState<'ja' | 'en'>('ja');

  // Text content for both languages
  const content = {
    ja: {
      name: "ルクマン　ハディ",
      subtitle: "文部科学省国費外国人留学生　神戸電子専門学校\nAIシステム開発学科　1年生\n メール: hello@luqmanhadi.com",
      main: "Luqman Hadi"
    },
    en: {
      name: "ルクマン　ハディ",
      subtitle: "Japanese Government (MEXT) Scholar, Kobe Institute of Computing\nAI Systems Development, 1st Year\n Contact: hello@luqmanhadi.com",
      main: "Luqman Hadi"
    }
  };

  return (
    <>
    <div className="flex flex-col items-center justify-center h-screen bg-black">
      <div className="font-noto-sans-jp text-center text-2xl text-white flex flex-col items-center justify-center">
        <div className="mb-2">
          <ThreeDObjectClient />
        </div>
        <h1>
          <span className="font-bold text-3xl">{content[language].main}</span><br />
          <span className="font-light text-xl">{content[language].name}</span><br />
          <span className="font-thin text-sm" style={{ whiteSpace: 'pre-line' }}>{content[language].subtitle}</span>
        </h1>
        <div className="mt-6 flex justify-center gap-4 items-center">
          <a
            href="https://linkedin.com/in/luqman-hadi/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded hover:bg-gray-900 text-white font-semibold transition"
          >
            <Icon path={mdiLinkedin} size={1} color="white" />
          </a>
          <a
            href="https://github.com/luqhardy"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded hover:bg-gray-900 text-white font-semibold transition"
          >
            <Icon path={mdiGithub} size={1} />
          </a>
                    <a
            href="mailto:hello@luqmanhadi.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded hover:bg-gray-900 text-white font-semibold transition"
          >
            <Icon path={mdiEmail} size={1} />
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
        <div className="mt-4 flex gap-4">
          <a
            href="https://shutokun.luqmanhadi.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 px-2 py-1 m-0 rounded hover:bg-gray-900 text-white font-semibold transition"
          >
            <Image
              src="/shuutokun.png"
              alt="Shuutokun"
              width={100}
              height={100}

            />
          </a>
          <a
            href="https://bunsekikun.luqmanhadi.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 px-2 py-1 rounded hover:bg-gray-900 text-white font-semibold transition"
          >
            <Image
              src="/bunsekikun.png"
              alt="Bunsekikun"
              width={100}
              height={100}
              className="rounded-full"
            />
          </a>
        </div>
                    <a
            href="https://portfolio.luqmanhadi.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 px-2 py-1 m-0 rounded hover:bg-gray-900 text-white font-semibold transition"
          >
            <Image
              src="/portfolio.png"
              alt="Portfolio"
              width={200}
              height={200}

            />
            </a>
      </div>
    </div>
    </>
  );
}
