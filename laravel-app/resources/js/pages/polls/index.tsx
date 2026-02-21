import { Head } from '@inertiajs/react';
import { Clock, MessageSquare, ThumbsUp, Users } from 'lucide-react';
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';

// Assuming these are your shadcn imports.
// If you don't have them, standard HTML/Tailwind works too.
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { Poll } from '@/types';

import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    type ChartConfig,
} from '@/components/ui/chart';

// --- MOCK DATA FOR THE CHART ---
const velocityData = [
    { time: '10:00 AM', votes: 12 },
    { time: '10:15 AM', votes: 18 },
    { time: '10:30 AM', votes: 25 },
    { time: '10:45 AM', votes: 22 },
    { time: '11:00 AM', votes: 35 },
    { time: '11:15 AM', votes: 48 },
    { time: '11:30 AM', votes: 42 },
    { time: '11:45 AM', votes: 55 }, // Peak
    { time: '12:00 PM', votes: 50 },
    { time: '12:15 PM', votes: 65 },
    { time: '12:30 PM', votes: 62 },
    { time: '12:45 PM', votes: 60 },
    { time: '01:00 PM', votes: 72 }, // High
    { time: '01:15 PM', votes: 45 },
    { time: '01:30 PM', votes: 30 },
    { time: '02:00 PM', votes: 28 },
];

const chartConfig = {
    votes: {
        label: 'Votes',
        color: 'hsl(var(--chart-1))',
    },
} satisfies ChartConfig;

