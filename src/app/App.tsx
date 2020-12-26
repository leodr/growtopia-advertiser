import React, { ReactElement } from 'react';
import { MemoryRouter, Route, Switch } from 'react-router-dom';
import { Account } from './Account';
import { Controls } from './Controls';
import { Settings } from './Settings';
import { Sidebar } from './Sidebar';

export function App(): ReactElement {
	return (
		<MemoryRouter>
			<div className="flex">
				<Sidebar />
				<main className="h-screen overflow-auto flex-1">
					<Switch>
						<Route path="/account">
							<Account />
						</Route>
						<Route path="/settings">
							<Settings />
						</Route>
						<Route path="/">
							<Controls />
						</Route>
					</Switch>
				</main>
			</div>
		</MemoryRouter>
	);
}
