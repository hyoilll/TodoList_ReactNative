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

const STORAGE_KEY = "@todo_Today";

const Today = ({ itemListInToday, setItemListInToday }) => {
  const [toDo, setTodo] = useState({});

  useEffect(() => {
    const newWorks = Object.assign({}, itemListInToday, toDo);
    setItemListInToday(newWorks);
    loadFromStorage();
  }, [toDo]);

  const saveTodo = async (newWork) => {
    const works = Object.assign({}, itemListInToday, newWork);
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
        setItemListInToday(JSON.parse(todo));
      }
    } catch (e) {
      console.error(e);
    }
  };

  const onClick = useCallback(
    async (key) => {
      delete itemListInToday[key];
      const newObj = { ...itemListInToday };
      setItemListInToday(newObj);
      await saveTodo(newObj);
    },
    [itemListInToday]
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
    [itemListInToday]
  );

  return (
    <View>
      <Text style={styles.title}>Today</Text>
      <TextComp setTodo={setTodo} saveTodo={saveTodo}></TextComp>
      <ScrollView>
        {Object.keys(itemListInToday).map((key) => {
          return (
            <View key={key} style={styles.toDoList}>
              <Text style={styles.toDoText}>{itemListInToday[key].text}</Text>
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

export default Today;
