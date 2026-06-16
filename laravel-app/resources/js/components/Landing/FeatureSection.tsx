import { motion } from 'framer-motion';

const features = [
    {
        title: "Pemilihan yang aman dan transparan",
        outcome: "100% Terpercaya",
        desc: "Enkripsi end-to-end memastikan setiap suara dicoblos, tidak dapat diubah, dan mudah diverifikasi.",
        align: "left"
    },
    {
        title: "Hasil Real-time & Analytics",
        outcome: "Tanpa Penghitungan Manual",
        desc: "Lihat hasil voting secara real-time dengan dashboard lengkap dan analisis voting yang komprehensif.",
        align: "right"
    },
    {
        title: "Pengalaman Voting 1-klik",
        outcome: "Meningkatkan partisipasi pemilih dengan mudah",
        desc: "Impor pemilih, kirim pengingat otomatis, dan lacak partisipasi dengan alat manajemen kami yang intuitif.",
        align: "left"
    }
];

export default function FeatureSection() {
    return (
        <section className="py-32 bg-background" aria-labelledby="features-heading">
            <div className="container mx-auto px-6 max-w-5xl">
                <h2 id="features-heading" className="sr-only">Platform Features</h2>

                <div className="space-y-32">
                    {features.map((feature, i) => (
                        <div key={i} className={`flex flex-col md:flex-row gap-12 items-center ${feature.align === 'right' ? 'md:flex-row-reverse' : ''}`}>
                            <div className="flex-1 space-y-6">
                                <h3 className="text-3xl font-bold text-foreground">{feature.title}</h3>
                                <p className="text-xl text-muted-foreground">{feature.desc}</p>
                                <div className="inline-block bg-primary/10 text-primary font-medium px-4 py-2 rounded-full text-sm">
                                    Outcome: {feature.outcome}
                                </div>
                            </div>

                            <motion.div
                                className="flex-1 w-full aspect-[4/3] bg-muted rounded-2xl relative overflow-hidden group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                tabIndex={0}
                                whileHover="hover"
                                whileFocus="hover"
                                aria-label={`View feature: ${feature.title}`}
                            >
                                <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary/20 group-focus:border-primary/20 rounded-2xl transition-colors duration-300" />

                                {/* Micro-interaction visual abstract */}
                                <motion.div
                                    variants={{
                                        hover: { scale: 1.05, rotate: 2 }
                                    }}
                                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                    className="absolute inset-12 bg-background rounded-xl shadow-lg border border-border flex items-center justify-center"
                                >
                                    <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center">
                                        <div className="w-6 h-6 bg-primary rounded-full" />
                                    </div>
                                </motion.div>
                            </motion.div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
