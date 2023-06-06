import React, { useCallback, useState } from "react";
import { StyleSheet, TextInput } from "react-native";
import { theme } from "../color.js";

const TextComp = ({ setTodo, saveTodo }) => {
  const [text, setText] = useState("");

  const onChangeText = useCallback((e) => {
    setText(e);
  }, []);

  const addTodo = useCallback(async () => {
    if (text === "") return;

    const newWork = { [Date.now()]: { text } };

    await saveTodo(newWork);
    setTodo(newWork);
    setText("");
  }, [text]);

  return (
    <TextInput
      style={styles.input}
      placeholder="Add Todo"
      onChangeText={onChangeText}
      value={text}
      onSubmitEditing={addTodo}
    ></TextInput>
  );
};

const styles = StyleSheet.create({
  input: {
    margin: 12,
    borderWidth: 1,
    paddingVertical: 8,
    paddingHorizontal: 15,
    backgroundColor: theme.white,
    borderRadius: 30,
    fontSize: 16,
  },
});

export default TextComp;

// objectにアイテムを加える方法
// Object.assign({}, currenctObj, newObj)
