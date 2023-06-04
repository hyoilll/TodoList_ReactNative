import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { theme } from "./color";
import { useCallback, useState } from "react";
import Today from "./components/Today";
import Week from "./components/Week";

export default function App() {
  // false: Today, true: Week
  const [mainScreenFlag, setMainScreenFlag] = useState(false);

  const onClick = useCallback((menuText) => {
    console.log("btnClick");
    setMainScreenFlag(menuText === "Today" ? false : true);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => onClick("Today")}>
          <Text
            style={{
              ...styles.btnText,
              color: mainScreenFlag ? theme.grey : theme.white,
            }}
          >
            Today
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onClick("Week")}>
          <Text
            style={{
              ...styles.btnText,
              color: !mainScreenFlag ? theme.grey : theme.white,
            }}
          >
            Week
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.main}>
        {mainScreenFlag ? <Week></Week> : <Today></Today>}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.bg,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    marginTop: 100,
    justifyContent: "space-between",
  },
  btnText: {
    fontSize: 35,
    fontWeight: "bold",
    color: theme.white,
  },
  main: {},
});
