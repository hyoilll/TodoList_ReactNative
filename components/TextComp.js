import React, { useCallback, useState } from "react";
import { StyleSheet, TextInput } from "react-native";
import { theme } from "../color";

const TextComp = ({ period }) => {
  const [text, setText] = useState("");
  const [works, setWorks] = useState({});

  const onChangeText = useCallback((e) => {
    setText(e);
  }, []);
  const addTodo = useCallback(() => {
    if (text === "") return;

    const newWork = Object.assign({}, works, {
      [Date.now()]: { text, period },
    });

    setWorks(newWork);
    setText("");
  }, [text]);

  console.log(works);

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
