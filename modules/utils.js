/**
 * Utils functions
 * @modules utils/utils
 * @see module:utils/utils
 */
/**
 * Check if file is greater than 4MB
 * @param file
 * @return {boolean}
 */
const checkIfIsGreaterThan4MB = (file) => {
  return file[0].size > 4 * 1024 * 1024;
};
/**
 * Show confetti for seconds and set width and height
 * @param seconds
 * @param setWidth
 * @param setHeight
 */
const showConfettiForSeconds = (seconds, setWidth, setHeight) => {
  setWidth(window.innerWidth);
  setHeight(window.innerHeight);
  setTimeout(() => {
    setWidth(0);
    setHeight(0);
  }, seconds * 1000);
};
/**
 * Show alert for 5 seconds
 * @param message
 * @param setAlertSetUp
 */
const showAlert = (message, setAlertSetUp) => {
  setAlertSetUp({ show: true, message: message });
  setTimeout(() => {
    setAlertSetUp({ show: false, message: "" });
  }, 5000);
};
/**
 * Check if prompt has more than 1000 chars
 * @param prompt
 * @return {boolean}
 */
const checkIfHasLessThan1000Chars = (prompt) => {
  return prompt.length < 1000;
};
/**
 * Handle timestamp
 * @param date
 * @return {string}
 */
const handleTimeStamp = (date) => {
  const dateformat = new Date(date);
  return dateformat.toLocaleDateString("it-IT", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  });
};

/**
 * Handle timestamp for chat
 * @param date
 * @return {string}
 */
const handleChatTimeStamp = (date) => {
  const dateformat = new Date(date);
  return dateformat.toLocaleTimeString("it-IT");
};

const orderDateBy = (data, by) => {
  //order by alphabet
  return data.sort((a, b) => {
    if (a[by] < b[by]) {
      return -1;
    }
    return 1;
  });
};
/**
 * Scroll to top
 */
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

const scrollToElement = (id) => {
  const element = document.getElementById(id);
  element.scrollIntoView({
    behavior: "smooth",
  });
};
/**
 * Close daisy dialog
 */
const handleClick = () => {
  const elem = document.activeElement;
  if (elem) {
    elem?.blur();
  }
};

/**
 * Handle name by mongo id
 * @param id
 * @return {string}
 */
const handleNameByMongoId = (id) => {
  switch (id) {
    case "user_2Pst07HiOUviTIfzlJHg8ZoaZrY": //hide me :P
      return "alBz";
    default:
      return "User Anonimo";
  }
};

export {
  checkIfIsGreaterThan4MB,
  showConfettiForSeconds,
  showAlert,
  checkIfHasLessThan1000Chars,
  handleTimeStamp,
  orderDateBy,
  scrollToTop,
  scrollToElement,
  handleClick,
  handleNameByMongoId,
  handleChatTimeStamp,
};
