export const formatDateTime = (dateInput) => {
  const date = new Date(dateInput);

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = String(date.getFullYear()).slice(-2);

  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, "0");

  const ampm = hours >= 12 ? "PM" : "AM";

  hours = hours % 12;
  hours = hours ? hours : 12; // convert 0 → 12

  const formattedHours = String(hours).padStart(2, "0");

  return `${day}-${month}-${year}, ${formattedHours}:${minutes} ${ampm}`;
};
