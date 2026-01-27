import { Head, Link, usePage } from '@inertiajs/react';
import { ArrowRight, Bell, CirclePlusIcon, } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem, type SharedData } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

export default function Dashboard() {
    const {auth} = usePage<SharedData>().props;
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-4">
                <div className='flex items-center justify-between'>
                    <div>
                        <h1 className="my-0 font-mono text-5xl font-bold tracking-wide">
                            Halo, {auth.user.username}
                        </h1>
                        <p className="my-0 font-mono leading-tight text-muted-foreground">
                            Apa yang bakal kamu pilih hari ini?
                        </p>
                    </div>
                    <div className='flex gap-2'>
                        <Input 
                        className='rounded-sm font-mono placeholder-neutral-50/10'
                        placeholder='Cari Poll...'/>
                        <Button variant={'outline'} className='rounded-sm'>
                            <Bell/>
                        </Button>
                    </div>
                </div>
                <div className="flex flex-col md:flex-row h-64 gap-6 md:h-36 w-full justify-between rounded-lg border border-neutral-500/25 bg-linear-[120deg] from-orange-400/12 via-neutral-800/50 via-25% to-neutral-900/50 px-8 antialiased bg-blend-color">
                    <div className="pt-4">
                        <h1 className="font-mono md:text-4xl font-bold">
                            Buat Polling Baru!
                        </h1>
                        <p className="shrink font-mono font-normal md:text-md leading-4 mt-1 max-w-xl text-muted-foreground opacity-75 tracking-wider">
                            Buat polling instan dan dapatkan feedback dari
                            komunitas, ikut serta dalam topik hangat atau
                            pecahkan masalah tim bersama
                        </p>
                    </div>
                    <div className="flex h-full items-center mb-4 md:mb-0">
                        <Button
                        variant={'ctasec'}
                            size={'lg'}
                        >
                            <CirclePlusIcon  />
                            Buat Poll
                        </Button>
                    </div>
                </div>
                <div className='w-full'>
                    <div className='flex justify-between'>
                        <p className='text-2xl font-mono'>Poll Terbaru Anda</p>
                        <Link className='text-sm flex items-center group gap-2'>
                        Kelola Semua
                        <ArrowRight strokeWidth={1.5} className='group-hover:translatex-x-0.5'/>
                        </Link>
                    </div>
                    <div className='w-full grid grid-cols-3'>

                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
