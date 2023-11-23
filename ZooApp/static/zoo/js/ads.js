let photos = [];
let interval = 0;
let current = 0;
let rotationInterval;

function startRotation() {
    console.log('start');
    rotationInterval = setInterval(rotateBanner, interval);
    document.addEventListener('visibilitychange', handleVisibilityChange);
}

function stopRotation() {
    console.log('stop');
    clearInterval(rotationInterval);
}

function rotateBanner() {
    console.log("rotate");
    let img = document.getElementById('ads');
    let index = (current + 1) % photos.length;
    img.src = photos[index].image;
    img.parentElement.href = photos[index].link;
    img.parentElement.alt = photos[index].name;
    current = index;
}

function handleVisibilityChange() {
    isPageFocused = document.visibilityState === 'visible';

    if (isPageFocused) {
        startRotation();
    } else {
        stopRotation();
    }

}

window.addEventListener("load", () => {
    fetch("http://localhost:8000/ads/")
        .then(response => response.json())
        .then(data => {
            console.log(data);
            photos = data.photos;
            interval = data.interval;
            console.log(photos);
            console.log(interval);
            rotateBanner();
            startRotation();
        })
})