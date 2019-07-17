// ==UserScript==
// @name         booru frame control
// @namespace    https://github.com/KisaragiAyano/web-scripts
// @version      0.1
// @description  try to take over the world!
// @author       Niku Kikai
// @match        https://www.sakugabooru.com/post/show/*
// @grant        none
// ==/UserScript==

'use strict';

function foo(){
    var video = document.getElementsByTagName("video");
    console.log(video);
    video = video[0];
    video.autoplay = false;
    // video.controls = false;
    let parent = video.parentElement;

    var duration, Nfrm;

    var nfrm = 0;
    video.currentTime = nfrm /24;


    let control = document.createElement('div');
    let text_frm = document.createElement('label');
    let btn_pre_frm = document.createElement('button');
    let btn_nxt_frm = document.createElement('button');

    function pre_frm(){
        video.pause()
        nfrm = nfrm - 1;
        if (nfrm < 0) nfrm = Nfrm - 1;
        video.currentTime = nfrm /24;
        text_frm.innerHTML = nfrm + ' / ' + Nfrm;
    }
    function nxt_frm(){
        video.pause()
        nfrm = nfrm + 1;
        nfrm = nfrm % Nfrm;
        video.currentTime = nfrm /24;
        text_frm.innerHTML = nfrm + ' / ' + Nfrm;
    }

    btn_pre_frm.type = 'button';
    btn_pre_frm.id = 'pre_frm';
    btn_pre_frm.innerHTML = ' < ';
    btn_pre_frm.addEventListener('click', pre_frm);

    btn_nxt_frm.type = 'button';
    btn_nxt_frm.id = 'nxt_frm';
    btn_nxt_frm.innerHTML = ' > ';
    btn_nxt_frm.addEventListener('click', nxt_frm);

    control.appendChild(btn_pre_frm);
    control.appendChild(text_frm);
    control.appendChild(btn_nxt_frm);
    parent.appendChild(control);

    video.addEventListener('loadeddata', function(){
        duration = video.duration;
        Nfrm = Math.floor(duration * 24);
        text_frm.innerHTML = nfrm + ' / ' + Nfrm;
    });
    video.addEventListener('timeupdate', function(){
        if (!video.paused){
            console.log(video.currentTime);
            nfrm = Math.floor(video.currentTime * 24);
            text_frm.innerHTML = nfrm + ' / ' + Nfrm;
        }
    });

    parent.onkeypress = function(e){
        console.log(e.keyCode);
        if((e || window.event).keyCode === 100){
            pre_frm();
        }

        if((e || window.event).keyCode === 102){
            nxt_frm();
        }
    };
}

foo();