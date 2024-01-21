function playTest(levelInfo) {
    var iframeElem = document.getElementById('playTestIframe');
    var src = iframeElem.src;
    iframeElem.src = src.split('?')[0] + '?mode=1&levelInfo=' + encodeURIComponent(levelInfo);
    console.log(iframeElem.src);
}

function showSampleLevelInBuildTool(sampleIndex) {
    var iframeElem = document.getElementById('buildToolIframe');
    var src = iframeElem.src;
    iframeElem.src = src.split('?')[0] + '?mode=2&sampleLevelIndex=' + sampleIndex;
}


// setTimeout(() => {
//     var iframeElem = document.getElementById('playTestIframe');
//     var src = iframeElem.src || iframeElem?.contentWindow?.location?.href;
//     console.log(src);
// }, 1000)