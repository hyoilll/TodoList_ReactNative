import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { theme } from "../color.js";
import TextComp from "./TextComp";
import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "@todo_Week";

const Week = ({ itemListInWeek, setItemListInWeek }) => {
  const [toDo, setTodo] = useState({});

  useEffect(() => {
    const newWorks = Object.assign({}, itemListInWeek, toDo);
    setItemListInWeek(newWorks);
    loadFromStorage();
  }, [toDo]);

  const saveTodo = async (newWork) => {
    const works = Object.assign({}, itemListInWeek, newWork);
    try {
      const objToStr = JSON.stringify(works);
      await AsyncStorage.setItem(STORAGE_KEY, objToStr);
    } catch (e) {
      console.error(e);
    }
  };

  const loadFromStorage = async () => {
    try {
      const todo = await AsyncStorage.getItem(STORAGE_KEY);
      if (todo !== null) {
        setItemListInWeek(JSON.parse(todo));
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <View>
      <Text style={styles.title}>Week</Text>
      <TextComp setTodo={setTodo} saveTodo={saveTodo}></TextComp>
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
