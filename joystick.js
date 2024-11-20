document.addEventListener("DOMContentLoaded", () => {
    const joystickContainer = document.getElementById("joystick-container");
    const joystick = document.getElementById("joystick");
    const square = document.getElementById("square");
    const squareSpeed = 5;
    let squarePos = { x: 0, y: 0 };
    let joystickActive = false;
    let joystickStart = { x: 0, y: 0 };

    function updateSquarePosition(dx, dy) {
        const gameContainer = document.getElementById("game-container");
        squarePos.x += dx * squareSpeed;
        squarePos.y += dy * squareSpeed;
        squarePos.x = Math.max(0, Math.min(gameContainer.clientWidth - square.offsetWidth, squarePos.x));
        squarePos.y = Math.max(0, Math.min(gameContainer.clientHeight - square.offsetHeight, squarePos.y));
        square.style.left = `${squarePos.x}px`;
        square.style.top = `${squarePos.y}px`;
    }

    joystickContainer.addEventListener("touchstart", (e) => {
        joystickActive = true;
        joystickStart = { x: e.touches[0].clientX, y: e.touches[0].clientY };
        joystick.style.transition = "none";
    });

    joystickContainer.addEventListener("touchmove", (e) => {
        if (!joystickActive) return;

        const rect = joystickContainer.getBoundingClientRect();
        const dx = e.touches[0].clientX - rect.left - rect.width / 2;
        const dy = e.touches[0].clientY - rect.top - rect.height / 2;

        const distance = Math.min(Math.sqrt(dx * dx + dy * dy), rect.width / 2 - joystick.offsetWidth / 2);
        const angle = Math.atan2(dy, dx);
        const offsetX = Math.cos(angle) * distance;
        const offsetY = Math.sin(angle) * distance;

        joystick.style.left = `${offsetX + rect.width / 2 - joystick.offsetWidth / 2}px`;
        joystick.style.top = `${offsetY + rect.height / 2 - joystick.offsetHeight / 2}px`;

        const normalizedDX = offsetX / distance || 0;
        const normalizedDY = offsetY / distance || 0;

        updateSquarePosition(normalizedDX, normalizedDY);
    });

    joystickContainer.addEventListener("touchend", () => {
        joystickActive = false;
        joystick.style.transition = "left 0.1s, top 0.1s";
        joystick.style.left = "50%";
        joystick.style.top = "50%";
    });
});
