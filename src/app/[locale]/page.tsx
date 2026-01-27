
import { Hero } from '@/components/hero';
import { BrandShowcaseClean } from '@/components/brand-showcase-clean';
import { ExperienceTimeline } from '@/components/experience-timeline';
import { useTranslations } from 'next-intl';

export default function Home() {
    const t = useTranslations('homepage');

    // Pass messages object to components that need it
    // We can construct a subset of messages or rely on the component fetching its own if it uses client-side hooks
    // ExperienceTimeline takes `messages` prop.
    // Note: Server Components can pass translations to Client Components

    const messages = {
        homepage: {
            career_journey: {
                title: t('career_journey.title'),
                description: t('career_journey.description')
            }
        }
    };

    return (
        <main>
            <Hero />
            <BrandShowcaseClean />
            <ExperienceTimeline messages={messages} />
        </main>
    );
}
