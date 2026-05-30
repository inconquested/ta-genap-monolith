import { motion, useScroll, useTransform, useMotionTemplate, MotionValue, useMotionValue, useMotionValueEvent } from 'framer-motion';
import { useRef } from 'react';
import { FileText, Lock, TrendingDown, LucideIcon } from 'lucide-react';

// --- Types ---
interface ProblemItem {
    title: string;
    icon: LucideIcon;
    iconColor: string;
    desc: string;
}

const items: ProblemItem[] = [
    {
        title: "Rendahnya Partisipasi",
        icon: TrendingDown,
        iconColor: "text-red-500",
        desc: "Proses manual yang rumit dan metode pemungutan suara yang tidak nyaman menghambat partisipasi."
    },
    {
        title: "Kurangnya Transparansi",
        icon: Lock,
        iconColor: "text-yellow-500",
        desc: "Sistem yang buram dan hasil yang tidak dapat diverifikasi menimbulkan ketidakpercayaan di kalangan peserta."
    },
    {
        title: "Beban Administrasi",
        icon: FileText,
        iconColor: "text-green-500",
        desc: "Perhitungan manual, jejak kertas, dan organisasi yang kacau menguras waktu dan sumber daya yang berharga."
    }
];

// --- Sub-Component for Individual Cards ---
// This ensures hooks are called safely at the top level of a component
function AnimatedCard({ item, index, scrollYProgress }: { item: ProblemItem, index: number, scrollYProgress: MotionValue<number> }) {

    const start = (index * 0.12);
    const end = start + 0.12;

    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        console.log("Scroll Progress:", latest);
    });

    const y = useTransform(scrollYProgress, [start, end], [100, 0]);
    const opacity = useTransform(scrollYProgress, [start, end], [0, 1]);
    const scale = useTransform(scrollYProgress, [start, end], [0.95, 1]);

    const blurRaw = useTransform(scrollYProgress, [start, end], [20, 0]);
    const filter = useMotionTemplate`blur(${blurRaw}px)`;

    return (
        <motion.div
            style={{ y, opacity, scale, filter }}
            className="pl-4 md:pl-6 border-l-2 border-border/50 hover:border-border transition-colors duration-300"
        >
            <div className="flex items-center gap-3 mb-2 md:mb-4">
                <div className={`p-2 rounded-lg bg-muted/50 ${item.iconColor}`}>
                    <item.icon className="w-5 h-5 md:w-6 md:h-6" />
                </div>
                <h3 className="text-lg md:text-xl font-semibold">
                    {item.title}
                </h3>
            </div>

            <p className="text-muted-foreground leading-relaxed text-base md:text-lg">
                {item.desc}
            </p>
        </motion.div>
    );
}

// --- Main Section Component ---
export default function ProblemSection() {
    const ref = useRef<HTMLElement>(null);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"]
    });

    const backgroundY = useTransform(scrollYProgress, [0, 0.9], ["0%", "12%"]);

    const headerOpacity = useTransform(scrollYProgress, [0, 0.15], [0.3, 1]);
    const headerY = useTransform(scrollYProgress, [0, 0.15], [30, 0]);
    const headerBlurRaw = useTransform(scrollYProgress, [0, 0.15], [8, 0]);
    const headerFilter = useMotionTemplate`blur(${headerBlurRaw}px)`;

    return (
        <section
            ref={ref}
            className="relative h-[300vh] bg-background text-foreground"
            aria-labelledby="problem-heading"
        >
            <div className="sticky top-0 h-screen flex flex-col justify-center items-center overflow-hidden">

                {/* Background Pattern */}
                <motion.div
                    style={{ y: backgroundY }}
                    className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none"
                />

                <div className="relative z-10 container mx-auto px-6 max-w-6xl space-y-8 md:space-y-12">

                    {/* Heading */}
                    <motion.h2
                        style={{
                            opacity: headerOpacity,
                            y: headerY,
                            filter: headerFilter
                        }}
                        id="problem-heading"
                        className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight max-w-3xl"
                    >
                        Proses Pemilihan Umum Tradisional Penuh Dengan Kecurangan
                    </motion.h2>

                    {/* Grid Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                        {items.map((item, i) => (
                            <AnimatedCard
                                key={i}
                                item={item}
                                index={i}
                                scrollYProgress={scrollYProgress}
                            />
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
}