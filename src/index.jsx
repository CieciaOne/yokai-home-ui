import { render } from 'preact';
import './style.css';
import { Articles } from './articles';
import { Network } from './network';


export function App() {
	return (
		<div>
			{/* <a href="https://preactjs.com" target="_blank">
				<img src={preactLogo} alt="Preact logo" height="160" width="160" />
			</a> */}
			<h1>Yokai</h1>
			<section>
				{/* <Feed url={feedUrl} /> */}
				<Articles />
				<Network />
			</section>
		</div>
	);
}

render(<App />, document.getElementById('app'));
