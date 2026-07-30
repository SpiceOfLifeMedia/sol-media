import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AnalyticsTracker } from '@/components/analytics/AnalyticsTracker';
import { ConsentPreferences } from '@/components/privacy/ConsentPreferences';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Route, Switch, Router as WouterRouter } from 'wouter';

import Home from '@/pages/Home';
import Capabilities from '@/pages/Capabilities';
import Approach from '@/pages/Approach';
import Agency from '@/pages/Agency';
import Privacy from '@/pages/Privacy';
import StartAProject from '@/pages/StartAProject';

import DigitalPresenceAudit from '@/pages/services/DigitalPresenceAudit';
import BrandSystems from '@/pages/services/BrandSystems';
import WebsitesRebuilds from '@/pages/services/WebsitesRebuilds';
import SEOSearchGrowth from '@/pages/services/SEOSearchGrowth';
import SocialContentSystems from '@/pages/services/SocialContentSystems';

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/capabilities" component={Capabilities} />
      <Route path="/approach" component={Approach} />
      <Route path="/agency" component={Agency} />
      <Route path="/privacy" component={Privacy} />
      <Route path="/start-a-project" component={StartAProject} />
      
      <Route path="/services/digital-presence-audit" component={DigitalPresenceAudit} />
      <Route path="/services/brand-systems" component={BrandSystems} />
      <Route path="/services/websites-rebuilds" component={WebsitesRebuilds} />
      <Route path="/services/seo-search-growth" component={SEOSearchGrowth} />
      <Route path="/services/social-content-systems" component={SocialContentSystems} />
      
      <Route component={NotFound} />
    </Switch>
  );
}

type AppProps = {
  ssrPath?: string;
};

function App({ ssrPath }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter
          base={import.meta.env.BASE_URL.replace(/\/$/, '')}
          ssrPath={ssrPath}
        >
          <Router />
          <AnalyticsTracker />
          <ConsentPreferences />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
