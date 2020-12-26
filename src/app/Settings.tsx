import React from 'react';
import { useStore } from './useStore';

export function Settings() {
	const [execPath, setExecPath] = useStore('executablePath');

	return (
		<div className="py-8 sm:px-4">
			<div className="md:grid md:grid-cols-3 md:gap-6">
				<div className="md:col-span-1">
					<div className="px-4 sm:px-0">
						<h3 className="text-lg font-medium leading-6 text-gray-900">
							Executable
						</h3>
						<p className="mt-1 text-sm text-gray-600 prose">
							The full path to start Growtopia. Usually in{' '}
							<code>%LOCALAPPDATA%</code> for Windows and{' '}
							<code>/Applications</code> on macOS.
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
										Absolute executable path
									</label>
									<div className="mt-1 flex rounded-md shadow-sm">
										<div className="relative flex items-stretch flex-grow focus-within:z-10">
											<input
												type="text"
												name="email"
												id="email"
												className="focus:ring-indigo-500 focus:border-indigo-500 block w-full rounded-none rounded-l-md sm:text-sm border-gray-300"
												placeholder="John Doe"
												value={execPath}
												onChange={({ target }) => setExecPath(target.value)}
											/>
										</div>
										<button className="-ml-px relative inline-flex items-center space-x-2 px-4 py-2 border border-gray-300 text-sm font-medium rounded-r-md text-gray-700 bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500">
											<svg
												className="h-5 w-5 text-gray-400"
												xmlns="http://www.w3.org/2000/svg"
												viewBox="0 0 20 20"
												fill="currentColor"
												aria-hidden="true"
											>
												<path
													fillRule="evenodd"
													d="M2 6a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1H8a3 3 0 00-3 3v1.5a1.5 1.5 0 01-3 0V6z"
													clipRule="evenodd"
												/>
												<path d="M6 12a2 2 0 012-2h8a2 2 0 012 2v2a2 2 0 01-2 2H2h2a2 2 0 002-2v-2z" />
											</svg>
											<span>Open</span>
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
