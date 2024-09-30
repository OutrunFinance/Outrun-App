import { Image } from "@nextui-org/react";
import Link from "next/link";

export function Footer() {
	return (
		<footer className="bg-gray-900 text-white py-8 px-4">
			<div className="container mx-auto">
				<div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
					<p className="text-sm md:text-base font-semibold">©2024 - Outrun</p>
					<nav className="flex flex-wrap justify-center md:justify-end items-center gap-4 md:gap-8">
						<Link
							href="/terms"
							className="text-sm md:text-base hover:text-purple-400 transition-colors"
						>
							Terms
						</Link>
						<Link
							href="/privacy"
							className="text-sm md:text-base hover:text-purple-400 transition-colors"
						>
							Privacy
						</Link>
						<Link
							href="https://outrun.gitbook.io/"
							target="_blank"
							className="text-sm md:text-base hover:text-purple-400 transition-colors"
						>
							Docs
						</Link>
						{/* <div className="flex items-center gap-4">
							<a
								href="https://discord.gg/outrun"
								target="_blank"
								rel="noopener noreferrer"
								aria-label="Join our Discord"
							>
								<img
									src="/images/discord.svg"
									alt="Discord"
									width={24}
									height={24}
									className="w-6 h-6 hover:opacity-80 transition-opacity"
								/>
							</a>
							<a
								href="https://twitter.com/outrun"
								target="_blank"
								rel="noopener noreferrer"
								aria-label="Follow us on Twitter"
							>
								<img
									src="/images/x.svg"
									alt="Twitter"
									width={24}
									height={24}
									className="w-6 h-6 hover:opacity-80 transition-opacity"
								/>
							</a>
						</div> */}
					</nav>
				</div>
			</div>
		</footer>
	);
}
