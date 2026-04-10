import React from 'react';

interface LogoProps {
    showText?: boolean;
    className?: string;
}

const Logo: React.FC<LogoProps> = ({ showText = true, className = "" }) => {
    return (
        <div className={`flex items-center gap-3 ${className}`}>
            <div className="relative h-12 w-12 flex-shrink-0">
                <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
                    {/* Base of the house */}
                    <path d="M20 85H80" stroke="currentColor" strokeWidth="4" strokeLinecap="round" className="text-primary/40" />
                    {/* Roof */}
                    <path d="M15 55L50 25L85 55" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" className="text-primary/80" />
                    {/* Initials WP */}
                    <path d="M25 50L35 80L45 50L55 80L65 50" stroke="white" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M60 50H75C80 50 85 55 85 62.5C85 70 80 75 75 75H65V80" stroke="white" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </div>

            {showText && (
                <div className="flex flex-col leading-none">
                    <span className="font-display text-2xl font-bold tracking-tight text-primary">
                        Wiiki<span className="text-primary/60">_</span>Produtos<span className="text-primary/60">_</span>
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary/40 mt-1">
                        Produtos que Resolvem
                    </span>
                </div>
            )}
        </div>
    );
};

export default Logo;
