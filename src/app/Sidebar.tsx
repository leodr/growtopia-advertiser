import React, { ReactElement } from 'react';
import { Link, useLocation } from 'react-router-dom';

export function Sidebar(): ReactElement {
	return (
		<div className="draggable relative flex-none flex flex-col w-24 pt-7 pb-4 bg-gray-800 h-screen">
			<div className="mt-2 flex-1 h-0 overflow-y-auto">
				<nav className="px-2">
					<div className="space-y-2">
						<Item
							href="/"
							iconPath={
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
								/>
							}
							label="Controls"
						/>
						<Item
							href="/account"
							iconPath={
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
								/>
							}
							label="Account"
						/>
						<Item
							href="/settings"
							iconPath={
								<>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
									/>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
									/>
								</>
							}
							label="Settings"
						/>
					</div>
				</nav>
			</div>
		</div>
	);
}

interface ItemProps {
	iconPath: JSX.Element;
	label: string;
	href: string;
}

function Item({ iconPath, label, href }: ItemProps) {
	const location = useLocation();

	const isCurrent = location.pathname === href;

	return (
		<Link
			to={href}
			className={[
				'group flex flex-col space-y-2 items-center py-2 w-full text-base font-medium rounded-md',
				!isCurrent && 'text-gray-300 hover:bg-gray-700 hover:text-white',
				isCurrent && 'bg-gray-900 text-white',
			]
				.filter(Boolean)
				.join(' ')}
		>
			<svg
				className={[
					'h-6 w-6',
					!isCurrent && 'text-gray-400 group-hover:text-gray-300',
					isCurrent && 'text-gray-300',
				]
					.filter(Boolean)
					.join(' ')}
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
				aria-hidden="true"
			>
				{iconPath}
			</svg>
			<span className="text-xs">{label}</span>
		</Link>
	);
}
