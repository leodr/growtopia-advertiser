import React, { useState } from 'react';
import { useStore } from './useStore';

export function Account() {
	const [growId, setGrowId] = useStore('account.growId');
	const [password, setPassword] = useStore('account.password');

	const [isPasswordShown, setIsPasswordShown] = useState(false);

	return (
		<div className="py-8 sm:px-4">
			<div className="md:grid md:grid-cols-3 md:gap-6">
				<div className="md:col-span-1">
					<div className="px-4 sm:px-0">
						<h3 className="text-lg font-medium leading-6 text-gray-900">
							Account
						</h3>
						<p className="mt-1 text-sm text-gray-600">
							Your account information will only be stored locally on your
							machine.
						</p>
					</div>
				</div>
				<div className="mt-5 md:mt-0 md:col-span-2">
					<form onSubmit={(e) => e.preventDefault()}>
						<div className="shadow sm:rounded-md sm:overflow-hidden">
							<div className="px-4 py-5 bg-white space-y-6 sm:p-6">
								<div>
									<label
										htmlFor="email"
										className="block text-sm font-medium text-gray-700"
									>
										Grow-ID
									</label>
									<div className="mt-1">
										<input
											type="text"
											name="email"
											id="email"
											className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
											placeholder="johndoe123"
											value={growId}
											onChange={({ target }) => setGrowId(target.value)}
										/>
									</div>
								</div>

								<div>
									<label
										htmlFor="password"
										className="block text-sm font-medium text-gray-700"
									>
										Password
									</label>
									<div className="mt-1 relative">
										<input
											id="password"
											name="password"
											type={isPasswordShown ? 'text' : 'password'}
											autoComplete="current-password"
											required
											className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
											placeholder="••••••••"
											value={password}
											onChange={({ target }) => setPassword(target.value)}
										/>
										<button
											className="absolute inset-y-0 right-0 px-3 flex items-center "
											onMouseDown={() => setIsPasswordShown(true)}
											onMouseUp={() => setIsPasswordShown(false)}
											onMouseLeave={() => setIsPasswordShown(false)}
										>
											<svg
												className="h-5 w-5 text-gray-400"
												xmlns="http://www.w3.org/2000/svg"
												viewBox="0 0 20 20"
												fill="currentColor"
												aria-hidden="true"
											>
												<path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
												<path
													fillRule="evenodd"
													d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
													clipRule="evenodd"
												/>
											</svg>
										</button>
									</div>
								</div>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}
