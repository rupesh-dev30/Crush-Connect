import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import Slider from "../components/Slider";
import { ImageSlider } from "../../data/SliderData";
import { Link, useRouter } from "expo-router";

export default function Index() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleCreateAccount = () => {
    setLoading(true);
    router.push("/(auth)/signup");
    setLoading(false)
  };

  return (
    <View style={styles.container}>
      <Slider itemList={ImageSlider} />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleCreateAccount}>
          <Text style={styles.buttonText}>Create an account</Text>
          {loading && (
            <ActivityIndicator color="white" style={styles.spinner} />
          )}
        </TouchableOpacity>

        <View style={styles.textContent}>
          <Text>Already have an account?</Text>
          <Link className="text-[#E94057] font-bold" href="/(auth)/signin">
            Sign In
          </Link>
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
    marginTop: 10,
  },
  spinner: {
    marginLeft: 10,
  },
});
