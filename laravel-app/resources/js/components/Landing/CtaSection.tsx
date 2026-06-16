import { motion, useMotionTemplate, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRef } from 'react';

export default function CtaSection() {
    const sectionRef = useRef<HTMLElement>(null);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "center center"] // Finishes early as requested
    });

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: "easeOut" },
        },
    } as const;

    // --- Dynamic Blur & Focus Logic ---
    const mainBlurRaw = useTransform(scrollYProgress, [0, 0.5], [15, 0]);
    const mainFilter = useMotionTemplate`blur(${mainBlurRaw}px)`;

    // Staggered Opacity for a "fading into focus" feel
    const badgeOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
    const headingOpacity = useTransform(scrollYProgress, [0.1, 0.4], [0, 1]);
    const textOpacity = useTransform(scrollYProgress, [0.2, 0.5], [0, 1]);

    // Background Blob Movement (moves up to meet the text)
    const blobY = useTransform(scrollYProgress, [0, 1], [100, -100]);
    const blobOpacity = useTransform(scrollYProgress, [0, 0.3, 0.8, 1], [0, 0.6, 0.6, 0]);

    // Left Pane Container "Lens" Effect
    const containerBg = useTransform(
        scrollYProgress,
        [0, 0.5],
        ["rgba(255, 255, 255, 0)", "rgba(var(--background-rgb), 0.02)"]
    );

    // --- Right Pane / Visualizer ---
    const rightPaneY = useTransform(scrollYProgress, [0, 0.5], [60, 0]);
    const rightPaneOpacity = useTransform(scrollYProgress, [0, 0.4], [0, 1]);
    const paperY = [
        useTransform(scrollYProgress, [0.3, 0.6], [-60, 0]),
        useTransform(scrollYProgress, [0.4, 0.7], [-60, 0]),
        useTransform(scrollYProgress, [0.5, 0.8], [-60, 0]),
    ];
    const pathLength = useTransform(scrollYProgress, [0.8, 1], [0, 1]);

    return (
        <section
            ref={sectionRef}
            className="relative py-24 md:py-44 bg-background overflow-hidden"
        >
            {/* Interactive Background Blob */}
            <motion.div
                style={{
                    opacity: blobOpacity,
                    y: blobY,
                }}
                className="absolute top-1/4 left-[-10%] w-[500px] h-[500px] rounded-full blur-[120px] dark:bg-primary/20 bg-primary/10 pointer-events-none"
            />

            <div className="container relative z-10 mx-auto px-6 max-w-7xl">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

                    {/* Left Column with Backdrop "Focus" Wrapper */}
                    <motion.div
                        style={{
                            filter: mainFilter,
                            backgroundColor: containerBg,
                            willChange: "filter"
                        }}
                        className="relative p-8 -m-8 rounded-3xl backdrop-blur-[2px] transition-colors duration-500"
                    >
                        <div className="flex flex-col space-y-6 md:space-y-8">
                            <motion.div
                                style={{ opacity: badgeOpacity }}
                                className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border dark:border-primary/30 border-primary/20 dark:bg-primary/10 bg-primary/5 w-fit"
                            >
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                                </span>
                                <span className="text-xs font-medium uppercase tracking-widest opacity-80">
                                    Dipercaya di seluruh Indonesia
                                </span>
                            </motion.div>

                            <motion.div style={{ opacity: headingOpacity }} className="space-y-4">
                                <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight">
                                    Demokratisasi <br />
                                    <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
                                        Pemilihan Digital
                                    </span>
                                </h2>
                            </motion.div>

                            <motion.p
                                style={{ opacity: textOpacity }}
                                className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-xl"
                            >
                                Teknologi yang membuat suara setiap pemilih terhitung dengan adil, transparan, dan aman.
                            </motion.p>
                            {/* Benefits section with refined layout - mode-optimized */}
                            <motion.div className="space-y-5 pt-6" variants={itemVariants}>
                                {[
                                    {
                                        title: "Transparansi Penuh",
                                        description: "Hasil terverifikasi real-time dengan audit trail lengkap"
                                    },
                                    {
                                        title: "Keamanan Tingkat Tinggi",
                                        description: "Enkripsi end-to-end dan validasi berlapis"
                                    },
                                    {
                                        title: "Akses Universal",
                                        description: "Kompatibel dengan semua perangkat dan koneksi"
                                    }
                                ].map((benefit, idx) => (
                                    <motion.div
                                        key={idx}
                                        className="flex gap-4 group"
                                        custom={idx}
                                        variants={itemVariants}
                                    >
                                        <motion.div
                                            className="flex-shrink-0 w-5 h-5 rounded-full dark:border-primary/50 border-primary/35 dark:group-hover:border-primary/70 group-hover:border-primary/50 border flex items-center justify-center mt-1 transition-colors"
                                            whileHover={{ scale: 1.1 }}
                                        >
                                            <motion.div
                                                className="w-2 h-2 rounded-full dark:bg-primary/80 bg-primary/60 dark:group-hover:bg-primary group-hover:bg-primary/80 transition-colors"
                                                initial={{ scale: 0 }}
                                                whileInView={{ scale: 1 }}
                                                transition={{ delay: 0.4 + idx * 0.1, duration: 0.4 }}
                                                viewport={{ once: true }}
                                            />
                                        </motion.div>
                                        <div className="flex-1 min-w-0">
                                            <h4 className="font-semibold dark:text-foreground text-foreground text-sm md:text-base leading-snug">
                                                {benefit.title}
                                            </h4>
                                            <p className="dark:text-foreground/60 text-foreground/55 text-xs md:text-sm mt-1 leading-snug">
                                                {benefit.description}
                                            </p>
                                        </div>
                                    </motion.div>
                                ))}
                            </motion.div>

                        </div>
                    </motion.div>

                    {/* Right Column: Visualizer */}
                    <motion.div
                        style={{ y: rightPaneY, opacity: rightPaneOpacity }}
                        className="flex flex-col items-center lg:items-end"
                    >
                        <div className="relative w-full max-w-sm aspect-[4/3] mb-10 flex items-center justify-center">
                            <div className="relative w-3/4 h-3/4 border-2 rounded-2xl dark:border-primary/40 border-primary/30 bg-background/40 backdrop-blur-xl overflow-hidden shadow-2xl">
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-2 bg-primary/20 rounded-b-lg" />

                                {paperY.map((yVal, idx) => (
                                    <motion.div
                                        key={idx}
                                        style={{
                                            y: yVal,
                                            x: idx * 25 - 25,
                                            rotate: idx * 8 - 8,
                                            zIndex: 3 - idx
                                        }}
                                            className="absolute top-10 left-1/2 -translate-x-1/2 w-16 h-24 md:w-20 md:h-28 bg-card border border-border shadow-xl rounded-md flex items-center justify-center"
                                    >
                                        <svg className="w-10 h-10 text-primary" viewBox="0 0 24 24" fill="none">
                                            <motion.path
                                                d="M20 6L9 17L4 12"
                                                stroke="currentColor"
                                                strokeWidth="3"
                                                strokeLinecap="round"
                                                style={{ pathLength }}
                                            />
                                        </svg>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md lg:max-w-none">
                            <Button size="lg" className="flex-1 h-14 text-lg group bg-primary hover:scale-[1.02] transition-transform">
                                Mulai sekarang
                                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Button>
                            <Button variant="outline" size="lg" className="flex-1 h-14 text-lg">
                                Demo Produk
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}