'use client';

import { FaGithub, FaLinkedin } from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import { FaXTwitter, FaSun, FaMoon } from "react-icons/fa6";
import { useEffect, useState } from 'react';
import { toggleDarkMode } from '@/utils/darkmode';
import { usePortfolio } from '@/hooks/usePortfolio';
import HeroSkeleton from "@/components/skeletons/HeroSkeleton";


export default function HeroSection() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const { data, loading } = usePortfolio();
  const hero = data?.hero;

  useEffect(() => {
    setIsMounted(true);
    setIsDarkMode(localStorage.getItem('darkmode') === 'active');
  }, []);

  if (loading || !hero) {
    return <HeroSkeleton />;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-6 items-stretch">

      {/* PFP */}
      <div className="flex justify-center lg:justify-start">
        <div
          className="
            bg-white rounded-3xl overflow-hidden aspect-square w-[200px] md:w-[260px] lg:w-[400px] card-color border-color relative">
          <img
            src={hero.avatar_url}
            alt="Profile Picture"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <div className="flex flex-col justify-between">

        {/* Self Summary */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left mb-3">
          <div className="flex items-center gap-3">
            <h1 className="text-4xl font-extrabold text-fill-color">
              SELF-SUMMARY
            </h1>

            <button
              onClick={() => setIsDarkMode(toggleDarkMode())}
              className="cursor-pointer hover:opacity-80 transition"
            >
              {isMounted && (
                isDarkMode ? (
                  <FaMoon className="w-8 h-8 text-fill-color" />
                ) : (
                  <FaSun className="w-8 h-8 text-fill-color" />
                )
              )}
            </button>
          </div>
        </div>

        {/* Card About */}
        <div className="card-color rounded-3xl p-6 border border-color w-full h-full">
          <p className="text-fill-color/80 text-sm md:text-base leading-relaxed mb-6">
            <span className="font-semibold">{hero.name}</span>{" "}
            {hero.summary}
          </p>

          <div className="flex flex-wrap items-center gap-4">

            {hero.cv_url && (
              <a
                href={hero.cv_url}
                target="_blank"
                className="bg-blue-600 hover:bg-blue-700 transition-colors px-4 py-2 rounded-lg text-sm font-medium text-white cursor-pointer"
              >
                Download CV
              </a>
            )}

            {/* Social Icons */}
            <div className="flex items-center gap-3">
              {hero.github && (
                <a
                  href={hero.github}
                  target="_blank"
                  className="text-fill-color/70 hover:opacity-80 cursor-pointer transition"
                >
                  <FaGithub className="w-5 h-5" />
                </a>
              )}

              {hero.twitter && (
                <a
                  href={hero.twitter}
                  target="_blank"
                  className="text-fill-color/70 hover:opacity-80 cursor-pointer transition"
                >
                  <FaXTwitter className="w-5 h-5" />
                </a>
              )}

              {hero.linkedin && (
                <a
                  href={hero.linkedin}
                  target="_blank"
                  className="text-fill-color/70 hover:opacity-80 cursor-pointer transition"
                >
                  <FaLinkedin className="w-5 h-5" />
                </a>
              )}

              {hero.email && (
                <a
                  href={`mailto:${hero.email}`}
                  className="text-fill-color/70 hover:opacity-80 cursor-pointer transition"
                >
                  <SiGmail className="w-5 h-5" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}