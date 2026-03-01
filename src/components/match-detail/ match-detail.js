document.querySelectorAll(".bar").forEach((bar) => {
  const left = bar.querySelector(".bar-left");
  const right = bar.querySelector(".bar-right");
  const gap = bar.querySelector(".bar-gap");

  if (!left || !right || !gap) return;

  const leftWidth = parseFloat(left.style.width) || 0;
  const rightWidth = parseFloat(right.style.width) || 0;

  if (leftWidth === 0 || rightWidth === 0) {
    gap.style.display = "none";
  } else {
    gap.style.display = "block";
  }
});
