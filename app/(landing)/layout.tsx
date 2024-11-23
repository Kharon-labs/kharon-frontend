export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className=" h-screen flex flex-row justify-start">
      <main className=" flex-1 w-full max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
}
