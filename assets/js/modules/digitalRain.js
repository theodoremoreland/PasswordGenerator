window.KATAKANA = "01".split("");
const fontSize = 24;
let timestampOfLastAnimate = 0;
let animationFrameId = 0;

window.addEventListener("load", () => {
  const canvas = document.querySelector(".DigitalRain");

  if (canvas) {
    const ctx = canvas.getContext("2d");
    const dpr = window.devicePixelRatio || 1;
    canvas.width = canvas.clientWidth * dpr;
    canvas.height = canvas.clientHeight * dpr;
    const columns = canvas.width / fontSize;
    /** Track the vertical 'y' position of each column */
    const columnPositions = Array.from({
      length: columns,
    }).fill(1);

    const draw = () => {
      if (!ctx) return;

      ctx.fillStyle = "rgba(0, 0, 0, 0.05)"; // Draw a translucent background to create the trailing/fade effect
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = fontSize + "px body, sans-serif";

      for (let i = 0; i < columnPositions.length; i++) {
        const currentRow = columnPositions[i];
        const currentColumn = i;

        const randomKatakanaCharacter =
          window.KATAKANA[Math.floor(Math.random() * KATAKANA.length)];

        ctx.fillStyle = "#2500ccc0";
        ctx.fillText(
          randomKatakanaCharacter,
          currentColumn * fontSize,
          currentRow * fontSize,
        );

        if (currentRow * fontSize > canvas.height && Math.random() > 0.975) {
          // Reset row for current column
          columnPositions[i] = 0;
        }

        columnPositions[i]++;
      }
    };

    const animate = (time) => {
      const delta = time - timestampOfLastAnimate;

      if (delta >= 80) {
        draw();
        timestampOfLastAnimate = time;
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate); // Initial draw to avoid a blank canvas on load

    draw(); // Initial draw to avoid a blank canvas on load
  }
});
