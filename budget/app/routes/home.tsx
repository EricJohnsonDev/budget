import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "EDJ Dev | Budget" },
    { name: "home", content: "EDJ Dev Budget homepage" },
  ];
}

export default function Home() {
  return (
    <main className="flex items-center justify-center pt-16 pb-4">
      Home sweet home
    </main>
  );
}
