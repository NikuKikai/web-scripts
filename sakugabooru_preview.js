// ==UserScript==
// @name         sakugabooru preview
// @namespace    https://github.com/KisaragiAyano/web-scripts
// @version      0.1
// @description  preview video just like pXXXhub
// @author       Niku Kikai
// @match        https://www.sakugabooru.com/post
// @grant        none
// ==/UserScript==

'use strict';

function foo(){
    var video = document.createElement("VIDEO");
    video.style.position = "relative";
    video.style.top = "0";
    video.autoplay = "false";
    video.loop = "true";
    video.pause();
    video.onerror = _onerror;

    var posts = document.getElementById("post-list-posts");
    console.log(posts);

    var thumbs = posts.getElementsByClassName("thumb");
    for (var i = 0; i < thumbs.length; i++) {
        var thumb = thumbs[i];
        var preview_img = thumb.getElementsByClassName("preview")[0];

        thumb.addEventListener('mouseenter', _mouseenter);
        thumb.addEventListener('mouseleave', _mouseleave);
    }

    function _mouseenter(e){
        var thumb = e.srcElement;
        var preview_img = thumb.getElementsByClassName("preview")[0];
        video.width = preview_img.width;
        video.height = preview_img.height;
        var src = preview_img.src.substr(0, preview_img.src.length-4).replace("preview/","");
        video.src = src + ".mp4";
        stop = false;
        crttime = 0;
        thumb.appendChild(video);
        video.style.display = "block";
        preview_img.style.display = "none";
    }

    function _mouseleave(e){
        stop = true;
        var thumb = e.srcElement;
        var preview_img = thumb.getElementsByClassName("preview")[0];
        preview_img.style.display = "block";
        video.style.display = "none";
    }

    function _onerror(e){
        video.src = video.src.substr(0, video.src.length-4) + ".webm";
        video.load();
    }

    var crttime = 0;
    var stop = true;
    var timer = function(){
        if (video.readyState > 1 && !stop){ //HAVE_CURRENT_DATA
            crttime = (crttime + 1) % video.duration;
            video.currentTime = crttime;
        }
    };

    setInterval(timer, 333);
}

foo();