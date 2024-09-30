import type { DiscoverCard as DiscoverCardType } from "@/types";
import { Link } from "@nextui-org/react";
import { DiscoverCardItem } from "./DiscoverCardItem";

export function DiscoverCard({
	title,
	link,
	description,
	items,
	background,
}: DiscoverCardType) {
	return (
		<div className="relative overflow-hidden rounded-2xl bg-gray-900">
			<img
				src={background}
				alt="background"
				className="absolute inset-0 w-full h-full object-cover opacity-50"
			/>
			<div className="relative z-10 p-6 md:p-10">
				<div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 md:mb-12">
					<div>
						<h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
							{title}
						</h3>
						<p className="text-lg text-gray-300">{description}</p>
					</div>
					<Link
						href={link}
						className="mt-4 md:mt-0 px-6 py-3 text-lg text-white bg-purple-600 rounded-full hover:bg-purple-700 transition-colors"
					>
						Learn More &gt;
					</Link>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{items.map((item) => (
						<DiscoverCardItem key={item.title} {...item} />
					))}
				</div>
			</div>
		</div>
	);
}
