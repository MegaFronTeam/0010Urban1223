"use strict";

const $ = jQuery;


function eventHandler() {

	JSCCommon.init()


	function whenResize() {
		JSCCommon.setFixedNav();
	}

	window.addEventListener('scroll', () => {
		JSCCommon.setFixedNav();

	}, { passive: true })
	window.addEventListener('resize', () => {
		whenResize();
	}, { passive: true });

	whenResize();

	function dropDown(btn,dropdown) {
		btn.addEventListener('click', (event) => {
			if (dropdown.classList.contains('active')) {
				console.log('Дропдаун содержит актив')
				dropdown.classList.remove('active');
			}
			else {
				console.log('Дропдаун НЕ содержит актив')
				dropdown.classList.add('active');
			}
		});
		document.addEventListener('click', (event) => {
			if (event.composedPath().includes(dropdown)) {
				return
			}
			else if (!(event.composedPath().includes(dropdown)) && !(event.composedPath().includes(btn))) {
				dropdown.classList.remove('active')
			}
		});
	}

	const stepsBtn = document.querySelector('.steps__dd-header');
	if (stepsBtn) {
		const stepsList = document.querySelector('.steps__list');
		dropDown(stepsBtn,stepsList);
	}

	const accountBtn = document.querySelector('.topLine__account');
	if (accountBtn) {
		const accountList = document.querySelector('.topLine__account-menu');
		dropDown(accountBtn,accountList);
	}


	let defaultSl = {
		spaceBetween: 0,
		lazy: {
			loadPrevNext: true,
		},
		watchOverflow: true,
		loop: true,
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
		pagination: {
			el: ' .swiper-pagination',
			type: 'bullets',
			clickable: true,
			// renderBullet: function (index, className) {
			// 	return '<span class="' + className + '">' + (index + 1) + '</span>';
			// }
		},
	}

	new Swiper('.breadcrumb-slider--js', {
		slidesPerView: 'auto',
		freeMode: true,
		watchOverflow: true
	});

	const swiper4 = new Swiper('.sBanners__slider--js', { // если не используешь методы swiper  - можно обращаться без нее к Swiper
		// slidesPerView: 5,
		...defaultSl,
		slidesPerView: 'auto',
		freeMode: true,
		loopFillGroupWithBlank: true,
		touchRatio: 0.2,
		slideToClickedSlide: true,
		freeModeMomentum: true,
	});


	const scheduleContainer = document.querySelector('.sSchedule__slider-wrap')
	if (scheduleContainer) {
		const scheduleSlider = new Swiper('.sSchedule__slider', {
			slidesPerView: 1,
			breakpoints: {
				576: {
					slidesPerView: 'auto',
				},
			},
			navigation: {
				nextEl: scheduleContainer.querySelector('.swiper-button-next'),
				prevEl: scheduleContainer.querySelector('.swiper-button-prev'),
			},
		})
	}

	$(".select-block-wrapper").each(function(){
		const self = $(this)
		self.find("select").select2({
			allowClear: false,
			dropdownParent: self
		});
	})

	$(document).on("click", ".sSchedule__time", function(){
		$(this).toggleClass("sSchedule__time--cancel")
		// $(this).slideToggle(()=>{
		// })
	})
};

if (document.readyState !== 'loading') {
	eventHandler();
} else {
	document.addEventListener('DOMContentLoaded', eventHandler);
}

// window.onload = function () {
// 	document.body.classList.add('loaded_hiding');
// 	window.setTimeout(function () {
// 		document.body.classList.add('loaded');
// 		document.body.classList.remove('loaded_hiding');
// 	}, 500);
// }