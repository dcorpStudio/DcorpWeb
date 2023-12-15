
window.onload = function () {
    // projectSlider
    var projectSlider = new Slider(
        {
            images: '.slider-2 div.sliderContent',
            btnPrev: '.slider-2 .buttons .prev',
            btnNext: '.slider-2 .buttons .next',
            // auto: true,
            // rate: 2000
        },
        function (firstCount, lastCount, totalItemCount) {
            document.getElementById('total_project_number').innerText = '' + totalItemCount;
            document.getElementById('project_page_status').innerText = 'Showing ' + firstCount + ' to ' + lastCount;
        }
    );

    // singleProject image auto fade slider
    var projectImgContainerArr = document.querySelectorAll('.flashingImgContainer');
    for (var k = 0; k < projectImgContainerArr.length; k++) {
        var x = new AutoImageFlashing(projectImgContainerArr[k].children, 4000);
    }
}



function AutoImageFlashing(imgArr, rate) {
    var randomDelay = Math.random() * (rate || 1000);
    if (imgArr.length == 1) return console.log('imgArr.length = ' + imgArr.length);
    var i = 0;

    var show = function (index) {
        imgArr[index].classList.add('imgFlashingShow');
    }

    var hide = function (index) {
        imgArr[index].classList.remove('imgFlashingShow');
    }

    var next = function () {
        hide(i);
        i++;
        if (i >= imgArr.length) { i = 0; }
        show(i);
    }

    for (var j = 0; j < imgArr.length; j++) { hide(j); }
    show(0);
    setTimeout(function () {
        setInterval(next, rate || 1000);
    }, randomDelay)
};



function Slider(obj, onSlideCallback = null) {
    var sldierContentCount = 5;

    var slider = this;
    var i = 0;

    this.images = document.querySelectorAll(obj.images);
    this.btnPrev = document.querySelector(obj.btnPrev);
    this.btnNext = document.querySelector(obj.btnNext);
    this.auto = obj.auto;
    this.rate = obj.rate || 1000;


    // count total project
    var totalItemCount = 0;
    for (var j = 0; j < this.images.length; j++) {
        totalItemCount += this.images[j].children.length;
    }

    var updateUI = function () {
        if (slider.btnPrev) slider.btnPrev.style.display = (i < 1 ? 'none' : 'block');
        if (slider.btnNext) slider.btnNext.style.display = (i > slider.images.length - 2 ? 'none' : 'block');

        if (onSlideCallback) {
            var firstCount = (i * sldierContentCount + 1);
            var lastCount = i * sldierContentCount + slider.images[i].children.length
            onSlideCallback(firstCount, lastCount, totalItemCount)
        }
    }

    this.prev = function () {
        i = Math.max(0, i - 1);
        updateUI();
        slider.images[i + 1].classList.remove('shown');
        slider.images[i].classList.add('shown');
    }

    this.next = function () {
        i = Math.min(slider.images.length - 1, i + 1);
        updateUI();
        slider.images[i - 1].classList.remove('shown');
        slider.images[i].classList.add('shown');
    }

    if (this.btnPrev) this.btnPrev.onclick = this.prev;
    if (this.btnNext) this.btnNext.onclick = this.next;
    updateUI();

    if (slider.auto) {
        setInterval(slider.next, slider.rate);
    }
};
