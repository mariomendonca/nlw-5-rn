import { StyleSheet } from "react-native";
import { theme } from "../../global/styles/theme";

export const styles = StyleSheet.create({
  image: {
    width: 62,
    height: 66,
  },
  container: {
    width: 62,
    height: 66,
    borderRadius: 8,
    marginRight: 20,
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden'
  },
})