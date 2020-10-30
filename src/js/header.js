/* браузер полностью загрузил HTML и построил DOM */
document.addEventListener('DOMContentLoaded', function(){
	/* слушаем ссылки в Header */
	document.querySelectorAll('.site-navigation__link').forEach(item => {
		item.addEventListener('click', event => {
			event.preventDefault();
			
			item.parentElement.querySelectorAll('.site-navigation__link').forEach(item => {
				item.classList.remove('active');
			});
			
			item.classList.add('active');
			
			// вывод видео по ссылке...
			alert('Нажата ссылка');
		});
	});
});