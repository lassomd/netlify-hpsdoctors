var themeLayout = {

	root : "",
	customFields : {},

	initNavigationToggle : function () {

		$('.menu-toggle').unbind('click').click(function (event) {
			event.stopPropagation();
			event.preventDefault();
			var body = $('body').toggleClass('nav-open');
		})

	},

	init: function(root, customFields) {
		this.root = root;
		this.customFields = customFields;

		this.initNavigationToggle();

	}
};

//this theme needs to propagate scroll events to body, for lazy load to work
$('.main-content').scroll(function () {
	$('body').trigger('scroll');
});

$(function(){

	/*********CUSTOMIZE CAROUSEL***********/
	$.fn.themeCarousel = function(options){
		var themeCarousel = {
			init: function(el){

				this.$slider = $(el);
				this.$slidesContainer = this.$slider.find('.carousel');
				this.$slides = this.$slidesContainer.find('.item').length;
				this.$indicatorsWrap = this.$slider.find('.ry-indicator');

				this.settings = $.extend({ //Add Options Here
					leftBtn:this.$slider.find(".button-prev"),
					rightBtn:this.$slider.find(".button-next"),
					dots:false,
					nav:false,
					itemBg:false,
					setBgTarget:""
				}, options);


				this.initNav();
				this.setCustomSlideBg();

				if(this.settings.itemBg){
					this.setItembg();
				}
				if(this.settings.dots){
					this.initIndicator();
					this.activeIndicator();
				}

			},
			bindEvents:function(){
				$(this.settings.leftBtn).on('click',this.prev.bind(this));
				$(this.settings.rightBtn).on('click',this.next.bind(this));	
				$(this.$slidesContainer).on('slid.bs.carousel',this.setCustomSlideBg.bind(this));

				if(this.settings.dots){
					$(this.$slidesContainer).on('slid.bs.carousel',this.activeIndicator.bind(this));
				}

			},
			prev:function(){
				this.$slidesContainer.carousel('prev');
				if(this.settings.dots){
					this.activeIndicator();
				}
			},
			next:function(){
				this.$slidesContainer.carousel('next');
				if(this.settings.dots){
					this.activeIndicator();
				}
			},
			initNav: function(){
				this.bindEvents();
			},
			initIndicator:function(){
				for(var i = 1; i <= this.$slides; i++ ){
					$(this.$indicatorsWrap).append("<span></span>");
				}
				this.$indicator = this.$slider.find('.ry-indicator span');
			},
			activeIndicator:function(){
				var _this = this;
				this.$activeSlide = this.$slidesContainer.find('.item.active').index();

				this.$indicator.each(function(i){
					if( _this.$activeSlide == i ){
						$(this).addClass('active').siblings().removeClass('active');
					}
					$(this).click(function(){
						$(_this.$slidesContainer).carousel(i);
						$(this).addClass('active').siblings().removeClass('active');
					});
				});
			},
			setItembg:function(){
				var target = ( this.settings.setBgTarget !=="") ? this.settings.setBgTarget : ".item" ;


				if(this.settings.itemBg && this.settings.setBgTarget !="" ){
					$(this.$slidesContainer).find(".item").each(function(i){
						var src = $(this).find('img').attr('src');
						$(this).find(target).css('background-image','url('+src+')');
					});
				}else{
					$(this.$slidesContainer).find(".item").each(function(i){
						var src = $(this).find('img').attr('src');
						$(this).css('background-image','url('+src+')');
					});

				}

			},
			setCustomSlideBg:function(){			
				var _this = this;

				this.$slideBgSrc = this.$slidesContainer.find('.item.active img').attr('src');

				$(this.$slider).find(this.settings.setBgTarget).css('background-image','url('+ this.$slideBgSrc +')')		

			}
		}

		return this.each(function(){
			themeCarousel.init(this);
		});
	}

	/******CUSTOM THEME SETTINGS******/
	var themeSettings= {
		init: function(){
			var pageName = document.getElementsByTagName('body')[0].getAttribute('data-page-name');

			this.initCarousel();
			this.initMobileMenu();
			this.initInstaFeed();
			this.initElBg();
			this.initElLink();
			this.initMultiLevelMenu();
			this.initChangeFontawesome();
			this.initDeferIframe();
			this.initFormBtn();
			this.initTruncate();
			this.initArcticleSb();
			this.initActiveSb();
			this.initRandomBanner();
			this.initNoResult();
			this.initAccordion();
			this.initScrollFixed();
			this.initPdfLink();
			this.initRespondTitle();
			this.initAddNumberOnDots();
			this.initSmoothScroll();
			this.initModule160();
			this.initFixMobileMenuDropdown();

			if($('#map').length > 0){
				this.initMap();
			}


		},
		initMap: function(){
			var map;
			var center = {
				//lat:,
				//lng:
			};
			map = new google.maps.Map(document.getElementById('map'), {
				center: center,
				zoom: 14
			});
			var marker = new google.maps.Marker({position: center, map: map});
		},
		initElBg: function(){
			$('.ry-el-bg').each(function(){
				var src = ($(this).find('img.ry-bg').length > 0) ? $(this).find('img.ry-bg').attr('src') : $(this).find('img').attr('src') ;
				$(this).css('background-image','url('+src+')');
			});
		},
		
		
		initElLink:function(){
			$('.ry-el-link').each(function(){
				$(this).click(function(){
					var href = $(this).find('a').attr('href');
					window.location.href = href;
				});
			});
			$('.ry-el-link-tab').each(function(){
				$(this).click(function(){
					var href = $(this).find('a').attr('href');
					window.open(href,'_blank');
				});
			});
		},
		initDeferIframe: function() {
			var vidDefer = document.getElementsByTagName('iframe');
			for (var i=0; i<vidDefer.length; i++) {
				if(vidDefer[i].getAttribute('data-src')) {
					vidDefer[i].setAttribute('src',vidDefer[i].getAttribute('data-src'));
				} 
			}
		},
		initFormBtn: function() {
			$('.form-btn').click(function(){
				$(this).parents("form").submit();
			});
		},
		initCarousel:function() {
			$('.module-155, .module-175 ').themeCarousel({
				itemBg:true,
				setBgTarget:".ry-img-wrp",
				dots:true
			});
			$('#ry-section-welcome').themeCarousel({
				dots:true,
			});
			$('.module-160').themeCarousel({
				dots:true,
			});
			$('.module-20.meetdoctors').themeCarousel({
				dots:true,
			});

			$('.module-155 .carousel-indicators, .module-175 .carousel-indicators').addClass('play')

			function animateBullets(carousel, indicator) {
				carousel = anime.timeline({
					easing: 'easeOutExpo',
					loop: false
				}).add({
					targets: indicator,
					translateY: [0,-100],
					opacity: [1,0],
					easing: "easeInExpo",
					duration: 600,
					delay: function(el, i) {
						return 100 + 30 * i;
					}
				}).add({
					targets: indicator,
					translateY: [100,0],
					translateZ: 0,
					opacity: [0,1],
					easing: "easeOutExpo",
					duration: 800,
					delay: function(el, i) {
						return 0 + 30 * i;
					}
				})
				return carousel
			}

			animateBullets('heroIndicator', '.module-155 .carousel-indicators li, .module-175 .carousel-indicators li')


			var heroCarousel = $('.module-155 .carousel, .module-175 .carousel'),
				reviewsCarousel = $('.module-160 .carousel, .module-187 .carousel, .module-20.meetdoctors .carousel'),
				carouselItems = heroCarousel.find('.item'),
				rySlide = $('.module-155 .ry-slide, .module-175 .ry-slide')

			heroCarousel.bind('slide.bs.carousel', function (){
				rySlide.addClass('_AnimateOut').removeClass('_AnimateIn')
				var heroBullets = animateBullets('heroIndicator', '.module-155 .carousel-indicators li, .module-175 .carousel-indicators li')
				heroBullets.restart()
			})

			heroCarousel.bind('slid.bs.carousel', function (){
				var  currentIndex =  heroCarousel.find('.active').index()

				/* 
					Change Hero Text Position
					Class:
						'ry-text-center' =  position center
						'ry-text-top' =  position top
						'ry-text-right' =  position right
						'ry-text-left' =  position left
						'ry-text-bottom' =  position bottom
				*/

				rySlide.removeClass('ry-text-center ry-text-top ry-text-right ry-text-left ry-text-bottom')

				if ( currentIndex == 0 ) {
					rySlide.addClass('ry-text-right')

					//rySlide.find('.ry-heading h2').text('hello');

				} /*else if ( currentIndex == 1 ) {
					rySlide.addClass('ry-text-top')

					//rySlide.find('.ry-heading h2').text('hi');
				} else if ( currentIndex == 2 ) {
					rySlide.addClass('ry-text-right')

					//rySlide.find('.ry-heading h2').text('hey');
				} else if ( currentIndex == 3 ) {
					rySlide.addClass('ry-text-left')

					//rySlide.find('.ry-heading h2').text('hoo');
				} else if ( currentIndex == 4 ) {
					rySlide.addClass('ry-text-bottom')

					//rySlide.find('.ry-heading h2').text('yey');
				} */
				
				else if ( currentIndex == 1 ) {
					rySlide.addClass('ry-text-right')

					//rySlide.find('.ry-heading h2').text('hi');
				} else if ( currentIndex == 2 ) {
					rySlide.addClass('ry-text-right')

					//rySlide.find('.ry-heading h2').text('hey');
				} else if ( currentIndex == 3 ) {
					rySlide.addClass('ry-text-right')

					//rySlide.find('.ry-heading h2').text('hoo');
				} else if ( currentIndex == 4 ) {
					rySlide.addClass('ry-text-right')

					//rySlide.find('.ry-heading h2').text('yey');
				}

				rySlide.removeClass('_AnimateOut').addClass('_AnimateIn')
			})


			$('.module-155 ._next, .module-175 ._next').on('click',function(){
				heroCarousel.carousel('next')
			})

			$('.module-155 ._prev, .module-175 ._prev').on('click',function(){
				heroCarousel.carousel('prev')
			})


			reviewsCarousel.bind('slide.bs.carousel', function (){
				var reviewsBullet = animateBullets('reviewsIndicator', '.module-160 .carousel-indicators li, .module-187 .carousel-indicators li, .module-20.meetdoctors .carousel-indicators li')
				reviewsBullet.restart()
			})	

			var carouselPartners = new Swiper('.carousel-partners', {
				slidesPerView: 4,
				spaceBetween: 100,
				speed: 800,
				loop:true,
				navigation: {
					nextEl: '.swiper-button-next',
					prevEl: '.swiper-button-prev',
				},
				autoplay: {
					delay: 3000,
				},
				breakpoints: {
					1024: {
						slidesPerView: 4,
						spaceBetween: 100,
					},
					991: {
						slidesPerView: 2,
						spaceBetween: 80,
					},
					640: {
						slidesPerView: 1,
						spaceBetween: 60,
					},
					450: {
						spaceBetween: 60,
					}
				}
			});

			var carouselServices = new Swiper('.carousel-services', {
				slidesPerView: 4,
				spaceBetween: 50,
				speed: 800,
				loop:false,
				allowTouchMove: false,
				pagination: {
					el: '.swiper-pagination',
					clickable: true,
				},
				breakpoints: {
					1400: {
						spaceBetween: 30,
					},
					1300: {
						slidesPerView: 3,
						spaceBetween: 30,
					},
					991: {
						slidesPerView: 1,
						spaceBetween: 20,
					}
				}
			});
			
			var carouselServices = new Swiper('.affiliation', {
				slidesPerView: 4,
				spaceBetween: 50,
				speed: 800,
				loop:false,
				allowTouchMove: false,
				pagination: {
					el: '.swiper-pagination',
					clickable: true,
				},
				breakpoints: {
					1400: {
						spaceBetween: 30,
					},
					1300: {
						slidesPerView: 3,
						spaceBetween: 30,
					},
					991: {
						slidesPerView: 1,
						spaceBetween: 20,
					}
				}
			});

			var carouselServicesStyle2 = new Swiper('.carousel-services-style-2', {
				slidesPerView: 2,
				spaceBetween: 50,
				speed: 800,
				loop:true,
				pagination: {
					el: '.swiper-pagination',
					clickable: true,
				},
				breakpoints: {
					991: {
						slidesPerView: 1,
						spaceBetween: 20,
					}
				}
			});

		},
		initTruncate:function(){
			$('.ry-list-item').each(function(){
				var txt = $(this).find('.ry-list-excerpt p:first-child').text();
				if(txt.length > 220){
					txt = txt.substring(0,220);
					txt += '...';
				}
				$(this).find('.ry-list-excerpt').html(txt);
			});
		},
		//Dynamic Sidebar Articles
		initArcticleSb:function(){//Dynamic Sidebar Articles
			$('.ry-drop-nav').append('<ul></ul>');

			$("#accordion .ry-link-item").each(function(){

				$(this).attr('id',$(this).attr("id").replace(/[!@#$%^&*]/g,""));

				var parentID = $(this).attr('id');

				$('.ry-dropdown-list .ry-dropdown').each(function(){
					var li = $(this).find('li');

					var dataAttr = $(this).find('li').attr("data-class");

					var dataClass = (dataAttr != undefined) ? $(this).find('li').attr('data-class',dataAttr.replace(/[!@#$%^&*\s]/g,"")) : "";

					if($(dataClass).attr('data-class') == parentID) {
						$(li).appendTo(".ry-link-wrp"+" "+"#"+parentID + " ul");
					}
				});

			});

			$('.ry-drop-nav').click(function(){
				$(this).toggleClass('open').siblings().removeClass('open');
				$(this).find('ul').slideToggle();
				$(this).siblings('.ry-drop-nav').find('ul').slideUp();
			});
		},
		initActiveSb:function(){
			$('.ry-drop-nav').each(function(){
				var url = window.location.href ;
				var path = url.substr(url.lastIndexOf('/') + 1); 
				$(this).find('li a').each(function(){
					var currentPath  = $(this).attr('href');
					currentPath = currentPath.substr(currentPath.lastIndexOf('/') + 1); 
					if(path == currentPath){
						$(this).addClass('active');
						$(this).parents('.ry-drop-nav').addClass('open');
						$(this).parents('ul').css('display','block');
					}
				});
			});
		},
		Shuffle:function(){

			var whichToShow = Math.floor(Math.random() * $('.ry-bnr-wrp').length);

			return whichToShow;

		},
		initRandomBanner:function(){

			var show =  this.Shuffle();

			var len = $('.ry-bnr-wrp').length;

			if( $("#ry-pg-banner").length ){

				var rytitle = $('.ry-pg-title');

				var current = localStorage.getItem('current_banner') == null  ? localStorage.setItem('current_banner',show) : localStorage.getItem('current_banner');

				$('.ry-bnr-wrp').eq(show).append(rytitle);

				if( current != show){

					$('.ry-bnr-wrp').hide().eq(show).fadeIn(100);

					localStorage.setItem('current_banner',show)

				}else{

					if(len == 1) return;

					var shuffling  = true; 

					while(shuffling){

						show =  this.Shuffle();

						if( show !=  localStorage.getItem('current_banner') ){

							//console.log('shuffling',`${show} current:${current}`);

							$('.ry-bnr-wrp').hide().eq(show).fadeIn(100);

							$('.ry-bnr-wrp').eq(show).append(rytitle);

							localStorage.setItem('current_banner',show);

							shuffling = false;

						}

					}

				}
			}


		},


		initScrollFixed:function(){
			/* scroll event */
			$( window ).scroll(function() {
				var height = $(window).scrollTop();
				var header = $('.ry-sticky-menu');

				if(height  > 150) {
					$('.ry-sticky-menu').addClass('fixed');

				}else{
					$('.ry-sticky-menu').removeClass('fixed');
				}

			});
		},
		initPdfLink:function(){
			$('.ry-pdf-link').click(function(e){
				e.preventDefault();
				var filename = $(this).attr('href');
				var dirname = window.location.href.substr(0,location.href.lastIndexOf('/'))
				window.open(dirname +'/'+'viewer.html?open_file='+ filename ,'_blank')
			});
		},
		initChangeFontawesome:function(){		
			//google 
			var fa = document.querySelectorAll('.fa-google-plus');
			for ( var i = 0; i < fa.length; i++ ) {
				fa[i].classList.add('fa-google')
				fa[i].classList.remove('fa-google-plus')
			}
		},
		initMultiLevelMenu:function(){

			$('.ry-nav .dropdown').hover(function(){
				$(this).find('.dropdown-menu').addClass('hover');
			},function(){
				$(this).find('.dropdown-menu').removeClass('hover');
			});

			$('.ry-nav .third-level-container').hover(function () {
				$(this).find('.third-level-dropdown').addClass('third-hover');
			}, function () {
				$(this).find('.third-level-dropdown').removeClass('third-hover');
			});

			$('.ry-nav .fourth-level-container').hover(function () {
				$(this).find('.fourth-level-dropdown').addClass('fourth-hover');
			}, function () {
				$(this).find('.fourth-level-dropdown').removeClass('fourth-hover');
			});

			/*
				---third level menu class structure---
				parent li => third-level-container dental
				children => third-level dental	

				---Fourth level menu class structure---				
				parent li => third-level dental fourth-level-container dental_implants
				children => fourth-level dental_implants	
				*/

			$('.ry-nav .fourth-level-container').each(function(){
				var ul = $('<ul></ul>').addClass('fourth-level-dropdown'),
					clss = $(this).attr('class');

				clss = clss.split(' ');

				$(this).siblings('.fourth-level.'+clss[3]).appendTo(ul)
				$(this).append(ul);
			});

			$('.ry-nav .third-level-container').each(function(){
				var ul = $('<ul></ul>').addClass('third-level-dropdown'),
					clss = $(this).attr('class');

				clss = clss.split(' ');

				$(this).siblings('.third-level.'+clss[1]).appendTo(ul)
				$(this).append(ul);
			});

		},
		initNoResult:function(){
			var result = $('.result-box .search-result').length; 
			if(! result > 0){
				$('.no-result').css('display','block');
			}
		},
		initAccordion:function(){
			/*accordion*/
			$( ".ry-accordion" ).accordion({
				header: ".ry-heading",
				active:false ,
				collapsible: true,
				heightStyle:"content"
			});

		},
		initRespondTitle:function(){
			$('.ry-pg-title h1').html(function(i, html) {
				if(html.length > 20){
					$(this).addClass('ry-responsive-title');
				}
			});
		},
		initAddNumberOnDots:function(){
			var indicatorCountHero = 0
			$( ".module-155 .carousel-indicators li, .module-175 .carousel-indicators li" ).wrapInner(function() {
				indicatorCountHero += 1
				return "<span>"+ indicatorCountHero +"</span" ;
			});

			var indicatorCountReviews = 0
			$( ".module-160 .carousel-indicators li, .module-187 .carousel-indicators li" ).wrapInner(function() {
				indicatorCountReviews += 1
				return "<span>"+ indicatorCountReviews +"</span" ;
			});
			
			var indicatorCountReviews2 = 0
			$(".module-20.meetdoctors .carousel-indicators li" ).wrapInner(function() {
				indicatorCountReviews2 += 1
				return "<span>"+ indicatorCountReviews2 +"</span" ;
			});
		},
		initSmoothScroll:function(){
			$('.ry-arrow-down a').on('click', function (e) {
				e.preventDefault();

				$('html, body').animate({
					scrollTop: $($(this).attr('href')).offset().top
				}, 500, 'linear');
			});
		},
		initModule160:function(){
			if ($('.module-160').length) {
				$('#ry-footer > div:first-child').addClass('ry-module-160-space');
			}
		},
		initInstaFeed:function(){
			if( document.getElementById('instafeed') !== null ){

				var _this = this,
					appenChild = false,
					loadButton = document.getElementById('load-more');

				var feed = new Instafeed({
					get: 'user',      
					userId: '15512655178',   // get UserId here https://codeofaninja.com/tools/find-instagram-user-id
					accessToken:'15512655178.1677ed0.7a632c8d4c6c4714b9ee4860be638142', //get access token here https://instagram.pixelunion.net/
					limit:8,
					template: '<div class="flex-item">'+
					'<a class="animation" href="{{link}}" target="_blank">' +
					'<div class="ry-el-bg">'+
					'<img class="img-responsive" src="{{image}}" /></div></a>'+
					'<div class="ry-desc">{{caption}}</div>'+
					'<a class="overlay" href="{{link}}" target="_blank"></a>'+
					'</div>',
					resolution:'standard_resolution',
					success:function(json){
						var len = json.data.length;
						if(len % 4 == 2){
							appenChild = true;
						}

					},
					after:function(e){
						_this.initElBg();
						if(appenChild){
							var item = document.createElement('div');
							item.setAttribute('class','flex-item');			
							document.getElementById('instafeed').appendChild(item);
						}
						if (!this.hasNext()) {
							loadButton.style.display = "none";
						}
					}
				});
				if(loadButton != null ){
					loadButton.addEventListener('click', function() {
						feed.next();
					});		
				}


				feed.run();

			}

		},
		initMobileMenu:function(){

			var links = {
				'facebook':{"link":"https://www.facebook.com/TotalImageDental/","fa":"fab fa-facebook-square"},
				'twitter':{"link":"","fa":"fab fa-twitter-square"},
				'linkedin':{"link":"","fa":"fab fa-linkedin"},
				'google':{"link":"https://g.page/r/CUsPzFQNxOutEBM/","fa":"fab fa-google-plus-square"},
				'instagram':{"link":"","fa":"fab fa-instagram"},
				'Yelp':{"link":"","fa":"fab fa-yelp"},
				'rss':{"link":"","fa":"fas fa-rss-square"},
				'pinterest':{"link":"","fa":"fab fa-pinterest-square"},
				'youtube':{"link":"","fa":"fab fa-youtube-square"}
			}

			/* INITIALIZE MOBILE MENU */
			var iconBarEnable = ( $(document).width() >= 992) ? false : true;
			var menuSettings = {   
				//enableIconBar:iconBarEnable,
				enableIconBar:false,
				iconbarTopContent:[
					"<a href='./index'><i class='fa fa-home'></i></a>",
				],
				iconbarBottomContent: [],
				appendCloseBtn:true,

				//Menu Extensions
				menuPos:"position-left", // position-right, position-left
				menuthemeColor:"theme-black", // default:theme-light ,theme-dark, theme-white ,theme-black
				menuEffect:"fx-menu-slide", // fx-menu-zoom , fx-menu-slide , fx-menu-zoom
				menuZposition:"position-front",  // position-back , position-front
				menuPanelSlideEffect:"fx-panels-slide-up", // fx-panels-none, fx-panels-slide-0, fx-panels-slide-100 , fx-panels-slide-up ,fx-panels-zoom
				menuListItemSlideEffect:"fx-listitems-drop", // fx-listitems-drop , fx-listitems-slide , fx-listitems-fade , fx-listitems-slide
				menuBorderOffset:"border-offset", // border-full , border-offset , border-none
				menuPageDim:""  // pagedim-black , pagedim-white
			}

			if( Object.keys(links).length > 0 ){

				$.each(links, function(key, value) {
					if( links[key].link != ""){
						menuSettings.iconbarBottomContent.push("<a href="+links[key].link+">"+ "<i class=\""+ links[key].fa +"\"></i></a>");
					}

				});

			}

			var menu =	$("#mobile_menu").mmenu({

				"iconbar": {
					"add": menuSettings.enableIconBar,
					"top": menuSettings.iconbarTopContent,
					"bottom": menuSettings.iconbarBottomContent,
				},
				sidebar: {

				},

				extensions: [
					menuSettings.menuPos,
					menuSettings.menuthemeColor,
					//menuSettings.menuEffect,
					menuSettings.menuZposition,
					menuSettings.menuPanelSlideEffect,
					menuSettings.menuListItemSlideEffect,
					menuSettings.menuPageDim,
				]
			});

			if(menuSettings.appendCloseBtn){
				$('<button class="hamburger hamburger--collapse" type="button"> <div class="flex-btn"> <span class="hamburger-box"><span class="hamburger-inner"></span></span> </div> </button>').appendTo('#menu_container')
			}

			if (menu.data("mmenu")) {
				var api = menu.data("mmenu");
				var icon = $('button.hamburger');

				icon.on("click", function () {
					if ($(this).hasClass('is-active')) {
						api.close();
					} else {
						api.open();
					}
				});


				api.bind("open:finish", function () {
					setTimeout(function () {
						icon.addClass("is-active");
					}, 100);
				});
				api.bind("close:finish", function () {
					setTimeout(function () {
						icon.removeClass("is-active");
					}, 100);
				});

			}

		},
		initFixMobileMenuDropdown:function(){
			$(".mob-menu").each(function(){
				$(this).find("a.dropdown").click(function(e){
					e.preventDefault();
					$(this).siblings(".mm-btn_next").trigger("click")
				});
			});
		},


	}



	themeSettings.init();

});


