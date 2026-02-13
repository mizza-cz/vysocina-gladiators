initTimers();

function initTimers() {
  let countItems = document.querySelectorAll(".timer");

  if (!countItems.length) return;

  countItems.forEach(function (countItem, index) {
    initializeTimer(countItem, index + 1);
  });
}

function initializeTimer(countItem, timerIndex) {
  let daysElement = document.getElementById(`countdown-days-${timerIndex}`);
  let hoursElement = document.getElementById(`countdown-hours-${timerIndex}`);
  let minutesElement = document.getElementById(
    `countdown-minutes-${timerIndex}`
  );

  let deadline = new Date(countItem.dataset.endtime).getTime();
  let timerInterval;

  function updateTimer() {
    let currentTime = new Date().getTime();
    let timeDifference = deadline - currentTime;

    if (timeDifference <= 0) {
      countItem.innerHTML = `<b class="py-3 text-uppercase h3 text-center" style="grid-column: span 4">Událost již začala</b>`;
      clearInterval(timerInterval);
      return;
    }

    let days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    let hours = Math.floor(
      (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    let minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));

    if (daysElement) daysElement.textContent = days;
    if (hoursElement) hoursElement.textContent = hours;
    if (minutesElement) minutesElement.textContent = minutes;
  }

  updateTimer();
  timerInterval = setInterval(updateTimer, 1000);
}
