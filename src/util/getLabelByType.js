export default function getPassengerType(type) {
  switch (type) {
    case "ADT":
      return "Adult";
    case "CHD":
      return "Child";
    case "INF":
      return "Infant";
    default:
      return "Unknown";
  }
}
