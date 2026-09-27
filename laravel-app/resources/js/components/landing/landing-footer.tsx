import { motion } from 'framer-motion';
import { Instagram } from 'lucide-react';

export default function LandingFooter() {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" },
        },
    } as const;

    return (
        <footer id="contact" tabIndex={-1} className="relative overflow-hidden bg-card">
            {/* 108 Supply-style gradient background */}
            <div className="absolute inset-0">
                {/* Primary gradient using theme tokens */}
                <div className="absolute inset-0 bg-gradient-to-b from-signal-rose/[0.07] via-transparent to-transparent" />

                {/* Radial gradient blobs for depth */}
                <motion.div
                    className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-signal-rose/10 rounded-full blur-3xl"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 2 }}
                />
                <motion.div
                    className="absolute -bottom-1/2 right-1/4 w-[600px] h-[600px] bg-accent/15 rounded-full blur-3xl"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 2.5, delay: 0.3 }}
                />

                {/* Overlay gradient using grey-700 */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent" />

                {/* Subtle texture */}
                <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')]" />
            </div>

            {/* Content */}
            <div className="relative z-10">
                {/* Main footer content */}
                <div className="container mx-auto px-6 md:px-8 py-20 md:py-32">
                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-16 mb-16"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                    >
                        {/* Brand section */}
                        <motion.div className="lg:col-span-1 space-y-4" variants={itemVariants}>
                            <h3 className="text-3xl md:text-4xl font-bold text-foreground font-mono">
                                Electa
                            </h3>
                            <p className="text-sm text-foreground/60 leading-relaxed font">
                                Teknologi yang membuat suara setiap pemilih terhitung dengan adil, transparan, dan aman.
                            </p>
                        </motion.div>

                        {/* Documentation */}
                        <motion.div className="space-y-4" variants={itemVariants}>
                                <p className="text-xs uppercase tracking-widest text-primary font-semibold">
                                Dokumentasi
                            </p>
                            <ul className="space-y-3 text-sm">
                                <li>
                                        <a href="#features" className="text-foreground/70 hover:text-primary transition-colors duration-200">
                                        Fitur platform
                                    </a>
                                </li>
                                <li>
                                        <a href="#demo" className="text-foreground/70 hover:text-primary transition-colors duration-200">
                                        Cara kerja
                                    </a>
                                </li>
                                <li>
                                        <a href="#solution" className="text-foreground/70 hover:text-primary transition-colors duration-200">
                                        Solusi
                                    </a>
                                </li>
                            </ul>
                        </motion.div>

                        {/* Legal */}
                        <motion.div className="space-y-4" variants={itemVariants}>
                                <p className="text-xs uppercase tracking-widest text-primary font-semibold">
                                Legal
                            </p>
                            <ul className="space-y-3 text-sm">
                                <li>
                                        <span className="text-muted-foreground">
                                        Lisensi <span className="sr-only">(segera hadir)</span>
                                    </span>
                                </li>
                                <li>
                                        <span className="text-muted-foreground">
                                        Kebijakan Privasi <span className="sr-only">(segera hadir)</span>
                                    </span>
                                </li>
                                <li>
                                        <span className="text-muted-foreground">
                                        Ketentuan Layanan <span className="sr-only">(segera hadir)</span>
                                    </span>
                                </li>
                            </ul>
                        </motion.div>

                        {/* Social */}
                        <motion.div className="space-y-4" variants={itemVariants}>
                                <p className="text-xs uppercase tracking-widest text-primary font-semibold">
                                Ikuti Kami
                            </p>
                            <div className="flex items-center gap-4">
                                <motion.a
                                    href="https://instagram.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                        className="w-10 h-10 rounded-lg bg-primary/10 hover:bg-primary/20 flex items-center justify-center transition-all duration-200 group"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <Instagram className="w-5 h-5 text-primary group-hover:text-primary/80 transition-colors" />
                                </motion.a>
                            </div>
                            <p className="text-xs text-foreground/50 pt-2">
                                @electavoting
                            </p>
                        </motion.div>
                    </motion.div>

                    {/* Divider */}
                    <motion.div
                        className="h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent mb-8"
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    />

                    {/* Bottom section */}
                    <motion.div
                        className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        <motion.div className="space-y-2" variants={itemVariants}>
                            <p className="text-xs text-foreground/60">© 2026 Electa</p>
                            <p className="text-xs text-foreground/50">Made by <span className="text-primary">rvnnaulia</span></p>
                        </motion.div>

                        <motion.div className="text-xs text-foreground/50 space-y-1" variants={itemVariants}>
                            <p>Instagram: <a href="https://instagram.com/rvnnaulia" className="text-primary hover:text-primary/80 transition-colors">@rvnnaulia</a></p>
                        </motion.div>
                    </motion.div>
                </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {/* Grid pattern */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-30" />
            </div>
        </footer>
    );
}