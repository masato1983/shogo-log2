import 'focus-visible';
import 'nodelist-foreach-polyfill';
import 'picturefill';
import 'ie11-custom-properties';
import 'core-js/modules/es.object.assign';
import 'core-js/modules/es.number.is-nan';
import 'core-js/modules/es.string.repeat';
import 'core-js/modules/es.promise';

// loading animation
import Cookies from 'js-cookie';

const loadingElement = document.querySelector('.c-loading');

if (!Cookies.get('accessdate')) {
    if (loadingElement) {
        function noScroll(event) {
            event.preventDefault();
        }

        document.addEventListener('touchmove', noScroll, { passive: false });
        document.addEventListener('wheel', noScroll, { passive: false });

        setTimeout(function () {
            loadingElement.classList.remove('is-loading');
        }, 3000);

        setTimeout(function () {
            document.removeEventListener('touchmove', noScroll, { passive: false });
            document.removeEventListener('wheel', noScroll, { passive: false });
        }, 3200);
    }

    let date = new Date();
    let loadingYear = String(date.getFullYear());
    let loadingMonth = String(date.getMonth() + 1);
    let loadingDate = String(date.getDate());

    Cookies.set('accessdate', loadingYear + loadingMonth + loadingDate, { expires: 1, secure: true, domain: 'shogo-log2.coding11ty.com' });
} else {
    loadingElement.classList.remove('is-loading');
}

// AOS (Animation On Scroll)
import AOS from 'aos';

AOS.init({
    offset: 80, // default 120
    duration: 1000, // default 400
    easing: 'ease-in-out-cubic', // default ease
    delay: 0, // default 0
    anchor: null, // default null
    anchorPlacement: 'top-bottom', // default top-bottom
    once: true, // default false
});

// hamburger menu toggle
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import * as focusTrap from 'focus-trap';
const headerLogo = document.querySelector('.l-header__logo');
const hamburgerButton = document.querySelector('.c-hamburger');
const globalNavigation = document.querySelector('.c-gnav');
const blankSpace = document.querySelector('.l-header__blank-space');
const focusTrapOutsideClick = focusTrap.createFocusTrap('.c-gnav', {
    allowOutsideClick: true,
    checkCanFocusTrap: (trapContainers) => {
        const results = trapContainers.map((trapContainer) => {
            return new Promise((resolve) => {
                const interval = setInterval(() => {
                    if (getComputedStyle(trapContainer).visibility !== 'hidden') {
                        resolve();
                        clearInterval(interval);
                    }
                }, 5);
            });
        });
        return Promise.all(results);
    },
});

hamburgerButton.addEventListener('click', function () {
    if (globalNavigation.classList.contains('is-active')) {
        this.setAttribute('aria-expanded', 'false');
        this.setAttribute('aria-label', 'menu');
        this.classList.remove('is-active');
        headerLogo.classList.remove('is-active');
        globalNavigation.classList.remove('is-active');
        focusTrapOutsideClick.deactivate();
        blankSpace.classList.remove('is-active');
        enableBodyScroll(globalNavigation);
    } else {
        this.setAttribute('aria-label', 'close menu');
        this.setAttribute('aria-expanded', 'true');
        this.classList.add('is-active');
        headerLogo.classList.add('is-active');
        globalNavigation.classList.add('is-active');
        focusTrapOutsideClick.activate();
        blankSpace.classList.add('is-active');
        disableBodyScroll(globalNavigation);
    }
});

blankSpace.addEventListener('click', function () {
    hamburgerButton.setAttribute('aria-expanded', 'false');
    hamburgerButton.setAttribute('aria-label', 'menu');
    hamburgerButton.classList.remove('is-active');
    headerLogo.classList.remove('is-active');
    globalNavigation.classList.remove('is-active');
    this.classList.remove('is-active');
    focusTrapOutsideClick.deactivate();
    enableBodyScroll(globalNavigation);
});

// header on scroll
import 'intersection-observer';

const header = document.querySelector('.l-header');
const keyVisual = document.querySelector('.p-top-kv');

const observerHeaderPrePinned = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                header.classList.remove('is-pre-pinned');
            } else {
                header.classList.add('is-pre-pinned');
            }
        });
    },
    { threshold: 0.7 },
);

const observerHeaderPinned = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                header.classList.remove('is-pinned');
            } else {
                header.classList.add('is-pinned');
            }
        });
    },
    { threshold: 0.6 },
);

const observerHeaderVisible = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            header.classList.remove('is-visible');
        } else {
            header.classList.add('is-visible');
        }
    });
});

observerHeaderPrePinned.observe(keyVisual);
observerHeaderPinned.observe(keyVisual);
observerHeaderVisible.observe(keyVisual);

// switch viewport
!(function () {
    const viewport = document.querySelector('meta[name="viewport"]');
    function switchViewport() {
        const value = window.outerWidth > 366 ? 'width=device-width,initial-scale=1' : 'width=366';
        if (viewport.getAttribute('content') !== value) {
            viewport.setAttribute('content', value);
        }
    }
    addEventListener('resize', switchViewport, false);
    switchViewport();
})();

// object-fit-images
import objectFitImages from 'object-fit-images';

objectFitImages();

// postcss-viewport-height-correction
var customViewportCorrectionVariable = 'vh';

function setViewportProperty(doc) {
    var prevClientHeight;
    var customVar = '--' + (customViewportCorrectionVariable || 'vh');
    function handleResize() {
        var clientHeight = doc.clientHeight;
        if (clientHeight === prevClientHeight) return;
        requestAnimationFrame(function updateViewportHeight() {
            doc.style.setProperty(customVar, clientHeight * 0.01 + 'px');
            prevClientHeight = clientHeight;
        });
    }
    handleResize();
    return handleResize;
}
window.addEventListener('resize', setViewportProperty(document.documentElement));

// swiper
import Swiper from 'swiper/bundle';

new Swiper('.p-top-kv__swiper', {
    loop: true,
    speed: 1200,
    effect: 'fade',
    fadeEffect: {
        crossFae: true,
    },
    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
    },
});

// form validation bouncer
import Bouncer from 'formbouncerjs';

new Bouncer('form', {
    messages: {
        missingValue: {
            checkbox: 'このフィールドは必須です',
            radio: '値を選択してください',
            select: '値を選択してください',
            'select-multiple': '少なくとも1つの値を選択してください',
            default: 'このフィールドに記入してください',
        },
        patternMismatch: {
            email: '有効なEメールアドレスを入力してください',
            url: 'URLを入力してください',
            number: '数字を入力してください',
            color: '#rrggbb形式に合わせてください',
            date: 'YYYY-MM-DD形式で入力してください',
            time: '24時間の時間形式で入力してください。例 23:00',
            month: 'YYYY-MM形式を使用してください',
            default: '要求されたフォーマットに合わせてください',
        },
        outOfRange: {
            over: '{max}を超えない値を選択してください',
            under: '{min}以下の値を選択してください',
        },
        wrongLength: {
            over: 'このテキストを{maxLength}文字以下に短縮してください',
            under: 'このテキストを{minLength}文字数以上にしてください',
        },
    },
});
