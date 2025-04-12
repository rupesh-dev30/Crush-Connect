import {
  View,
  StyleSheet,
  SafeAreaView,
  Button,
  TouchableOpacity,
  Text,
} from "react-native";
import React from "react";
import Slider from "../components/Slider";
import { ImageSlider } from "../../data/SliderData";
import { Link } from "expo-router";

export default function Index() {
  return (
    <View style={styles.container}>
      <Slider itemList={ImageSlider} />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Create an account</Text>
        </TouchableOpacity>

        <View style={styles.textContent}>
          <Text>Already have an account?</Text>
          <Link className="text-[#E94057] font-bold" href={'/(auth)/signin'}>Sign In</Link>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  buttonContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#E94057",
    width: "70%",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  textContent: {
    display: "flex",
    flexDirection: "row",
    gap: 5,
    fontWeight: "semibold",
    marginTop: 10
  }
});
