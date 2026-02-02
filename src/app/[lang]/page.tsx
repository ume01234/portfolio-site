'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Github, Linkedin, BookOpen, FileText, /* PenTool, */ Newspaper, Mail } from 'lucide-react';
import {
  getData,
  socialLinks,
  repositoryUrl,
  emailAddress,
} from '@/lib/data';
import { useLanguage } from '@/contexts/LanguageContext';
import LiquidBackground from '@/components/LiquidBackground';
import TypeBSection from '@/components/TypeBSection';
import TimelineSection from '@/components/TimelineSection';
import ScrollToTop from '@/components/ScrollToTop';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  github: Github,
  linkedin: Linkedin,
  'book-open': BookOpen,
  'file-text': FileText,
  // 'pen-tool': PenTool, // Note連携一時無効化
  newspaper: Newspaper,
};

function chunkArray<T>(array: T[] | undefined | null, chunkSize: number): T[][] {
  if (!array || array.length === 0) return [];
  if (chunkSize <= 0) return [array];

  const chunks: T[][] = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    chunks.push(array.slice(i, i + chunkSize));
  }
  return chunks;
}

export default function Home() {
  const { language } = useLanguage();
  const data = getData(language);
  const [scrollProgress, setScrollProgress] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const certChunks = chunkArray(data.achievements.certifications, 5);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    let rafId: number | null = null;
    let ticking = false;

    const updateScrollProgress = () => {
      const { scrollTop, scrollHeight, clientHeight } = scrollContainer;
      const maxScroll = scrollHeight - clientHeight;

      if (maxScroll <= 0) {
        setScrollProgress(0);
        ticking = false;
        return;
      }

      const progress = scrollTop / maxScroll;
      setScrollProgress(Math.min(Math.max(progress, 0), 1));
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        rafId = requestAnimationFrame(() => {
          updateScrollProgress();
        });
        ticking = true;
      }
    };

    scrollContainer.addEventListener('scroll', handleScroll, { passive: true });
    updateScrollProgress();

    return () => {
      scrollContainer.removeEventListener('scroll', handleScroll);
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
    };
  }, []);

  return (
    <main className="h-screen w-full flex flex-col md:flex-row overflow-hidden bg-coffee-cream">
      <ScrollToTop scrollContainerRef={scrollContainerRef} />

      {/* Left sidebar - Fixed on desktop */}
      <motion.aside
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="hidden md:flex md:w-[35%] lg:w-[30%] h-full flex-col items-center justify-center relative overflow-hidden bg-coffee-cream shadow-2xl z-10"
      >
        <LiquidBackground scrollProgress={scrollProgress} />

        <div className="relative z-10 text-center px-8 mix-blend-difference text-white">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl lg:text-5xl font-serif mb-6 font-light drop-shadow-md"
            style={{ fontFamily: '"Noto Serif JP", serif' }}
          >
            {data.profileData.catchCopy}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl lg:text-2xl mb-2 drop-shadow-md"
          >
            {data.profileData.name}
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-sm lg:text-base opacity-90 mb-8 drop-shadow-md font-medium"
          >
            {data.profileData.vision}
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex gap-4 justify-center mb-4"
          >
            {socialLinks.map((social) => {
              const Icon = iconMap[social.icon] || Github;
              return (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:scale-110 transition-transform"
                  aria-label={`${social.name}${language === 'ja' ? 'を開く' : ''}`}
                >
                  <Icon className="w-6 h-6" />
                </a>
              );
            })}
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.0 }}
            className="flex items-center justify-center gap-2 text-white/90 hover:text-white transition-colors"
          >
            <Mail className="w-4 h-4" />
            <a
              href={`mailto:${emailAddress}`}
              className="text-sm hover:underline"
              aria-label={language === 'ja' ? 'メールを送信' : 'Send email'}
            >
              {emailAddress}
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: scrollProgress > 0.9 ? 1 : 0 }}
          transition={{ duration: 0.5 }}
          className="absolute bottom-10 left-0 right-0 text-center z-20 pointer-events-none"
        >
          <p className="text-[#3e2723]/40 text-sm font-serif tracking-widest drop-shadow-sm">
            THANK YOU FOR READING
          </p>
        </motion.div>
      </motion.aside>

      {/* Right side - Scrollable content */}
      <div
        ref={scrollContainerRef}
        className="flex-1 bg-coffee-cream overflow-y-auto relative scroll-smooth md:pr-3"
      >
        {/* Mobile header */}
        <section className="md:hidden min-h-screen flex flex-col items-center justify-center px-6 bg-coffee-cream relative overflow-hidden">
          <div className="absolute inset-0 z-0">
            <LiquidBackground scrollProgress={0} fixedPosition={true} />
          </div>

          <div className="relative z-10 text-center px-8 mix-blend-difference text-white">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl font-serif mb-6 font-light drop-shadow-md"
              style={{ fontFamily: '"Noto Serif JP", serif' }}
            >
              {language === 'ja' && data.profileData.catchCopy.includes('、') ? (
                <>
                  {data.profileData.catchCopy.split('、')[0]}、<br />
                  {data.profileData.catchCopy.split('、')[1]}
                </>
              ) : (
                data.profileData.catchCopy
              )}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl mb-2 drop-shadow-md"
            >
              {data.profileData.name}
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-sm opacity-90 mb-8 drop-shadow-md font-medium"
            >
              {data.profileData.vision}
            </motion.p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex gap-4 justify-center mb-4"
            >
              {socialLinks.map((social) => {
                const Icon = iconMap[social.icon] || Github;
                return (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:scale-110 transition-transform"
                    aria-label={`${social.name}${language === 'ja' ? 'を開く' : ''}`}
                  >
                    <Icon className="w-6 h-6" />
                  </a>
                );
              })}
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.0 }}
              className="flex items-center justify-center gap-2 text-white/90 hover:text-white transition-colors"
            >
              <Mail className="w-4 h-4" />
              <a
                href={`mailto:${emailAddress}`}
                className="text-sm hover:underline"
                aria-label={language === 'ja' ? 'メールを送信' : 'Send email'}
              >
                {emailAddress}
              </a>
            </motion.div>
          </div>
        </section>

        {/* Section 1: About Me */}
        <section className="min-h-[40vh] px-6 py-8 md:py-8 flex flex-col justify-center">
          <h2 className="text-xl md:text-2xl font-bold mb-8 text-coffee-espresso">
            {data.sections.aboutMe}
          </h2>
          <div className="text-coffee-dark leading-relaxed whitespace-pre-line text-lg max-w-4xl mx-auto">
            {data.profileData.aboutMe.split(/\*\*(.*?)\*\*/g).map((part, index) => {
              if (index % 2 === 1) {
                return <strong key={index}>{part}</strong>;
              }
              return <span key={index}>{part}</span>;
            })}
          </div>
        </section>

        {/* Section 2: Education */}
        <section className="min-h-[30vh] px-6 py-8 md:py-8 flex flex-col justify-center">
          <h2 className="text-xl md:text-2xl font-bold mb-8 text-coffee-espresso">
            {data.sections.education}
          </h2>
          <div className="overflow-x-auto no-scrollbar pb-8">
            <div className="flex gap-16 min-w-max px-4">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="min-w-64 flex-shrink-0"
              >
                <ul className="space-y-2 border-l-2 border-coffee-brown/20 pl-6">
                  {data.profileData.education.map((item, index) => (
                    <li key={index} className="text-coffee-dark font-medium whitespace-nowrap">
                      <span className="text-coffee-dark/50 font-mono text-sm mr-2">{item.date}</span>
                      {item.url ? (
                        <a href={item.url} target="_blank" rel="noopener noreferrer" className="underline hover:text-coffee-brown transition-colors">
                          {item.text}
                        </a>
                      ) : (
                        item.text
                      )}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Section 3: Certifications (Type B: 5-row chunks) */}
        <TypeBSection title={data.sections.certifications} chunks={certChunks} />

        {/* Section 4: Internships & External Events (Timeline) */}
        <TimelineSection
          title={data.sections.activityEvents}
          events={data.achievements.activityEvents}
          maxDisplay={6}
          viewAllLink={`/${language}/activities`}
          viewAllText={data.sections.viewAll}
          categoryLabels={data.categoryLabels}
          language={language}
        />

        {/* Section 5: Works (Netflix-style) */}
        <section className="min-h-[40vh] px-6 py-8 md:py-8 flex flex-col justify-center">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl md:text-2xl font-bold text-coffee-espresso">
              {data.sections.works}
            </h2>
            <Link
              href={`/${language}/works`}
              aria-label={language === 'ja' ? 'すべてのプロジェクトを表示' : 'View all projects'}
            >
              <span className="text-coffee-brown hover:text-coffee-espresso transition-colors font-medium border-b border-coffee-brown/30 hover:border-coffee-brown text-sm md:text-base">
                {data.sections.viewAll} →
              </span>
            </Link>
          </div>
          <div className="overflow-x-auto no-scrollbar pb-8">
            <div className="flex gap-6 min-w-max px-4">
              {data.works.map((work, index) => (
                <motion.div
                  key={work.id}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="w-80 flex-shrink-0 group"
                >
                  <Link
                    href={`/${language}/works/${work.id}`}
                    aria-label={language === 'ja' ? `${work.title}を表示` : `View ${work.title}`}
                  >
                    <div
                      className="aspect-video bg-coffee-latte/20 rounded-md mb-4 overflow-hidden relative"
                      aria-hidden="true"
                    >
                      <img
                        src={`/images/works/work-${work.id}.webp`}
                        alt={work.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-coffee-espresso/0 group-hover:bg-coffee-espresso/10 transition-colors duration-300" />
                    </div>
                    <h3 className="text-xl font-bold text-coffee-espresso mb-2 group-hover:text-coffee-brown transition-colors">
                      {work.title.split('|').map((part, index, array) => (
                        <span key={index}>
                          {part}
                          {index < array.length - 1 && <br />}
                        </span>
                      ))}
                    </h3>
                    <p className="text-sm text-coffee-dark/80 leading-relaxed">
                      {work.description}
                    </p>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 6: Blog (Netflix-style) */}
        <section className="min-h-[40vh] px-6 py-8 md:py-12 flex flex-col justify-center">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl md:text-2xl font-bold text-coffee-espresso">
              {data.sections.blog}
            </h2>
            {data.blogPosts.length > 0 && (
              <Link
                href={`/${language}/blog`}
                aria-label={language === 'ja' ? 'すべてのブログ記事を表示' : 'View all blog posts'}
              >
                <span className="text-coffee-brown hover:text-coffee-espresso transition-colors font-medium border-b border-coffee-brown/30 hover:border-coffee-brown text-sm md:text-base">
                  {data.sections.viewAll} →
                </span>
              </Link>
            )}
          </div>
          {data.blogPosts.length > 0 ? (
            <div className="overflow-x-auto no-scrollbar pb-8">
              <div className="flex gap-6 min-w-max px-4">
                {data.blogPosts.map((post, index) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="w-80 flex-shrink-0 group"
                  >
                    <a
                      href={post.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={language === 'ja' ? `記事を読む: ${post.title}` : `Read article: ${post.title}`}
                    >
                      <div
                        className="aspect-video rounded-md mb-4 overflow-hidden relative flex items-center justify-center bg-coffee-latte/20"
                        aria-hidden="true"
                      >
                        {post.platform === 'Medium' && post.thumbnail ? (
                          <>
                            <img
                              src={post.thumbnail}
                              alt={post.title}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-coffee-espresso/0 group-hover:bg-coffee-espresso/10 transition-colors duration-300" />
                          </>
                        ) : post.platform === 'Zenn' && post.emoji ? (
                          <>
                            <span className="text-5xl">{post.emoji}</span>
                            <div className="absolute inset-0 bg-coffee-brown/0 group-hover:bg-coffee-brown/5 transition-colors duration-300" />
                          </>
                        ) : (
                          <>
                            <span className="text-coffee-brown/40 font-serif text-lg">{post.platform || 'Article'}</span>
                            <div className="absolute inset-0 bg-coffee-brown/0 group-hover:bg-coffee-brown/5 transition-colors duration-300" />
                          </>
                        )}
                      </div>
                      <div className="flex items-center gap-2 mb-2">
                        {post.platform && (
                          <span className="px-2 py-0.5 bg-coffee-brown/15 text-coffee-espresso text-xs font-medium rounded-full">
                            {post.platform}
                          </span>
                        )}
                        <time dateTime={post.date} className="text-xs text-coffee-brown/60 font-mono">
                          {post.date}
                        </time>
                      </div>
                      <h3 className="text-lg font-bold text-coffee-espresso mb-2 group-hover:text-coffee-brown transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      {post.subtitle && (
                        <p className="text-sm text-coffee-dark/70 line-clamp-2">
                          {post.subtitle}
                        </p>
                      )}
                    </a>
                  </motion.div>
                ))}
              </div>
            </div>
          ) : (
            <div className="py-16">
              <p className="text-2xl md:text-3xl font-bold text-coffee-espresso/60">
                {data.sections.comingSoon}
              </p>
            </div>
          )}
        </section>

        {/* Section 7: Hobbies */}
        <section className="min-h-[40vh] px-6 py-8 md:py-8 flex flex-col justify-center mb-20">
          <h2 className="text-xl md:text-2xl font-bold mb-8 text-coffee-espresso">
            {data.sections.hobbies}
          </h2>
          <div>
            <ul className="space-y-4">
              {data.hobbies.map((hobby, index) => (
                <motion.li
                  key={hobby.id}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-4"
                >
                  <span className="text-coffee-brown text-xl font-bold mt-1 flex-shrink-0">•</span>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-coffee-espresso mb-1">
                      {hobby.title}
                    </h3>
                    <p className="text-sm text-coffee-dark/80 leading-relaxed">
                      {hobby.description}
                    </p>
                  </div>
                </motion.li>
              ))}
            </ul>
          </div>
        </section>

        {/* Scroll padding */}
        <div className="h-[20vh] w-full"></div>

        {/* Footer */}
        <footer className="px-6 py-12 border-t border-coffee-brown/10 bg-[#fffdf9]">
          <div className="text-center text-base space-y-2" style={{ color: '#9AACB4' }}>
            <p>© {new Date().getFullYear()} {data.profileData.name}</p>
            <p>
              <a
                href={`mailto:${emailAddress}`}
                className="hover:opacity-80 transition-opacity"
                aria-label={language === 'ja' ? 'メールを送信' : 'Send email'}
              >
                {emailAddress}
              </a>
            </p>
            <p>
              {language === 'ja' ? (
                <>
                  {data.sections.sourceCode}{' '}
                  <a
                    href={repositoryUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:opacity-80 transition-opacity"
                    aria-label="GitHubでソースコードを表示"
                  >
                    GitHub
                  </a>
                  で公開しています
                </>
              ) : (
                <>
                  {data.sections.sourceCode}{' '}
                  <a
                    href={repositoryUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:opacity-80 transition-opacity"
                    aria-label="View source code on GitHub"
                  >
                    GitHub
                  </a>
                  .
                </>
              )}
            </p>
          </div>
        </footer>
      </div>
    </main>
  );
}
