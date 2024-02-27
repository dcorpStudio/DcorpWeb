// =================================================
// Puzzle & Image URL handling

// page redirect
window._game_changePuzzle = function (finalUrl) {
    if (window['isUsingHistoryPushState'] && history.pushState) {
        // console.log(`finalUrl = ${finalUrl}`);
        window.history.pushState({ path: finalUrl }, '', finalUrl);
    } else location.href = finalUrl;
}


// =================================================
// Common logic for page handling

// disable default restoring previous scroll position 
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

// auto scroll to top right
setTimeout(() => {
    window.scrollTo(document.body.scrollWidth + 200, 0);
}, 1);


// ------------------ 
// full screen support
// ------------------ 

setTimeout(() => {
    var __gameIframe = document.querySelector("#gameIframe");
    var __requestFullScreen = __gameIframe.requestFullscreen || __gameIframe.mozRequestFullScreen || __gameIframe.webkitRequestFullscreen || __gameIframe.msRequestFullscreen;
    var __cancelFullScreen = document.exitFullscreen || document.mozCancelFullScreen || document.webkitExitFullscreen || document.msExitFullscreen;

    window.isFullscreen = () => {
        var tmp = !document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement;
        return !tmp;
    }

    window.makeFullScreen = () => {
        __requestFullScreen.call(__gameIframe);
    }

    window.exitFullScreen = () => {
        __cancelFullScreen.call(document);
        setTimeout(() => {
            window.scrollTo(document.body.scrollWidth + 200, 0);
        }, 50)
    }
}, 10);