import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { theme } from "./color.js";
import { useCallback, useState } from "react";
import Today from "./components/Today.js";
import Week from "./components/Week.js";

export default function App() {
  // false: Today, true: Week
  const [mainScreenFlag, setMainScreenFlag] = useState(false);
  const [itemListInToday, setItemListInToday] = useState({});
  const [itemListInWeek, setItemListInWeek] = useState({});

  const onClick = useCallback((menuText) => {
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
        {mainScreenFlag ? (
          <Week
            itemListInWeek={itemListInWeek}
            setItemListInWeek={setItemListInWeek}
          ></Week>
        ) : (
          <Today
            itemListInToday={itemListInToday}
            setItemListInToday={setItemListInToday}
          ></Today>
        )}
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
