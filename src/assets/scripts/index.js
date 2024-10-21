import '/src/components/header/app-header.js';
import '/src/components/contact-form-modal/app-contact-form-modal.js';
import '@shoelace-style/shoelace/dist/components/dropdown/dropdown.js';
import '@shoelace-style/shoelace/dist/components/drawer/drawer.js';
import '@shoelace-style/shoelace/dist/components/details/details.js';
import '@shoelace-style/shoelace/dist/components/dialog/dialog.js';
import { register } from 'swiper/swiper-element-bundle.mjs';
// import '/src/assets/scripts/scroll-timeline.js';
// import AOS from 'aos';
import sal from 'sal.js';
import animations from '/src/components/animations/animations.js';
import Swiper from "swiper";

register();
// AOS.init();
sal();



// const swiperContainer = document.querySelector('.marquee-carousel');
//
// // Останавливаем автоплей при наведении курсора
// swiperContainer.addEventListener('mouseenter', () => {
// 	Swiper.autoplay.stop();
// });
//
// // Возобновляем автоплей при уходе курсора
// swiperContainer.addEventListener('mouseleave', () => {
// 	Swiper.autoplay.start();
// })


if (document.querySelectorAll('dotlottie-player').length > 0) {
	(async function() {
 		await import('/src/assets/scripts/dotlottie-player.js');
		const player = document.querySelector('dotlottie-player');
		const animationJson = await import('/src/assets/lottie/scheme1.json');
		player.load(JSON.stringify(animationJson));
	})();
}

const bw = document.body.clientWidth;

// if (bw < 600) {
// 	const title = document.querySelector('.acquiring__figure-card-grid-section .figure-card-grid-section__heading');
// 	title ? title.textContent = 'How does it work' : ''
// }

// const videos = document.querySelectorAll('.intro-section video');

// Удаление атрибута autoplay
// videos.forEach(video => video.removeAttribute('autoplay'));
//
// // Функция для синхронизации воспроизведения
// function synchronizeVideos() {
// 	let allReady = true;
//
// 	// Проверяем, готовы ли все видео
// 	videos.forEach(video => {
// 		if (video.readyState < 3) {
// 			allReady = false;
// 		}
// 	});
//
// 	if (allReady) {
// 		// Установить текущее время видео в 0
// 		videos.forEach(video => video.currentTime = 0);
//
// 		// Начать воспроизведение, если видео не воспроизводится
// 		videos.forEach(video => {
// 			if (video.paused) {
// 				video.play();
// 			}
// 		});
// 	} else {
// 		// Если не все видео готовы, повторить проверку через 100мс
// 		setTimeout(synchronizeVideos, 100);
// 	}
// }

// Запускаем синхронизацию при загрузке страницы
// window.addEventListener('load', synchronizeVideos);


document.getElementById('contactForm')?.addEventListener('submit', function(event) {
	event.preventDefault(); // Prevent the default form submission

	var submitButton = document.getElementById('submitButton');
	var originalText = submitButton?.innerHTML;


	submitButton.innerHTML = '<span class="button__text">Message sent</span>';


	setTimeout(function() {
		submitButton.innerHTML = originalText;
		document.getElementById('contactForm').submit();
	}, 10000);
});


const marqueeCarousel = document.querySelectorAll('.marquee-carousel');

marqueeCarousel.forEach(item => {
	if (bw < 1350) {
		item.setAttribute('slides-per-view', 4);
	}
	if (bw < 991) {
		item.setAttribute('slides-per-view', 3);
	}
	if (bw < 700) {
		item.setAttribute('slides-per-view', 2);
	}

	// var swiper = new Swiper(item);
	//
	// item.addEventListener('mouseenter', function() {
	// 	swiper.autoplay.stop();
	// });

	// item.addEventListener('mouseleave', function() {
	// 	swiper.autoplay.start();
	// });
})

// window.addEventListener('load', function () {
// 	var preloader = document.querySelector('.preloader');
// 	preloader.style.display = 'none';
//
// });

// document.addEventListener('DOMContentLoaded', () => {
// 	var preloader = document.querySelector('.preloader');
// 	let percentageElement = document.querySelector('.preloader-status span');
// 	let pathElement = document.querySelectorAll('.progress-circle');
// 	let progress = 0;
//
// 	let interval = setInterval(() => {
// 		if (progress >= 100) {
// 			clearInterval(interval);
// 		} else {
// 			progress++;
// 			percentageElement.textContent = `${progress}`;
//
// 			var circles = document.querySelectorAll('.progress-circle');
//
// 			// Добавляем стили для заполнения fill градиентом
// 			setTimeout(function() {
// 				circles.forEach(function(circle) {
// 					circle.classList.add('filled');
// 				});
// 			}, 100);
//
//
// 		}
// 	}, 50);
// 	// preloader.style.display = 'none';// Adjust the speed of loading here (50ms per increment)
// });





animations();
