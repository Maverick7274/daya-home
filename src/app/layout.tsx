import type { Metadata } from "next";
import "./globals.css";
import { cn } from "@/libs/utils";
import Navbar from "@/Components/Header/Navbar";

export const metadata: Metadata = {
	title: "Divya Devraha",
	description: "Parent Website for the Divya Devraha",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={cn()}>
				<Navbar />
				{children}
			</body>
		</html>
	);
}
