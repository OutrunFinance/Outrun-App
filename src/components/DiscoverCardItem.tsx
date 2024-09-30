import type { CardItem } from "@/types";
import { Button } from "@nextui-org/react";

export function DiscoverCardItem({ icon, title, description, link }: CardItem) {
	return (
		<div className="bg-gray-800 bg-opacity-50 backdrop-blur-md rounded-xl p-6 flex flex-col items-center text-center">
			<img src={icon} alt={title} className="w-24 h-24 mb-4" />
			<h4 className="text-xl font-semibold text-white mb-2">{title}</h4>
			<p className="text-gray-300 mb-6">{description}</p>
			<Button
				href={link}
				as="a"
				className="bg-purple-600 text-white px-6 py-2 rounded-full hover:bg-purple-700 transition-colors"
			>
				Enter now &gt;
			</Button>
		</div>
	);
}
