let flag = false;

document.querySelector('#mystar_btn').addEventListener('click', () => {
	const elMyStar = document.querySelector('#my_star');
	
	if (!flag) {
		const template = '<iframe width="77%" height="480" src="https://www.youtube.com/embed/TWA9alBCoOc?si=0uP9NhBUkRzSqa-r" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>';
		elMyStar.insertAdjacentHTML('beforeend', template);
	} else {
		elMyStar.removeChild();
	}

	flag = !flag;
})