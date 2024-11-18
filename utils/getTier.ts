export const getTierWithEmojiAndText = (tier: string) => {
  switch (tier) {
    case "GOLD":
      return "🥇 골드";
    case "SILVER":
      return "🥈 실버";
    case "BRONZE":
      return "🥉 브론즈";
    default:
      return "";
  }
};

export const getTierWithEmoji = (tier: string) => {
  switch (tier) {
    case "GOLD":
      return "🥇";
    case "SILVER":
      return "🥈";
    case "BRONZE":
      return "🥉";
    default:
      return "";
  }
};
