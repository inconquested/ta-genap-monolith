import { type UserAchievement, type AchievementType } from "@/types";


interface AchievementBadgeProps {
    type: AchievementType;
    userProgress?: UserAchievement; // Optional: if missing, show as "locked"
    size?: 'sm' | 'md' | 'lg';
}

const AchievementBadge: React.FC<AchievementBadgeProps> = ({ 
    type, 
    userProgress, 
    size = 'md' 
}) => {
    const isEarned = !!userProgress?.earned_at;

    // --- CUSTOMIZE: Define your tier logic here ---
    // This maps the requirement_value to a specific "look"
    const getTierDetails = (value: number) => {
        if (value >= 100) return { label: 'Gold', color: 'bg-yellow-400', border: 'border-yellow-600' };
        if (value >= 50) return { label: 'Silver', color: 'bg-slate-300', border: 'border-slate-500' };
        return { label: 'Bronze', color: 'bg-orange-400', border: 'border-orange-700' };
    };

    const tier = getTierDetails(type.requirement_value);

    // --- CUSTOMIZE: Define size variations ---
    const sizeClasses = {
        sm: 'w-12 h-12 text-[10px]',
        md: 'w-20 h-20 text-xs',
        lg: 'w-32 h-32 text-sm'
    };

    return (
        <div className="flex flex-col items-center group relative">
            {/* The Badge Circle */}
            <div className={`
                ${sizeClasses[size]}
                ${tier.color}
                ${tier.border}
                ${isEarned ? 'opacity-100 grayscale-0' : 'opacity-40 grayscale'}
                flex items-center justify-center rounded-full border-4 shadow-lg 
                transition-all duration-300 transform group-hover:scale-110
            `}>
                
                {/* --- CUSTOMIZE: Render different icons based on type.code --- */}
                <span className="font-bold text-center px-1">
                    {type.code === 'VOTES' && '👟'}
                    {type.code === 'POLLS' && '👟'}
                    {type.code === 'POPULAR_VOTES' && '🤝'}
                    {type.code === 'STREAK' && '🔥'}
                    {!['STEPS', 'SOCIAL', 'STREAK'].includes(type.code) && '🏆'}
                </span>

                {/* --- CUSTOMIZE: Add a Ribbon or Overlay --- */}
                {isEarned && (
                    <div className="absolute -bottom-1 hover:bg-green-500 hover:text-white px-2 py-0.5 rounded-full text-[8px] font-bold uppercase">
                        Dicapai
                    </div>
                )}
            </div>

            {/* Labeling */}
            <div className="mt-2 text-center">
                <p className="font-bold leading-tight">{type.name}</p>
                <p className="text-gray-500 italic text-[10px]">{tier.label} Tier</p>
            </div>

            {/* --- CUSTOMIZE: Tooltip / Hover State --- */}
            <div className="absolute z-10 bottom-full mb-2 hidden group-hover:block w-48 p-2 bg-black text-white text-xs rounded shadow-xl">
                <p className="font-bold">{type.name}</p>
                <p className="opacity-80">{type.description}</p>
                <div className="mt-1 border-t border-gray-700 pt-1">
                    Requirement: {type.requirement_value} {type.requirement_type}
                </div>
            </div>
        </div>
    );
};

export default AchievementBadge;