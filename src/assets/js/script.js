import 'focus-visible';
import 'nodelist-foreach-polyfill';
import 'picturefill';
import 'ie11-custom-properties';
import 'core-js/modules/es.object.assign';
import 'core-js/modules/es.number.is-nan';
import 'core-js/modules/es.string.repeat';
import 'core-js/modules/es.promise';

// hamburger menu toggle
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import * as focusTrap from 'focus-trap';
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
        globalNavigation.classList.remove('is-active');
        focusTrapOutsideClick.deactivate();
        blankSpace.classList.remove('is-active');
        enableBodyScroll(globalNavigation);
    } else {
        this.setAttribute('aria-label', 'close menu');
        this.setAttribute('aria-expanded', 'true');
        this.classList.add('is-active');
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
    globalNavigation.classList.remove('is-active');
    this.classList.remove('is-active');
    focusTrapOutsideClick.deactivate();
    enableBodyScroll(globalNavigation);
});

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

// google maps API
import { Loader } from '@googlemaps/js-api-loader';

const loader = new Loader({
    apiKey: 'AIzaSyA-9-cxgXhgarRUVwBLmA8FqacxlG2vbAA',
    version: 'weekly',
});

loader.load().then(() => {
    new google.maps.Map(document.getElementById('map'), {
        center: { lat: 38.25313653376707, lng: 140.3421864589631 },
        zoom: 16,
    });
});

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
