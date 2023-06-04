import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { theme } from "../color";
import TextComp from "./TextComp";

const Today = () => {
  return (
    <View>
      <Text style={{ color: theme.white }}>Today</Text>
      <TextComp period="Today"></TextComp>
    </View>
  );
};

const styles = StyleSheet.create({});

export default Today;
