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
    const __gameIframe = document.querySelector("#gameIframe");
    const __requestFullScreen = __gameIframe.requestFullscreen || __gameIframe.mozRequestFullScreen || __gameIframe.webkitRequestFullscreen || __gameIframe.msRequestFullscreen;
    const __cancelFullScreen = document.exitFullscreen || document.mozCancelFullScreen || document.webkitExitFullscreen || document.msExitFullscreen;

    window.isFullscreen = () => {
        const tmp = !document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement;
        return !tmp;
    }

    window.makeFullScreen = () => {
        enterFullscreen(__gameIframe);
    }

    window.exitFullScreen = () => {
        leaveFullscreen();
        setTimeout(() => {
            window.scrollTo(document.body.scrollWidth + 200, 0);
        }, 50)
    }



    function enterFullscreen(element) {
        if (element.requestFullscreen) {
            element.requestFullscreen({ navigationUI: "hide" });
        }
        else if (element.mozRequestFullScreen) {
            element.mozRequestFullScreen({ navigationUI: "hide" });
        }
        else if (element.webkitRequestFullScreen) {
            element.webkitRequestFullScreen();
        }
        else if (docElm.msRequestFullscreen) {
            docElm.msRequestFullscreen();
        }
    }

    function leaveFullscreen() {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
        else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        }
        else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen();
        }
        else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
    }



}, 10);