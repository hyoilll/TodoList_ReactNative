import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { theme } from "../color";
import TextComp from "./TextComp";

const Week = () => {
  return (
    <View>
      <Text style={{ color: theme.white }}>Week</Text>
      <TextComp></TextComp>
    </View>
  );
};

const styles = StyleSheet.create({});

export default Week;
