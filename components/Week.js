import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { theme } from "../color.js";
import TextComp from "./TextComp";

const Week = ({ itemListInWeek, setItemListInWeek }) => {
  const [toDo, setTodo] = useState({});

  useEffect(() => {
    const newWorks = Object.assign({}, itemListInWeek, toDo);
    setItemListInWeek(newWorks);
  }, [toDo]);

  return (
    <View>
      <Text style={styles.title}>Week</Text>
      <TextComp setTodo={setTodo}></TextComp>
      <ScrollView>
        {Object.keys(itemListInWeek).map((key) => {
          return (
            <View key={key} style={styles.toDoList}>
              <Text style={styles.toDoText}>{itemListInWeek[key].text}</Text>
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

export default Week;
