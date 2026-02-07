import HomePageHero from "./components/HomePageHero";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center font-sans">
      <main className="flex min-h-screen w-full flex-col items-center justify-between sm:items-start">
        <HomePageHero />
      </main>
    </div>
  );
}
