import React from 'react';
import {
    Bar,
    BarChart,
    CartesianGrid,
    Cell,
    ResponsiveContainer,
    Tooltip,
    XAxis,
} from 'recharts';
import { useInView } from 'react-intersection-observer';
import { Card } from '../ui/card';

export const VoteVelocityChart = ({
    data,
}: {
    data: { time: string; votes: number }[];
}) => {
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.1, // Trigger earlier for smoothness
    });

    return (
        <Card className="p-1">
            <div className="border-b border-border p-5">
                <h3 className="font-mono text-xs font-bold tracking-widest text-foreground uppercase">
                    Kecepatan Vote
                </h3>
            </div>
            <div className="p-6">
                {/* Added 'transition-opacity' so the chart fades in 
                   smoothly once it's in view, hiding any Recharts "reset" jitter.
                */}
                <div
                    ref={ref}
                    className={`h-52 w-full transition-opacity duration-700 ${inView ? 'opacity-100' : 'opacity-0'}`}
                >
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={data}>
                            <CartesianGrid
                                vertical={false}
                                stroke="var(--muted-foreground)"
                                strokeDasharray="8 8"
                                opacity={0.2}
                            />
                            <XAxis
                                dataKey="time"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fontSize: 10, fontFamily: 'monospace' }}
                                minTickGap={30}
                            />
                            <Tooltip
                                cursor={{ fill: 'rgba(190,18,60,0.08)' }}
                                contentStyle={{
                                    backgroundColor: 'var(--popover)',
                                    border: '1px solid var(--border)',
                                    borderRadius: '4px',
                                    color: 'var(--popover-foreground)',
                                }}
                                labelStyle={{
                                    color: 'var(--popover-foreground)',
                                }}
                                itemStyle={{
                                    color: 'var(--popover-foreground)',
                                }}
                            />
                            <Bar
                                dataKey="votes"
                                radius={[4, 4, 0, 0]}
                                // Only activate animation once inView is true
                                isAnimationActive={inView}
                                animationDuration={750}
                                animationBegin={100} // Tiny delay to ensure DOM is settled
                            >
                                {data.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={index > 9 ? '#f97316' : '#be123c'}
                                        fillOpacity={0.9}
                                    />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </Card>
    );
};