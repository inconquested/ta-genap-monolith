import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

export default function DemoSection() {
    const [activeNode, setActiveNode] = useState<number | null>(null);

    const COLORS = {
        active: "#f43f5e", // rose-500
        inactive: "#e2e8f0" // slate-200
    };

    const nodes = [
        { 
            id: 1, x: 20, y: 20, 
            label: "Verifikasi Pemilih",
            desc: "Identitas divalidasi dengan aman menggunakan data kredensial kriptografik, memastikan hanya pemilih sah yang dapat memberikan suara."
        },
        { 
            id: 2, x: 70, y: 30, 
            label: "Surat Suara Aman",
            desc: "Setiap surat suara dienkripsi dari perangkat pemilih, menjaga kerahasiaan pilihan dan integritas data."
        },
        { 
            id: 3, x: 40, y: 60, 
            label: "Penghitungan Langsung",
            desc: "Proses rekapitulasi dilakukan secara real-time dan desentralisasi, menghindari manipulasi data terpusat."
        },
        { 
            id: 4, x: 80, y: 70, 
            label: "Audit Trail",
            desc: "Menyediakan jejak rekam (audit trail) transparan yang tidak dapat diubah dan siap diverifikasi oleh publik."
        },
    ];

    return (
        <section id="demo" className="py-32 bg-background text-foreground border-t border-border overflow-hidden" aria-labelledby="demo-heading">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16 max-w-2xl mx-auto">
                    <h2 id="demo-heading" className="text-3xl md:text-4xl font-bold mb-4">Lihat bagaimana kepercayaan dibangun</h2>
                    <p className="text-muted-foreground">Arahkan kursor ke node mana pun untuk melihat alur dan penjelasan sistem yang transparan.</p>
                </div>

                <div className="relative h-[600px] w-full max-w-4xl mx-auto bg-muted/30 rounded-3xl border border-border">
                    {/* SVG Connections */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden="true">
                        {nodes.map((n1, i) =>
                            nodes.slice(i + 1).map((n2) => {
                                const isConnected = activeNode === n1.id || activeNode === n2.id;
                                return (
                                    <motion.line
                                        key={`${n1.id}-${n2.id}`}
                                        x1={`${n1.x}%`} y1={`${n1.y}%`}
                                        x2={`${n2.x}%`} y2={`${n2.y}%`}
                                        animate={{
                                            pathLength: 1,
                                            opacity: isConnected ? 1 : 0.4,
                                            stroke: isConnected ? COLORS.active : COLORS.inactive,
                                            strokeWidth: isConnected ? 3 : 1.5,
                                        }}
                                        initial={{ pathLength: 0, opacity: 0 }}
                                        transition={{
                                            stroke: { duration: 0.4, ease: "easeInOut" },
                                            strokeWidth: { duration: 0.4, ease: "easeInOut" },
                                            opacity: { duration: 0.4, ease: "easeInOut" },
                                            default: { duration: 1, ease: "easeOut" }
                                        }}
                                    />
                                );
                            })
                        )}
                    </svg>

                    {/* Nodes */}
                    {nodes.map((node) => (
                        <div
                            key={node.id}
                            className="absolute z-10 w-32 h-32 -ml-16 -mt-16"
                            style={{ left: `${node.x}%`, top: `${node.y}%` }}
                        >
                            <motion.button
                                className={`w-full h-full rounded-full flex items-center justify-center text-sm font-medium border shadow-md transition-colors duration-500 ease-out ${
                                    activeNode === node.id || activeNode === null
                                        ? "bg-primary text-primary-foreground border-primary"
                                        : "bg-secondary text-secondary-foreground border-border opacity-90"
                                }`}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onMouseEnter={() => setActiveNode(node.id)}
                                onMouseLeave={() => setActiveNode(null)}
                                onFocus={() => setActiveNode(node.id)}
                                onBlur={() => setActiveNode(null)}
                                aria-label={`Highlight ${node.label} connections`}
                            >
                                <span className="text-center px-3 leading-tight">{node.label}</span>
                            </motion.button>
                            
                            {/* Tooltip Dialog */}
                            <AnimatePresence>
                                {activeNode === node.id && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10, x: "-50%", scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, x: "-50%", scale: 1 }}
                                        exit={{ opacity: 0, y: 5, x: "-50%", scale: 0.95 }}
                                        transition={{ duration: 0.2 }}
                                        className="absolute top-[105%] left-1/2 w-64 p-5 bg-popover text-popover-foreground border border-border shadow-xl rounded-xl pointer-events-none z-[100]"
                                    >
                                        <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-popover border-t border-l border-border rotate-45"></div>
                                        <h4 className="font-semibold text-sm mb-2 relative z-10">{node.label}</h4>
                                        <p className="text-xs text-muted-foreground relative z-10 leading-relaxed">{node.desc}</p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
