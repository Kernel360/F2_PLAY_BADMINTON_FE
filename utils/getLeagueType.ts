export const getLeagueType = (type: string) => {
  switch (type) {
    case "SINGLES":
      return "단식";
    case "DOUBLES":
      return "복식";
    default:
      return "";
  }
};
