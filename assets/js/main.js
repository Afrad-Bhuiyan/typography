
"use strict";
OB_ready(OB_doWhenReady);

function OB_doWhenReady() {
    // localize everything
    var ooohBoi = window.ooohBoi || {};
    // local scope variables
    ooohBoi.prev_scroll_pos = window.scrollY || document.body.scrollTop;
    ooohBoi.cur_scroll_pos;
    ooohBoi.scroll_direction = 'init';
    ooohBoi.prev_scroll_direction = 0;
    ooohBoi.header = document.querySelector('#primary-header'); // header ID
    ooohBoi.header_pos = {
        top: ooohBoi.header.offsetTop,
        left: ooohBoi.header.offsetLeft,
    };
    ooohBoi.header_height = OB_outerHeight(ooohBoi.header);
    // show-hide header with ease/transition
    ooohBoi.header.style.transition = 'all 0.3s ease';
    // update header height on window resize
    ooohBoi.updateHeaderHeight = function() {
        ooohBoi.header_height = OB_outerHeight(ooohBoi.header);
    }
    // listen "scroll" event and decide what to do
    ooohBoi.checkScroll = function() {
        ooohBoi.cur_scroll_pos = window.scrollY || document.body.scrollTop;

        if (ooohBoi.cur_scroll_pos > ooohBoi.prev_scroll_pos) ooohBoi.scroll_direction = 'down';
        else if (ooohBoi.cur_scroll_pos < ooohBoi.prev_scroll_pos) ooohBoi.scroll_direction = 'up';

        if (ooohBoi.scroll_direction !== ooohBoi.prev_scroll_direction) ooohBoi.toggleHeader(ooohBoi.scroll_direction, ooohBoi.cur_scroll_pos);
        ooohBoi.prev_scroll_pos = ooohBoi.cur_scroll_pos;
    }
    // add or remove class based on the scrolling direction
    ooohBoi.toggleHeader = function(scroll_direction, scroll_current) {
        if (scroll_direction === 'down' && scroll_current > ooohBoi.header_height) {
            OB_addClass(ooohBoi.header, 'im-hidden'); // for styling
            ooohBoi.header.style.top = -1 * ooohBoi.header_height + "px";
            ooohBoi.prev_scroll_direction = scroll_direction;
        } else if (scroll_direction === 'up') {
            OB_removeClass(ooohBoi.header, 'im-hidden');
            ooohBoi.header.style.top = ooohBoi.header_pos.top + "px";
            ooohBoi.prev_scroll_direction = scroll_direction;
        }
    }
    // listen "scroll" and "resize" window events
    window.addEventListener('scroll', ooohBoi.checkScroll);
    window.addEventListener('resize', ooohBoi.updateHeaderHeight);
}


function OB_outerHeight(el) {
    var height = el.offsetHeight;
    var style = getComputedStyle(el);
    height += parseInt(style.marginTop) + parseInt(style.marginBottom);
    return height;
}

function OB_addClass(el, className) {
    if (el.classList) el.classList.add(className);
    else {
        var current = el.className,
            found = false;
        var all = current.split(' ');
        for (var i = 0; i < all.length, !found; i++) found = all[i] === className;
        if (!found) {
            if (current === '') el.className = className;
            else el.className += ' ' + className;
        }
    }
}

function OB_removeClass(el, className) {
    if (el.classList) el.classList.remove(className);
    else el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
}

function OB_ready(fn) {
    if (document.readyState != 'loading') fn();
    else if (document.addEventListener) document.addEventListener('DOMContentLoaded', fn);
    else {
        document.attachEvent('onreadystatechange', function() {
            if (document.readyState != 'loading') fn();
        });
    }
}
