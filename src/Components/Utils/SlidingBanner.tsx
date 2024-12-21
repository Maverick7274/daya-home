"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export interface SlidingBannerProps {
	items: {
		name: string;
		image: string;
		heading: string;
		description: string;
		url: string;
	}[];
	interval?: number; // Optional prop for slide interval
	className?: string; // Optional className for styling
}

const SlidingBanner: React.FC<SlidingBannerProps> = ({
	items,
	interval = 5000, // Default slide interval of 5 seconds
	className = "",
}) => {
	const [currentIndex, setCurrentIndex] = useState(0);

	useEffect(() => {
		const timer = setInterval(() => {
			setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
		}, interval);

		return () => clearInterval(timer); // Cleanup interval on unmount
	}, [items, interval]);

	return (
		<div
			className={`relative w-full h-screen overflow-hidden ${className}`}
		>
			{items.map((item, index) => (
				<motion.div
					key={item.name}
					className={`absolute inset-0 w-full h-full`}
					initial={{ opacity: 0, x: 50 }}
					animate={
						index === currentIndex
							? { opacity: 1, x: 0 }
							: { opacity: 0, x: -50 }
					}
					transition={{ duration: 0.5 }}
					style={{
						backgroundImage: `url(${item.image})`,
						backgroundSize: "cover",
						backgroundPosition: "center",
					}}
				>
					{/* Semi-Transparent Black Overlay */}
					<div className="absolute inset-0 bg-black bg-opacity-50"></div>

					{/* Content Overlay */}
					<div className="relative z-10 flex flex-col items-center justify-center h-full px-4 space-y-6 text-white">
						{/* Heading */}
						<h2 className="px-6 py-2 text-3xl font-bold text-yellow-400 bg-black bg-opacity-75 rounded-md">
							{item.heading}
						</h2>

						{/* Description */}
						<p className="px-4 py-2 text-lg text-center text-gray-300 bg-black bg-opacity-75 rounded-md">
							{item.description}
						</p>

						{/* Learn More Button */}
						<a
							href={item.url}
							target="_blank"
							rel="noopener noreferrer"
							className="px-6 py-3 font-semibold text-black bg-yellow-400 rounded-full hover:bg-yellow-500"
						>
							Learn More
						</a>
					</div>
				</motion.div>
			))}
		</div>
	);
};

export default SlidingBanner;
