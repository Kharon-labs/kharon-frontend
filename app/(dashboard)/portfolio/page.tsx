import { Suspense } from "react";
import { WalletDashboard } from "@/components/portfolio/wallet-dashboard";
import { PageHeader } from "@/components/ui/page-header";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

export default function PortfolioPage() {
  return (
    <div className="container mx-auto px-12 py-8">
      <PageHeader
        title="Portfolio Tracker"
        description="Monitor your blockchain wallets across multiple networks"
      />

      <Suspense fallback={<LoadingSpinner />}>
        <WalletDashboard />
      </Suspense>
    </div>
  );
}
