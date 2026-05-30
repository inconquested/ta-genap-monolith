import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Button } from '../ui/button';
import { ArrowRight, BarChart3, Clock, Cpu, MessageSquare, MoreHorizontal, Share2 } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

function MockPollCard({ title, votes, author }: { title: string, votes: string, author: string }) {
    return (
        <div className="w-full rounded-xl border border-border bg-background shadow-sm overflow-hidden mb-4">
            <div className="p-4">
                <div className="mb-4 flex items-start justify-between">
                    <div className="flex gap-3">
                        <Avatar className="h-10 w-10 border border-border">
                            <AvatarFallback className="bg-muted text-muted-foreground">{author[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                            <h4 className="text-sm font-bold tracking-tight text-foreground">
                                {author}
                            </h4>
                            <p className="font-mono text-xs text-muted-foreground">
                                Diposting 2 Jam yang Lalu • <span className="text-primary font-bold">PEMILIHAN</span>
                            </p>
                        </div>
                    </div>
                    <MoreHorizontal className="text-muted-foreground" size={20} />
                </div>

                <h3 className="mb-4 text-lg font-bold tracking-tight text-foreground">
                    {title}
                </h3>

                <div className="mb-4 rounded-lg border border-border bg-muted/30 p-4">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-mono text-[10px] font-bold tracking-widest text-muted-foreground uppercase">
                            Distribusi Real-time
                        </h3>
                        <div className="flex items-center gap-2">
                            <span className="flex h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
                            <Cpu className="h-3 w-3 text-muted-foreground" />
                        </div>
                    </div>

                    <div className="space-y-3">
                        <div className="relative h-8 w-full overflow-hidden rounded bg-muted">
                            <div className="absolute inset-y-0 left-0 bg-rose-500 w-[65%]" />
                            <div className="absolute inset-0 flex items-center justify-between px-3 text-sm font-medium">
                                <span>Kandidat A</span>
                                <span>65%</span>
                            </div>
                        </div>
                        <div className="relative h-8 w-full overflow-hidden rounded bg-muted">
                            <div className="absolute inset-y-0 left-0 bg-primary/20 w-[35%]" />
                            <div className="absolute inset-0 flex items-center justify-between px-3 text-sm font-medium">
                                <span>Kandidat B</span>
                                <span>35%</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-between border-t border-border pt-4 text-muted-foreground">
                    <div className="flex gap-4 font-mono text-[10px] uppercase font-medium">
                        <span className="flex items-center gap-1.5"><BarChart3 size={14} /> {votes} Votes</span>
                        <span className="flex items-center gap-1.5"><Clock size={14} /> 2 Days Left</span>
                    </div>
                    <div className="flex gap-4">
                        <MessageSquare size={16} />
                        <Share2 size={16} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function SolutionSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const yMove = useTransform(scrollYProgress, [0, 1], [0, -200]);

    return (
        <section ref={containerRef} className="py-32 bg-secondary/30 overflow-hidden relative" aria-labelledby="solution-heading">
            <div className="container mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <div className="order-2 lg:order-1 relative h-[600px] rounded-2xl bg-card p-4 md:p-8 overflow-hidden shadow-2xl border border-border">
                        <motion.div style={{ y: yMove }} className="absolute inset-x-4 md:inset-x-8 top-8 flex flex-col">
                            <MockPollCard
                                author="KPU_Official"
                                title="Pemilihan Ketua BEM Universitas 2026"
                                votes="1,245"
                            />
                            <MockPollCard
                                author="Osis_SMA"
                                title="Voting Kandidat Ketua OSIS Periode 2026/2027"
                                votes="843"
                            />
                            <MockPollCard
                                author="HMJ_Teknik"
                                title="Pemilihan Ketua Himpunan Mahasiswa"
                                votes="420"
                            />
                        </motion.div>

                        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-card to-transparent z-10 pointer-events-none" />
                        <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-card to-transparent z-10 pointer-events-none" />
                    </div>

                    <div className="order-1 lg:order-2 space-y-8">
                        <h2 id="solution-heading" className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
                            Pilihan tepat untuk pemilihan yang adil dan transparan
                        </h2>
                        <p className="text-lg text-muted-foreground leading-relaxed">
                            Lupakan metode lama. Platform kami memastikan setiap suara dicoblos, dihitung, dan diverifikasi secara real-time, memberikan hasil yang tidak dapat dipertanyakan yang dapat Anda percayai.
                        </p>
                        <Button variant={'brand'} className='px-8 text-base font-medium group gap-2 h-12' asChild>
                            <a href="/register">
                                Coba sekarang
                                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-all duration-300" />
                            </a>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}