// --- PAGE COMPONENT ---
export default function Index({ poll }: { poll?: Poll }) {
    // Fallback title if prop is missing for preview
    const title =
        poll?.title ||
        'Which architectural pattern should we adopt for the new microservices refactor?';

    return (
        <AppLayout>
            <Head title={title} />

            {/* Main Grid Background wrapper */}
            <div className="flex min-h-screen justify-center bg-gray-50/50 p-4 lg:p-8">
                <div className="w-full max-w-4xl space-y-6">
                    {/* --- HEADER SECTION --- */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 font-mono text-xs tracking-wider text-muted-foreground uppercase">
                            <span>Poll ID: #E11340</span>
                            <span>//</span>
                            <span>Category: Engineering</span>
                        </div>

                        <h1 className="font-serif text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
                            {title}
                        </h1>

                        <div className="flex items-center gap-6 font-mono text-sm text-muted-foreground">
                            <div className="flex items-center gap-2">
                                <Users className="h-4 w-4" />
                                <span>1,248 Votes</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4" />
                                <span>Ends in 04:23:12</span>
                            </div>
                        </div>
                    </div>

                    {/* --- CARD 1: REAL-TIME DISTRIBUTION --- */}
                    <Card className="border-none bg-white shadow-sm">
                        <CardHeader className="pb-4">
                            <div className="flex items-center justify-between">
                                <h3 className="font-mono text-sm font-bold tracking-widest text-gray-700 uppercase">
                                    Real-Time Distribution
                                </h3>
                                <div className="flex gap-2">
                                    <ThumbsUp className="h-4 w-4 text-muted-foreground" />
                                    <Clock className="h-4 w-4 text-muted-foreground" />
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {/* Option 1 */}
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm font-semibold">
                                    <span>Event-Driven Architecture (EDA)</span>
                                    <span className="text-pink-500">45%</span>
                                </div>
                                <div className="relative h-12 w-full overflow-hidden rounded-md bg-gray-100">
                                    <div
                                        className="absolute top-0 left-0 h-full rounded-md bg-gradient-to-r from-slate-600 via-rose-500 to-orange-400"
                                        style={{ width: '45%' }}
                                    />
                                </div>
                            </div>

                            {/* Option 2 */}
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm font-semibold">
                                    <span>Domain-Driven Design (DDD)</span>
                                    <span className="text-orange-400">32%</span>
                                </div>
                                <div className="relative h-12 w-full overflow-hidden rounded-md bg-gray-100">
                                    <div
                                        className="absolute top-0 left-0 h-full rounded-md bg-gradient-to-r from-slate-500 to-orange-300"
                                        style={{ width: '32%' }}
                                    />
                                </div>
                            </div>

                            {/* Option 3 */}
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm font-semibold">
                                    <span>Hexagonal Architecture</span>
                                    <span className="text-gray-500">15%</span>
                                </div>
                                <div className="relative h-12 w-full overflow-hidden rounded-md bg-gray-100">
                                    <div
                                        className="absolute top-0 left-0 h-full rounded-md bg-gradient-to-r from-rose-200 to-rose-300"
                                        style={{ width: '15%' }}
                                    />
                                </div>
                            </div>

                            {/* Option 4 */}
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm font-semibold text-muted-foreground">
                                    <span>Monolithic (Keep as is)</span>
                                    <span>8%</span>
                                </div>
                                <div className="relative h-12 w-full overflow-hidden rounded-md bg-gray-100">
                                    <div
                                        className="absolute top-0 left-0 h-full rounded-md bg-gray-200"
                                        style={{ width: '8%' }}
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* --- CARD 2: VOTE VELOCITY (CHART) --- */}
                    <Card className="border-none bg-white shadow-sm">
                        <CardHeader>
                            <h3 className="font-mono text-sm font-bold tracking-widest text-gray-700 uppercase">
                                Vote Velocity
                            </h3>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[200px] w-full">
                                <ChartContainer
                                    config={chartConfig}
                                    className="h-full w-full"
                                >
                                    <BarChart
                                        data={velocityData}
                                        margin={{
                                            top: 0,
                                            right: 0,
                                            bottom: 0,
                                            left: 0,
                                        }}
                                    >
                                        <CartesianGrid
                                            vertical={false}
                                            strokeDasharray="3 3"
                                            stroke="#f0f0f0"
                                        />
                                        <XAxis
                                            dataKey="time"
                                            tickLine={false}
                                            axisLine={false}
                                            tickMargin={10}
                                            minTickGap={30}
                                            tickFormatter={(value) => value}
                                            style={{
                                                fontSize: '10px',
                                                fill: '#888',
                                            }}
                                        />
                                        <ChartTooltip
                                            cursor={{
                                                fill: 'rgba(0,0,0,0.05)',
                                            }}
                                            content={<ChartTooltipContent />}
                                        />
                                        {/* The gradient look is achieved by individual bar fills or a global gradient def */}
                                        <Bar
                                            dataKey="votes"
                                            radius={[2, 2, 0, 0]}
                                            // Using a function to alternate colors slightly or keeping uniform pink/orange
                                            fill="url(#colorGradient)"
                                        />
                                        <defs>
                                            <linearGradient
                                                id="colorGradient"
                                                x1="0"
                                                y1="0"
                                                x2="0"
                                                y2="1"
                                            >
                                                <stop
                                                    offset="0%"
                                                    stopColor="#fbbf24"
                                                    stopOpacity={0.8}
                                                />
                                                <stop
                                                    offset="100%"
                                                    stopColor="#f43f5e"
                                                    stopOpacity={0.8}
                                                />
                                            </linearGradient>
                                        </defs>
                                    </BarChart>
                                </ChartContainer>
                            </div>
                        </CardContent>
                    </Card>

                    {/* --- CARD 3: COMMUNITY DISCUSSION --- */}
                    <Card className="border-none bg-white shadow-sm">
                        <CardHeader className="flex flex-row items-center justify-between pb-6">
                            <div className="flex items-center gap-2">
                                <h3 className="font-mono text-sm font-bold tracking-widest text-gray-700 uppercase">
                                    Community Discussion
                                </h3>
                                <span className="rounded bg-gray-100 px-2 py-0.5 text-xs font-bold text-gray-600">
                                    42
                                </span>
                            </div>
                            <div className="flex cursor-pointer items-center gap-2 text-xs font-bold text-red-500">
                                <span>SORT BY: TOP RATED</span>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-8">
                            {/* Input Area */}
                            <div className="flex gap-4">
                                <div className="h-10 w-10 shrink-0 rounded-full bg-orange-500" />{' '}
                                {/* Avatar Placeholder */}
                                <div className="flex-1 space-y-2">
                                    <Textarea
                                        placeholder="Join the discussion..."
                                        className="min-h-[100px] resize-none border-gray-200 bg-gray-50 focus-visible:ring-gray-300"
                                    />
                                    <div className="flex items-center justify-between pt-1">
                                        <span className="text-xs text-muted-foreground">
                                            Markdown supported
                                        </span>
                                        <Button
                                            size="sm"
                                            className="bg-slate-800 font-mono text-xs text-white hover:bg-slate-700"
                                        >
                                            POST COMMENT
                                        </Button>
                                    </div>
                                </div>
                            </div>

                            {/* Comment 1 */}
                            <div className="flex gap-4">
                                <Avatar className="h-10 w-10 border border-gray-100">
                                    <AvatarImage src="/placeholder-avatar-1.jpg" />
                                    <AvatarFallback className="bg-orange-100 text-orange-600">
                                        AD
                                    </AvatarFallback>
                                </Avatar>
                                <div className="flex-1 space-y-1">
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm font-bold text-gray-900">
                                            alex_dev_99
                                        </span>
                                        <span className="text-xs text-muted-foreground">
                                            2h ago
                                        </span>
                                        <Badge
                                            variant="secondary"
                                            className="h-5 rounded-sm border-none bg-pink-100 px-1.5 font-mono text-[10px] text-pink-600 hover:bg-pink-100"
                                        >
                                            VOTED EDA
                                        </Badge>
                                    </div>
                                    <p className="text-sm leading-relaxed text-gray-600">
                                        EDA is definitely the way to go for
                                        scalability. The decoupling it provides
                                        is essential for our team size. We
                                        struggled with the Monolith for too
                                        long.
                                    </p>
                                    <div className="flex items-center gap-4 pt-1">
                                        <button className="flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-gray-900">
                                            <ThumbsUp className="h-3 w-3" /> 12
                                        </button>
                                        <button className="flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-gray-900">
                                            <MessageSquare className="h-3 w-3" />{' '}
                                            Reply
                                        </button>
                                    </div>

                                    {/* Threaded Reply */}
                                    <div className="mt-4 flex gap-4 border-l-2 border-gray-100 pt-2 pl-4">
                                        <Avatar className="h-8 w-8">
                                            <AvatarImage src="/placeholder-avatar-2.jpg" />
                                            <AvatarFallback className="bg-green-100 text-green-700">
                                                SC
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="flex-1 space-y-1">
                                            <div className="flex items-center gap-2">
                                                <span className="text-sm font-bold text-gray-900">
                                                    sarah_connor
                                                </span>
                                                <span className="text-xs text-muted-foreground">
                                                    1h ago
                                                </span>
                                            </div>
                                            <p className="text-sm text-gray-600">
                                                Agreed, but complexity increases
                                                significantly. We need strong
                                                monitoring tools before
                                                committing.
                                            </p>
                                            <div className="flex items-center gap-4 pt-1">
                                                <button className="flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-gray-900">
                                                    <ThumbsUp className="h-3 w-3" />{' '}
                                                    5
                                                </button>
                                                <button className="flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-gray-900">
                                                    <MessageSquare className="h-3 w-3" />{' '}
                                                    Reply
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Comment 2 */}
                            <div className="flex gap-4">
                                <Avatar className="h-10 w-10">
                                    <AvatarFallback className="bg-indigo-600 text-white">
                                        MK
                                    </AvatarFallback>
                                </Avatar>
                                <div className="flex-1 space-y-1">
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm font-bold text-gray-900">
                                            m_k_ultra
                                        </span>
                                        <span className="text-xs text-muted-foreground">
                                            4h ago
                                        </span>
                                        <Badge
                                            variant="secondary"
                                            className="h-5 rounded-sm border-none bg-orange-100 px-1.5 font-mono text-[10px] text-orange-600 hover:bg-orange-100"
                                        >
                                            VOTED HEXAGONAL
                                        </Badge>
                                    </div>
                                    <p className="text-sm leading-relaxed text-gray-600">
                                        Don't sleep on Hexagonal architecture.
                                        It makes testing the business logic so
                                        much easier without mocking everything.
                                        Clean Architecture is the future.
                                    </p>
                                    <div className="flex items-center gap-4 pt-1">
                                        <button className="flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-gray-900">
                                            <ThumbsUp className="h-3 w-3" /> 8
                                        </button>
                                        <button className="flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-gray-900">
                                            <MessageSquare className="h-3 w-3" />{' '}
                                            Reply
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
