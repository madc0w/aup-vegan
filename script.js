const toggle = document.querySelector('.nav-toggle');
const nav = document.getElementById('nav');

toggle.addEventListener('click', () => {
	const open = nav.classList.toggle('open');
	toggle.setAttribute('aria-expanded', open);
});
nav.addEventListener('click', (e) => {
	if (e.target.tagName === 'A') {
		nav.classList.remove('open');
		toggle.setAttribute('aria-expanded', false);
	}
});

// Replace with a real form endpoint (e.g. Formspree or Google Forms) to collect sign-ups.
const FORM_ENDPOINT = '';

const form = document.getElementById('join-form');
const statusEl = document.getElementById('form-status');

form.addEventListener('submit', async (e) => {
	e.preventDefault();
	statusEl.className = '';
	const email = form.email.value.trim();
	let valid = true;
	for (const field of [form.name, form.email]) {
		const bad = !field.value.trim() || (field === form.email && !/^\S+@\S+\.\S+$/.test(email));
		field.classList.toggle('invalid', bad);
		if (bad) valid = false;
	}
	if (!valid) {
		statusEl.textContent = 'We need your name and a working email address.';
		statusEl.className = 'error';
		return;
	}

	if (FORM_ENDPOINT) {
		try {
			const res = await fetch(FORM_ENDPOINT, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
				body: JSON.stringify(Object.fromEntries(new FormData(form))),
			});
			if (!res.ok) throw new Error();
		} catch {
			statusEl.textContent = "That didn't go through. Try again in a bit.";
			statusEl.className = 'error';
			return;
		}
	}
	statusEl.textContent = `Thanks, ${form.name.value.trim()}. You're on the list.`;
	form.reset();
});
