import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { theme } from "../color.js";
import TextComp from "./TextComp";

const Today = ({ itemListInToday, setItemListInToday }) => {
  const [toDo, setTodo] = useState({});

  useEffect(() => {
    const newWorks = Object.assign({}, itemListInToday, toDo);
    setItemListInToday(newWorks);
  }, [toDo]);

  return (
    <View>
      <Text style={styles.title}>Today</Text>
      <TextComp setTodo={setTodo}></TextComp>
      <ScrollView>
        {Object.keys(itemListInToday).map((key) => {
          return (
            <View key={key} style={styles.toDoList}>
              <Text style={styles.toDoText}>{itemListInToday[key].text}</Text>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    color: theme.white,
  },
  toDoList: {
    backgroundColor: theme.grey,
    marginTop: 12,
    marginHorizontal: 12,
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 13,
  },
  toDoText: {
    fontSize: 20,
    color: theme.white,
  },
});

export default Today;
