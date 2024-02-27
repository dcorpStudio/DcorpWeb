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

// full screen support
function isFullscreen() {
    var tmp = document.fullScreen || document.mozFullScreen || document.webkitIsFullScreen || document.msFullscreenElement;
    return tmp;
}

function makeFullScreen() {
    // document.body.requestFullscreen();
    document.querySelector('#gameIframe').requestFullscreen();
}

function exitFullScreen() {
    document.exitFullscreen();
    setTimeout(() => {
        window.scrollTo(document.body.scrollWidth + 200, 0);
    }, 50)
}