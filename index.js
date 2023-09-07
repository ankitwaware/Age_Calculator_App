"use strict";
const inputDayEl = document.getElementById("day");
const inputMonthEl = document.getElementById("month");
const inputYearEl = document.getElementById("year");

const dayErrorEl = document.querySelector(".Eday");
const monthErrorEl = document.querySelector(".Emonth");
const yearErrorEl = document.querySelector(".Eyear");

//data
const today = new Date();
const currentYear = today.getUTCFullYear();
const currentMonth = today.getUTCMonth() + 1;
const currentDay = today.getUTCDate();

function age() {
  checkValidity();

  if (checkValidity()) {
    const inputDay = Number(inputDayEl.value);
    const inputMonth = Number(inputMonthEl.value);
    const inputYear = Number(inputYearEl.value);

    let Year, Month, Day;
    Year = currentYear - inputYear;

    //get months
    if (currentMonth >= inputMonth)
      //get months when current month is greater
      Month = currentMonth - inputMonth;
    else {
      Year--;
      Month = 12 + currentMonth - inputMonth;
    }

    //get days
    if (currentDay >= inputDay)
      //get days when the current date is greater
      Day = currentDay - inputDay;
    else {
      Month--;
      Day = 31 + currentDay - inputDay;

      if (Month < 0) {
        Month = 11;
        Year--;
      }
    }

    document.getElementById("outputYear").innerHTML = Year;
    document.getElementById("outputMonth").innerHTML = Month;
    document.getElementById("outputDay").innerHTML = Day;
  }
}

function toggle_box_and_label_color() {
  document.querySelectorAll(".label").forEach((label) => {
    label.classList.add("labelError");
  });

  document.querySelectorAll(".input").forEach((input) => {
    input.classList.add("inputError");
  });
}

/**
 * set invalid message to `day` or `month` or `year`
 * @param {boolean} day
 * @param {boolean} month
 * @param {boolean} year
 */
function invalidErrorMessage(day = false, month = false, year = false) {
  toggle_box_and_label_color();
  if (day) dayErrorEl.innerText = "Must be a valid day";
  if (month) monthErrorEl.innerText = "Must be a valid month";
  if (year) yearErrorEl.innerText = "Must be in the past";
}

const checkValidity = function (event) {
  let flag = true;
  const inputDay = inputDayEl.value;
  const inputMonth = inputMonthEl.value;
  const inputYear = inputYearEl.value;

  // empty submisson whole required error
  if (!inputDay && !inputMonth && !inputYear) {
    flag = false;
    toggle_box_and_label_color();

    document.querySelectorAll(".requiredErrorMessage").forEach((element) => {
      element.innerText = "";
      element.innerText = "This Field is required";
    });
  }

  // empty any one required error
  if (!inputDay) {
    flag = false;
    dayErrorEl.innerHTML = "This Field is required";
  }

  if (!inputMonth) {
    flag = false;
    monthErrorEl.innerHTML = "This Field is required";
  }

  if (!inputYear) {
    flag = false;
    yearErrorEl.innerHTML = "This Field is required";
  }

  // invalid error
  if (inputDay && (inputDay < 1 || inputDay > 31)) {
    flag = false;
    invalidErrorMessage(true, false, false);
  }

  if (inputMonth && (inputMonth < 1 || inputMonth > 12)) {
    flag = false;
    invalidErrorMessage(false, true, false);
  }

  if (inputYear && (inputYear > currentYear || inputYear.length !== 4)) {
    flag = false;
    invalidErrorMessage(false, false, true);
  }

  if (
    new Date(
      Number(inputYear),
      Number(inputMonth),
      Number(inputDay)
    ).getTime() > today.getTime()
  ) {
    flag = false;
    invalidErrorMessage(true, true, true);
  }

  return flag;
};
