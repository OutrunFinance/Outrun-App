import { CompanyName } from "@/constants";

export function Investor() {
	return (
		<div className="container mx-auto px-4 py-16">
			<h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
				<span className="bg-gradient-to-r from-blue-400 to-purple-600 text-transparent bg-clip-text">
					Investors
				</span>
			</h2>
			<div className="relative rounded-3xl overflow-hidden">
				<div className="absolute inset-0 bg-gradient-to-br from-purple-900 to-blue-900 opacity-50" />
				<div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-8 md:p-12">
					{CompanyName.map((item) => (
						<div
							key={item}
							className="bg-gray-800 bg-opacity-50 backdrop-blur-md rounded-xl p-6 flex items-center justify-center"
						>
							<span className="text-white text-xl md:text-2xl font-semibold text-center">
								{item}
							</span>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
