import { Discover } from "@/components/Discover";
import { HomeDescription } from "@/components/HomeDescription";
import { Investor } from "@/components/Investor";

export default function Index() {
  return (
    <div className="min-h-screen bg-[#030415] text-white relative overflow-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 opacity-20 animate-gradient-xy" />
        <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-gradient-to-tr from-cyan-400 via-indigo-500 to-purple-600 opacity-30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-1/2 h-1/2 bg-gradient-to-bl from-pink-400 via-red-500 to-yellow-500 opacity-30 rounded-full blur-3xl animate-pulse" />
      </div>
      <div className="relative z-10">
        <div className="container mx-auto px-4 py-8">
          <HomeDescription />
          <Discover />
          <Investor />
          {/* <Partner /> */}
        </div>
      </div>
    </div>
  );
}
