import { Sidebar } from "@/components/sidebar/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen flex flex-row justify-start">
      <Sidebar />
      <main className="flex-1 w-full max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 pt-16 ml-8">
        <div className="h-full">{children}</div>
      </main>
    </div>
  );
}
