import { ProfileHeader } from "@/components/profile/profile-header";
import { WalletSection } from "@/components/profile/wallet-section";

export default function ProfilePage() {
  return (
    <div className="max-w-[1200px] w-full px-10 py-6">
      <ProfileHeader />
      <WalletSection />
    </div>
  );
}
