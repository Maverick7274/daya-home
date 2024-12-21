import React from "react";
import Image from "next/image";

interface CardProps {
	image: string;
	heading: string;
	description: string;
	url: string;
}

const Card: React.FC<CardProps> = ({ image, heading, description, url }) => {
	return (
		<div className="w-72 p-4 bg-white rounded-lg shadow-lg border">
			<Image
				src={image}
				alt={heading}
                width={288}
                height={160}
				className="w-full h-40 object-cover rounded-lg"
			/>
			<h3 className="mt-4 text-lg font-bold text-gray-800">{heading}</h3>
			<p className="mt-2 text-gray-600 text-sm">{description}</p>
			<a
				href={url}
				target="_blank"
				rel="noopener noreferrer"
				className="mt-4 inline-block text-blue-500 underline"
			>
				Learn More
			</a>
		</div>
	);
};

export default Card;
