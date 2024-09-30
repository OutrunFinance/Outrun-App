import type { CardContent } from "@/types";
import { Button } from "@nextui-org/react";

export function Card({
	title,
	background,
	text,
	multiText,
	enterLink,
}: CardContent) {
	return (
		<div className="relative overflow-hidden rounded-2xl bg-gray-900 text-white">
			<img
				src={background}
				alt="background"
				className="absolute inset-0 w-full h-full object-cover opacity-50"
			/>
			<div className="relative z-10 p-6 md:p-10">
				<h3 className="text-2xl md:text-3xl font-bold mb-4">{title}</h3>
				<p className="text-lg text-gray-300 mb-6">{text}</p>
				<div className="space-y-2 mb-8">
					{multiText.map((item) => (
						<p key={item} className="text-gray-400">
							{item}
						</p>
					))}
				</div>
				<div className="flex flex-col sm:flex-row gap-4">
					<Button
						href={enterLink}
						as="a"
						className={`px-6 py-2 rounded-full text-white ${
							title === "FFLaunch"
								? "bg-purple-600 hover:bg-purple-700"
								: "bg-transparent border border-purple-400 hover:bg-purple-900"
						} transition-colors`}
					>
						Enter now &gt;
					</Button>
					<Button
						href={enterLink}
						as="a"
						className="px-6 py-2 rounded-full text-white bg-transparent border border-purple-400 hover:bg-purple-900 transition-colors"
					>
						Learn more &gt;
					</Button>
				</div>
			</div>
		</div>
	);
}
