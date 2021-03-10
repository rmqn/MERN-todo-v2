export const isEmpty = (value) => {
  return (
      value === undefined ||
      value === null ||
      (typeof value === "object" && Object.keys(value).length === 0) ||
      (typeof value === "string" && value.trim().length === 0)
  );
};

export const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export const dateParser = (num) => {
  let options = {
    hour: "2-digit",
    minute: "2-digit",
    // second: "2-digit",
    // weekday: "short",
    year: "2-digit",
    month: "2-digit",
    day: "2-digit",
  };

  let timestamp = Date.parse(num);

  let date = new Date(timestamp)
  .toLocaleDateString("fr-FR", options)
  .replace(',', ' à')
  .replace(':', 'h');

  return date.toString();
};