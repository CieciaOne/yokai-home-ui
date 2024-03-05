import { render } from 'preact';
import './style.css';
import { Articles } from './articles';
import { Feed } from './feed';
import { Network } from './network';


export function App() {
	return (
		<div>
			<h1>Yokai</h1>
			<section>
				<Feed />
				<Articles />
				<Network />
			</section>
		</div>
	);
}

render(<App />, document.getElementById('app'));
