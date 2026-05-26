import React from 'react';
import ThemeSelector from './ThemeSelector';
import { Globe, Code, Shield } from 'lucide-react';
import { useTranslation } from '../utils/i18n';

export default function Footer({ activeTheme, setTheme, language = 'english' }) {
    const t = useTranslation(language);

    return (
        <footer className="w-full max-w-6xl mx-auto py-8 px-4 mt-auto border-t border-sub/10 flex flex-col md:flex-row items-center justify-between gap-6 select-none text-xs text-sub font-mono">

            <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
                <a
                    href="https://opakptw.vercel.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 hover:text-txt transition-colors"
                >
                    <Globe size={14} />
                    <span>opakptw</span>
                </a>
                <span className="hidden sm:inline text-sub/20">|</span>
                <div className="flex items-center gap-1.5">
                    <Code size={14} />
                    <span>{t.footerCredits}</span>
                </div>
            </div>

            <div className="flex items-center gap-3">
                <ThemeSelector activeTheme={activeTheme} setTheme={setTheme} inline={true} language={language} />
            </div>

        </footer>
    );
}
