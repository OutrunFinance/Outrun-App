import { FFLaunch, Memeverse, outrunAMM, outstake } from "@/constants";
import { Card } from "./Card";
import { DiscoverCard } from "./DiscoverCard";

export function Discover() {
	return (
		<div className="container mx-auto px-4 py-16 md:py-24">
			<h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-12 md:mb-20">
				<span className="bg-gradient-to-r from-blue-400 to-purple-600 text-transparent bg-clip-text">
					Discover The Ecosystem
				</span>
			</h2>
			<div className="flex flex-col gap-16 md:gap-24">
				<DiscoverCard {...outstake} />
				<DiscoverCard {...outrunAMM} />
			</div>
			<div className="mt-16 md:mt-24 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
				<div className="md:self-start">
					<Card {...FFLaunch} />
				</div>
				<div className="md:self-end">
					<Card {...Memeverse} />
				</div>
			</div>
		</div>
	);
}
