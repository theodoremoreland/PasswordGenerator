const KATAKANA = "ｱｲｳｴｵｶｷｸｹｺｻｼｽｾ#*^-=+x/:_<>01".split("");
const fontSize = 24;
const canvas = document.querySelector(".DigitalRain");

if (canvas) {
  const ctx = canvas.getContext("2d");
  const columns = canvas.width / fontSize;
  /** Track the vertical 'y' position of each column */
  const columnPositions = Array.from({
    length: columns,
  }).fill(1);

  const draw = () => {
    if (!ctx) return;

    const renderingTopic = renderingTopicRef.current;

    ctx.fillStyle = "rgba(0, 0, 0, 0.05)"; // Draw a translucent background to create the trailing/fade effect
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.font = fontSize + "px";

    for (let i = 0; i < columnPositions.length; i++) {
      const currentRow = columnPositions[i];
      const currentColumn = i;

      if (
        activeColumnIndexRef.current === currentColumn &&
        numberOfCharactersLeftToRender > 0
      ) {
        ctx.fillStyle = isBuffering ? "#e2e2e2c0" : "#e2ff04";

        for (let j = 0; j < renderingTopic.length; j++) {
          const char = renderingTopic[j];

          if (char.hasRendered === false) {
            ctx.fillText(
              char.char,
              currentColumn * fontSize,
              currentRow * fontSize,
            );

            char.hasRendered = true;

            break;
          }
        }
      } else {
        const randomKatakanaCharacter =
          KATAKANA[Math.floor(Math.random() * KATAKANA.length)];

        ctx.fillStyle = "#e2e2e2c0";
        ctx.fillText(
          randomKatakanaCharacter,
          currentColumn * fontSize,
          currentRow * fontSize,
        );
      }

      if (currentRow * fontSize > canvas.height && Math.random() > 0.975) {
        // Reset row for current column
        columnPositions[i] = 0;
      }

      if (renderingTopic[renderingTopic.length - 1].hasRendered) {
        activeColumnIndexRef.current = generateValidRandomNumber(
          columnPositions.length,
          activeColumnIndexRef.current,
        );
        renderingTopicRef.current = formatRenderTopic(
          casedTopics[currentTopicIndexRef.current],
        );
        currentTopicIndexRef.current =
          currentTopicIndexRef.current === casedTopics.length - 1
            ? 0
            : currentTopicIndexRef.current + 1;
      }

      columnPositions[i]++;
    }
  };

  const animate = (time) => {
    const delta = time - timestampOfLastAnimateRef.current;

    if (delta >= 80) {
      draw();
      timestampOfLastAnimateRef.current = time;
    }

    animationFrameIdRef.current = requestAnimationFrame(animate);
  };

  animationFrameIdRef.current = requestAnimationFrame(animate);
} else if (!shouldAnimate) {
  if (animationFrameIdRef.current) {
    cancelAnimationFrame(animationFrameIdRef.current);
  }
}
