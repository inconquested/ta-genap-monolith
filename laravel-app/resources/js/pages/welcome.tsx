import { Head } from '@inertiajs/react';
import LandingNavbar from '@/components/landing/landing-navbar';
import HeroSection from '@/components/landing/HeroSection';
import ProblemSection from '@/components/landing/ProblemSection';
import SolutionSection from '@/components/landing/SolutionSection';
import DemoSection from '@/components/landing/DemoSection';
import FeatureSection from '@/components/landing/FeatureSection';
import CtaSection from '@/components/landing/CtaSection';
import LandingFooter from '@/components/landing/LandingFooter';
import { usePage } from '@inertiajs/react';
import { SharedData } from '@/types';

export default function Welcome() {
    const { props } = usePage<SharedData>();
    return (
        <>
            <Head>
                <title>Buat, ikut, & pantau polling dengan mudah & aman</title>
                <meta name="description" content="Platform polling online yang aman, mudah digunakan, dan terpercaya." />
            </Head>

            <LandingNavbar />

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
