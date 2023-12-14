window.onload = function () {
    var slider2 = new Slider({
        images: '.slider-2 div.sliderContent',
        btnPrev: '.slider-2 .buttons .prev',
        btnNext: '.slider-2 .buttons .next',
        // auto: true,
        rate: 2000
    });
}

function Slider(obj) {
    var slider = this;
    var i = 0;

    this.images = document.querySelectorAll(obj.images);
    this.btnPrev = document.querySelector(obj.btnPrev);
    this.btnNext = document.querySelector(obj.btnNext);
    this.auto = obj.auto;
    this.rate = obj.rate || 1000;


    // count total project
    var totalProjectNumber = 0;
    for (var j = 0; j < this.images.length; j++)totalProjectNumber += this.images[j].children.length;
    document.getElementById('total_project_number').innerText = '' + totalProjectNumber;

    var updateUI = function () {
        slider.btnPrev.style.display = (i < 1 ? 'none' : 'block');
        slider.btnNext.style.display = (i > slider.images.length - 2 ? 'none' : 'block');

        var lastCount = i * 5 + slider.images[i].children.length
        document.getElementById('project_page_status').innerText = 'Showing ' + (i * 5 + 1) + ' to ' + lastCount;
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

    this.btnPrev.onclick = this.prev;
    this.btnNext.onclick = this.next;
    updateUI();

    if (slider.auto) {
        setInterval(slider.next, slider.rate);
    }
};
