document.addEventListener('DOMContentLoaded', function () {
    const circularImages = document.querySelectorAll('.circular-image');
    const gradientText = document.querySelector('.gradient-text2');
    const forwardButton = document.querySelector('.forward-button');
    const backwardButton = document.querySelector('.backward-button');

    let currentIndex = 0;
    const totalImages = circularImages.length;
    const centralImageIndex = Math.floor(totalImages / 1);

    function setupInitialPositions() {
        const rotationAngle = 360 / totalImages;
        circularImages.forEach((image, index) => {
            const rotation = index * rotationAngle;
            image.style.position = 'absolute';
            image.style.transform = `rotate(${rotation}deg) translateX(250px)`;
            image.style.transformOrigin = '0 center';
        });
    }

    function rotateSelectedImage(forward = true) {
        const previousIndex = currentIndex;
        if (forward) {
            currentIndex = (currentIndex + 1) % totalImages;
        } else {
            currentIndex = (currentIndex - 1 + totalImages) % totalImages;
        }
        const rotationAngle = 360 / totalImages;
        const currentRotation = currentIndex * rotationAngle;
        const centralRotation = centralImageIndex * rotationAngle;
        const offsetRotation = centralRotation - currentRotation;

        circularImages.forEach((image, index) => {
            const rotation = (index * rotationAngle) + offsetRotation;
            image.style.transition = 'transform 0.5s ease-in-out';
            image.style.transform = `rotate(${rotation}deg) translateX(250px)`;
        });

        updateGradientText(previousIndex, currentIndex);
    }

    function updateGradientText(previousIndex, currentIndex) {
        const oldColor = window.getComputedStyle(circularImages[previousIndex]).borderColor;
        const newColor = window.getComputedStyle(circularImages[currentIndex]).borderColor;
        gradientText.style.transition = 'color 0.5s ease-in-out';
        gradientText.style.color = newColor;
    }

    function handleForwardButtonClick() {
        rotateSelectedImage(true);
    }

    function handleBackwardButtonClick() {
        rotateSelectedImage(false);
    }

    forwardButton.addEventListener('click', handleForwardButtonClick);
    backwardButton.addEventListener('click', handleBackwardButtonClick);

    circularImages.forEach(image => {
        image.addEventListener('transitionend', () => {
            image.style.transition = 'none';
        });
    });

    setupInitialPositions();
    rotateSelectedImage(true); // Initial rotation is forward for setup
});
