import { QueryParam } from "../api/models/shared";
import moment from "moment";
import { UserData } from "../api/models/userAccount";

export const sleep = (delay: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
};

export const autoLinkClick = (href: string) => {
  const link = document.createElement("a");
  link.href = href;
  link.target = "_self";
  document.body.appendChild(link);
  link.click();
};

export const queryStringBuilder = (query: QueryParam) => {
  const obj = query as any;

  const queryParameters = Object.entries(obj).map((el) => {
    if (el[1] !== "" && el[0] !== "id") {
      return `${el[0]}=${el[1]}`;
    } else {
      return "";
    }
  });
  return queryParameters.filter((el) => el !== "").join("&");
};

export function DateOnlyFormat(dateString: string) {
  return moment(dateString).format("DD-MMM-yyyy");
}

export function getNumberOfPages(totalRecords: number, pageSize: number) {
  return Math.ceil(totalRecords / pageSize);
}

export function toUTCConverter(dateObject: Date | string | null) {
  if (dateObject)
    return new Date(new Date(dateObject).toUTCString()).toISOString();
  else return new Date(new Date().toUTCString()).toISOString();
}

export const NairaFormatter = (value: number) => {
  const result = new Intl.NumberFormat("en", {
    style: "currency",
    currency: "NGN",
  }).format(value);

  return result.replace("NGN", "₦");
};

export const addMonths = (numberOfMonths: number) =>
  moment().add(numberOfMonths, "months").toDate();

export const hideByUserPosition = (user: UserData) =>
  user.positionInOrganisation !== 1;

export const hideByUserRole = (user: UserData) => !user.roles.includes("Admin");

export function DateTimeFormat(dateString = new Date()) {
  return moment(dateString).format("Do MMMM, YYYY h:mma");
}

export const MonthDayYearText = (date: Date) => {
  return `${GetMonthOfTheYearByNumber(
    date.getMonth() + 1
  )} ${date.getDate()}, ${date.getFullYear()}`;
};

export function GetMonthOfTheYearByNumber(monthNumber: number) {
  let month: string;
  switch (monthNumber) {
    case 1:
      month = "January";
      break;
    case 2:
      month = "February";
      break;
    case 3:
      month = "March";
      break;
    case 4:
      month = "April";
      break;
    case 5:
      month = "May";
      break;
    case 6:
      month = "June";
      break;
    case 7:
      month = "July";
      break;
    case 8:
      month = "August";
      break;
    case 9:
      month = "September";
      break;
    case 10:
      month = "October";
      break;
    case 11:
      month = "November";
      break;
    case 12:
      month = "December";
      break;
    default:
      month = "Unknown";
      break;
  }
  return month;
}
