"use client";

import Link from "next/link";
import linksData, { NavLink } from "@/Data/linksData"; // Import JSON and type
import { useState } from "react";
import Logo from "@/Assets/Logo.svg";
import { cn } from "@/libs/utils";

const Navbar: React.FC = () => {
	const [menuOpen, setMenuOpen] = useState(false);

	return (
		<nav className="sticky top-0 left-0 z-50 w-full px-4 py-4 bg-black border-b border-white">
			<div className="flex items-center justify-center mx-auto max-w-7xl">
				{/* Left Links */}
				<div className="justify-end flex-1 hidden space-x-8 md:flex">
					{linksData
						.slice(0, Math.ceil(linksData.length / 2))
						.map((link: NavLink) => (
							<Link key={link.name} href={link.href}>
								<span className="relative text-white cursor-pointer group">
									{link.name}
									<span className="absolute left-0 bottom-0 w-0 h-0.5 bg-yellow-400 transition-all group-hover:w-full"></span>
								</span>
							</Link>
						))}
				</div>

				{/* Center Logo */}
				<div className="flex items-center justify-center flex-none px-8">
					<Link
						className={cn(
							"flex flex-col items-center justify-center"
						)}
						href="/"
						target="_blank"
					>
						<span>
							<Logo />
						</span>
					</Link>
				</div>

				{/* Right Links */}
				<div className="justify-start flex-1 hidden space-x-8 md:flex">
					{linksData
						.slice(Math.ceil(linksData.length / 2))
						.map((link: NavLink) => (
							<Link key={link.name} href={link.href} target="_blank">
								<span className="relative text-white cursor-pointer group">
									{link.name}
									<span className="absolute left-0 bottom-0 w-0 h-0.5 bg-yellow-400 transition-all group-hover:w-full"></span>
								</span>
							</Link>
						))}
				</div>

				{/* Hamburger Menu (Mobile Only) */}
				<button
					onClick={() => setMenuOpen(!menuOpen)}
					aria-expanded={menuOpen}
					aria-label="Toggle Menu"
					className="md:hidden focus:outline-none"
				>
					<span className="block w-6 h-0.5 bg-white mb-1"></span>
					<span className="block w-6 h-0.5 bg-white mb-1"></span>
					<span className="block w-6 h-0.5 bg-white"></span>
				</button>
			</div>

			{/* Mobile Menu */}
			<div
				className={cn(
					"fixed inset-0 bg-black bg-opacity-90 transform transition-transform duration-500 ease-in-out md:hidden",
					menuOpen ? "translate-x-0" : "translate-x-full"
				)}
			>
				<div className="flex flex-col items-center justify-center h-full space-y-6">
					{linksData.map((link: NavLink) => (
						<Link key={link.name} href={link.href} target="_blank">
							<span
								className="text-xl text-white transition cursor-pointer hover:text-yellow-400"
								onClick={() => setMenuOpen(false)} // Close menu on link click
							>
								{link.name}
							</span>
						</Link>
					))}
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
