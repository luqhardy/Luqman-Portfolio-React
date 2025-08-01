"use client";

import Image from "next/image";
import ThreeDObjectClient from "./ThreeDObjectClient";
import React, { useState } from "react";
import Icon from '@mdi/react';
import { mdiLinkedin } from '@mdi/js';
import { mdiGithub } from '@mdi/js';
import { mdiEmail } from '@mdi/js';
//import LiquidGlass from "liquid-glass-react";


const ClickableEmailSubtitle = ({ text }: { text: string }) => {
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
};



export default function Home() {
  const [language, setLanguage] = useState<'ja' | 'en'>('ja');

  const content = {
    ja: {
      name: "ルクマン　ハディ",
      subtitle: "文部科学省国費外国人留学生　神戸電子専門学校\nAIシステム開発学科　1年生\n マレーシア出身 神戸市在住\nメール: hello@luqmanhadi.com",
      main: "Luqman Hadi"
    },
    en: {
      name: "ルクマン　ハディ",
      subtitle: "Japanese Government (MEXT) Scholar, Kobe Institute of Computing\nAI Systems Development, 1st Year\n Malaysian, based in Kobe City, Hyogo Pref, Japan\nContact: hello@luqmanhadi.com",
      main: "Luqman Hadi"
    }
  };
  const buttons = {
    ja: {
      1: "/jp/pr.png",
      2: "/jp/1.png",
      3: "/jp/2.png",
      4: "/jp/3.png",
      5: "/jp/4.png",
      6: "/jp/5.png",
      7: "/jp/6.png",
    },
    en: {
      1: "/en/pr.png",
      2: "/en/1.png",
      3: "/en/2.png",
      4: "/en/3.png",
      5: "/en/4.png",
      6: "/en/5.png",
      7: "/en/6.png",
    },
  };

  return (
    <>
    <div className="flex flex-col items-center justify-center min-h-screen bg-black">
      <div className="font-noto-sans-jp text-center text-2xl text-white flex flex-col items-center justify-center">
        <div >
        <ThreeDObjectClient />
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
        <a
            href="https://pr.luqmanhadi.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-0 px-0 py-0 m-2 rounded-4xl hover:shadow-lg shadow-orange-500/100 hover:scale-110 transition duration-500 ease-in-out flex justify-center items-cente"
          >
            <Image
              src={buttons[language][1]}
              alt="自己PR"
              width={300}
              height={300}

            />
          </a>
        <a
            href="https://bunsekikun.luqmanhadi.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-0 px-0 py-0 m-2 rounded-4xl hover:shadow-lg shadow-blue-500/100 hover:scale-110 transition duration-500 ease-in-out flex justify-center items-cente"
          >
            <Image
              src={buttons[language][2]}
              alt="Shuutokun"
              width={300}
              height={300}

            />
          </a>
          <a
            href="https://shutokun.luqmanhadi.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-0 px-0 py-0 m-2 rounded-4xl hover:shadow-lg shadow-white hover:scale-110 transition duration-500 ease-in-out flex justify-center items-cente"
          >
            <Image
              src={buttons[language][3]}
              alt="Bunsekikun"
              width={300}
              height={300}
            />
          </a>
                              <a
            href="https://iot.luqmanhadi.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-0 px-0 py-0 m-2 rounded-4xl hover:shadow-lg shadow-yellow-500/50 hover:scale-110 transition duration-500 ease-in-out flex justify-center items-center"
          >
            <Image
              src={buttons[language][4]}
              alt="Portfolio"
              width={300}
              height={300}

            />
            </a>
                    <a
            href="https://oshikatsu.luqmanhadi.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-0 px-0 py-0 m-2 mb-0 rounded-4xl hover:shadow-lg shadow-pink-500/50 hover:scale-110 transition duration-500 ease-in-out flex justify-center items-center"
          >
            <Image
              src={buttons[language][5]}
              alt="Oshikatsu"
              width={300}
              height={300}

            />
            </a>
            <a
            href="https://cloudis.luqmanhadi.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-0 px-0 py-0 m-2 mt-4 mb-0 rounded-4xl hover:shadow-lg shadow-gray-500/50 hover:scale-110 transition duration-500 ease-in-out flex justify-center items-center"
          >
            <Image
              src={buttons[language][6]}
              alt="Cloudis"
              width={300}
              height={300}

            />
            </a>
            <a  
            href="https://portfolio.luqmanhadi.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-0 px-0 py-0 mt-4 mb-10 rounded-4xl hover:shadow-lg shadow-gray-500/50 hover:scale-110 transition duration-500 ease-in-out flex justify-center items-center"
          >
            <Image
              src={buttons[language][7]}
              alt="Portfolio"
              width={300}
              height={300}

            />
            </a>
            <div className="text-xs text-gray-500 mb-10">
              <p>© 2025 Luqman Hadi</p>
              <p>All rights reserved.</p>
              </div>
      </div>
    </div>
    </>
  );
}
