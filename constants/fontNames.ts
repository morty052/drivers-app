import { Platform } from "react-native";

export const SEMI_BOLD = Platform.select({
  android: "Inter_600SemiBold",
  ios: "Inter-SemiBold",
});

export const MEDIUM = Platform.select({
  android: "Inter_500Medium",
  ios: "Inter-Medium",
});

export const REGULAR = Platform.select({
  android: "Inter_400Regular",
  ios: "Inter-Regular",
});
