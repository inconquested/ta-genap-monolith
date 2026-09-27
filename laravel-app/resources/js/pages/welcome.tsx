import { Head } from '@inertiajs/react';
import LandingNavbar from '@/components/landing/landing-navbar';
import HeroSection from '@/components/landing/hero-section';
import ProblemSection from '@/components/landing/problem-section';
import SolutionSection from '@/components/landing/solution-section';
import DemoSection from '@/components/landing/demo-section';
import FeatureSection from '@/components/landing/feature-section';
import CtaSection from '@/components/landing/cta-section';
import LandingFooter from '@/components/landing/landing-footer';

export default function Welcome() {
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
            </main>
            <LandingFooter />
        </>
    );
}
