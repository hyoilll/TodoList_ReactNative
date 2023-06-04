import React, { useCallback, useState } from "react";
import { StyleSheet, TextInput } from "react-native";
import { theme } from "../color";

const TextComp = () => {
  const [text, setText] = useState("");
  const onChangeText = useCallback((e) => {
    setText(e);
  }, []);

  return (
    <TextInput
      style={styles.input}
      placeholder="Add Todo"
      onChangeText={onChangeText}
      value={text}
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
