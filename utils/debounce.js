function debounceTime(Fn, delay = 500) {
  let timerID;
  return function (...args) {
    timerID && clearTimeout(timerID);
    timerID = setTimeout(() => {
      Fn(...args);
    }, delay);
  };
}

export default debounceTime;
