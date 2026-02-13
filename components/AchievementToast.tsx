import React, { useEffect, useState } from 'react';
import { ACHIEVEMENT_DEFS } from '../services/progressService';

interface AchievementToastProps {
    achievementId: string | null;
    onDismiss: () => void;
}

const AchievementToast: React.FC<AchievementToastProps> = ({ achievementId, onDismiss }) => {
    const [visible, setVisible] = useState(false);
    const [exiting, setExiting] = useState(false);

    useEffect(() => {
        if (achievementId) {
            setVisible(true);
            setExiting(false);

            const timer = setTimeout(() => {
                setExiting(true);
                setTimeout(() => {
                    setVisible(false);
                    setExiting(false);
                    onDismiss();
                }, 400);
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [achievementId, onDismiss]);

    if (!visible || !achievementId) return null;

    const achievement = ACHIEVEMENT_DEFS.find(a => a.id === achievementId);
    if (!achievement) return null;

    return (
        <div
            className={`fixed top-4 left-1/2 -translate-x-1/2 z-[100] transition-all duration-400 ${exiting
                    ? 'opacity-0 -translate-y-4'
                    : 'opacity-100 translate-y-0'
                }`}
            style={{ animation: exiting ? undefined : 'slideDown 0.4s ease-out' }}
            onClick={() => {
                setExiting(true);
                setTimeout(() => { setVisible(false); onDismiss(); }, 300);
            }}
        >
            {/* Confetti particles */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
                {[...Array(12)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-1.5 h-1.5 rounded-full"
                        style={{
                            background: ['#FFD700', '#FF6B6B', '#4ECDC4', '#A78BFA', '#F472B6', '#34D399'][i % 6],
                            left: `${10 + Math.random() * 80}%`,
                            top: `${Math.random() * 100}%`,
                            animation: `confetti ${1 + Math.random()}s ease-out ${Math.random() * 0.5}s forwards`,
                            opacity: 0,
                        }}
                    />
                ))}
            </div>

            {/* Toast content */}
            <div
                className="relative px-6 py-4 rounded-2xl backdrop-blur-xl border shadow-2xl min-w-[280px]"
                style={{
                    background: 'linear-gradient(135deg, rgba(var(--color-primary-rgb, 99,102,241), 0.95), rgba(var(--color-accent-rgb, 168,85,247), 0.95))',
                    borderColor: 'rgba(255,255,255,0.2)',
                }}
            >
                <div className="flex items-center gap-4">
                    <div className="text-3xl flex-shrink-0">{achievement.icon}</div>
                    <div>
                        <p className="text-xs font-bold text-white/70 uppercase tracking-widest mb-0.5">
                            🎉 Achievement Unlocked!
                        </p>
                        <p className="text-lg font-heading font-bold text-white">
                            {achievement.name}
                        </p>
                        <p className="text-sm text-white/60">
                            {achievement.description}
                        </p>
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes slideDown {
                    from { opacity: 0; transform: translate(-50%, -20px); }
                    to { opacity: 1; transform: translate(-50%, 0); }
                }
                @keyframes confetti {
                    0% { opacity: 1; transform: translate(0, 0) rotate(0deg) scale(1); }
                    100% { opacity: 0; transform: translate(${Math.random() > 0.5 ? '' : '-'}${20 + Math.random() * 40}px, ${40 + Math.random() * 60}px) rotate(${360 + Math.random() * 360}deg) scale(0); }
                }
            `}</style>
        </div>
    );
};

export default AchievementToast;
