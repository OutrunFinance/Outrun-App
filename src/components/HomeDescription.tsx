import { Button } from "@nextui-org/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export function HomeDescription() {
	return (
		<div className="relative flex flex-col items-center justify-center text-center max-w-5xl mx-auto px-4 py-20 overflow-hidden">
			<div className="relative z-10">
				<h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-8">
					<span className="block bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 text-transparent bg-clip-text animate-gradient">
						Exploring The
					</span>
					<span className="block bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 text-transparent bg-clip-text animate-gradient">
						Fairest DeFi
					</span>
					<span className="block bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 text-transparent bg-clip-text animate-gradient">
						Community
					</span>
				</h1>
				<p className="text-gray-300 text-xl md:text-2xl mb-12 max-w-2xl mx-auto">
					Trade, earn, and build with community on the all-in-one DeFi platform
				</p>
				<div className="flex flex-wrap justify-center gap-6">
					<ConnectButton />
					<Button
						href="https://outrun.gitbook.io/"
						as="a"
						target="_blank"
						className="px-8 py-4 rounded-full text-lg font-semibold bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 text-white hover:from-blue-600 hover:via-purple-700 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl"
					>
						Learn More
					</Button>
				</div>
			</div>
		</div>
	);
}
