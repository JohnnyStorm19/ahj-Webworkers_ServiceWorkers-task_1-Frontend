import Controller from "./Components/Controller";

if (navigator.serviceWorker) {
	window.addEventListener('load', async () => {
		try {
			if (navigator.serviceWorker) {
				await navigator.serviceWorker.register(
				'/service-worker.js'
				);
				console.log('sw registered');
			}
			// await registration.unregister();
		} catch (e) {
			console.log(e);
		}
	});
}

const container = document.querySelector('.container');
const controller = new Controller(container);

controller.createWidget();

