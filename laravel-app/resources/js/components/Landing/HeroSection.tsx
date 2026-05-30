import { motion, useScroll, useTransform } from 'framer-motion';
import { Suspense, useRef } from 'react';
import { World } from '../ui/globe';
import { globeConfig, sampleArcs } from '@/pages/landing-config';
import { Button } from '../ui/button';
import { ArrowRight } from 'lucide-react';

export default function HeroSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

    return (
        <section 
            ref={containerRef} 
            className="relative min-h-[90vh] flex items-center justify-center bg-background text-foreground overflow-hidden border-b border-border pt-24 pb-16 md:pt-4  md:pb-24" 
            aria-labelledby="hero-heading"
        >
            {/* Clean Background Pattern matching the application */}
            <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />
            
            <motion.div 
                style={{ y, opacity }}
                className="container relative z-10 mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
            >
                {/* Text Content */}
                <div className="flex flex-col items-start text-left">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center rounded-full border border-border bg-muted/50 px-3 py-1 text-sm font-medium mb-6 md:mb-8"
                    >
                        <span className="flex h-2 w-2 rounded-full bg-primary mr-2"></span>
                        Platform Pemilihan Terpercaya
                    </motion.div>
                    
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        id="hero-heading" 
                        className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight mb-6 leading-tight"
                    >
                        Tinggalkan Kertas.<br/>
                        <span className="text-primary">Mulai Percaya.</span>
                    </motion.h1>
                    
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-lg md:text-xl text-muted-foreground mb-8 max-w-lg leading-relaxed"
                    >
                        Sistem pemilihan elektronik yang modern, aman, dan dapat diverifikasi. Berdayakan organisasi Anda dengan hasil instan dan transparansi penuh.
                    </motion.p>
                    
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="flex flex-wrap gap-4"
                    >
                        <Button className='bg-primary px-8 h-12 text-base font-medium group gap-2' onClick={() => window.location.href = "/dashboard"}>
                            Coba Sekarang
                            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                        <Button variant={'outline'} className='px-8 h-12 text-base font-medium bg-background' onClick={() => window.location.href = "/register"}>
                            Pelajari Lebih Lanjut
                        </Button>
                    </motion.div>
                </div>

                {/* Globe Container */}
                <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="relative flex items-center justify-center lg:justify-end h-[400px] md:h-[500px] lg:h-[600px] pointer-events-none"
                >
                    <div className="absolute inset-0 bg-primary/5 rounded-full blur-3xl opacity-50" />
                    <div className="relative w-full h-full max-w-[600px] flex items-center justify-center pointer-events-auto cursor-grab active:cursor-grabbing">
                        <Suspense fallback={<div className="w-64 h-64 bg-muted rounded-full animate-pulse" />}>
                            <World data={sampleArcs} globeConfig={globeConfig} />
                        </Suspense>
                    </div>
                </motion.div>
            </motion.div>
        </section>
    );
}