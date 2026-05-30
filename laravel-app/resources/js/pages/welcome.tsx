import { Head } from '@inertiajs/react';
import HeroSection from '@/components/Landing/HeroSection';
import ProblemSection from '@/components/Landing/ProblemSection';
import SolutionSection from '@/components/Landing/SolutionSection';
import DemoSection from '@/components/Landing/DemoSection';
import FeatureSection from '@/components/Landing/FeatureSection';
import CtaSection from '@/components/Landing/CtaSection';
import LandingFooter from '@/components/Landing/LandingFooter';
import { usePage } from '@inertiajs/react';
import { SharedData } from '@/types';

export default function Welcome() {
    const { props } = usePage<SharedData>();
    const { auth } = props;


    return (
        <>
            <Head>
                <title>Buat, ikut, & pantau polling dengan mudah & aman</title>
                <meta name="description" content="Platform polling online yang aman, mudah digunakan, dan terpercaya." />
            </Head>

            <main className="min-h-screen bg-background antialiased selection:bg-primary selection:text-primary-foreground">
                <HeroSection />
                <ProblemSection />
                <SolutionSection />
                <DemoSection />
                <FeatureSection />
                <CtaSection />
                <LandingFooter />
            </main>
        </>
    );
}
