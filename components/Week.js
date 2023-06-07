import React, { useCallback, useEffect, useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
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

  const onClick = useCallback(
    async (key) => {
      delete itemListInWeek[key];
      const newObj = { ...itemListInWeek };
      setItemListInWeek(newObj);
      await saveTodo(newObj);
    },
    [itemListInWeek]
  );

  const deleteBtnAlert = useCallback(
    (key) => {
      Alert.alert("Delete button event", "Want to delete an item?", [
        {
          text: "Cancel",
        },
        {
          text: "OK",
          onPress: async () => await onClick(key),
        },
      ]);
    },
    [itemListInWeek]
  );

  return (
    <View>
      <Text style={styles.title}>Week</Text>
      <TextComp setTodo={setTodo} saveTodo={saveTodo}></TextComp>
      <ScrollView>
        {Object.keys(itemListInWeek).map((key) => {
          return (
            <View key={key} style={styles.toDoList}>
              <Text style={styles.toDoText}>{itemListInWeek[key].text}</Text>
              <TouchableOpacity
                style={styles.delBtn}
                onPress={() => deleteBtnAlert(key)}
              >
                <Text style={styles.delBtnText}>Clear</Text>
              </TouchableOpacity>
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  toDoText: {
    fontSize: 20,
    color: theme.white,
  },
  delBtn: {
    backgroundColor: theme.pink,
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 5,
  },
  delBtnText: {},
});

export default Week;
