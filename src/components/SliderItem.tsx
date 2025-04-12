import { View, Text, Image, StyleSheet, Dimensions } from "react-native";
import React from "react";
import { ImageSliderType } from "../../data/SliderData";
import Animated, {
  Extrapolation,
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";

type Props = {
  item: ImageSliderType;
  index: number;
  scrollX: SharedValue<number>;
};

const { width } = Dimensions.get("screen");

export default function SliderItem({ item, index, scrollX }: Props) {
  const rnAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: interpolate(
            scrollX.value,
            [(index - 1) * width, index * width, (index + 1) * width],
            [-width * 0.25, 0, width * 0.25],
            Extrapolation.CLAMP
          ),
        },
        {
          scale: interpolate(
            scrollX.value,
            [(index - 1) * width, index * width, (index + 1) * width],
            [0.9, 1, 0.9],
            Extrapolation.CLAMP
          ),
        },
      ],
    };
  });

  return (
    <Animated.View style={[styles.itemContainer, rnAnimatedStyle]}>
      <Image
        source={item.image}
        style={{ width: 250, height: 400, borderRadius: 20 }}
      />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.title}</Text>

        <Text style={styles.description}>{item.description}</Text>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    marginTop: 50,
    alignItems: "center",
    gap: 20,
    width: width,
  },
  textContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 30,
    width: "100%",
  },
  title: {
    color: "#E94057",
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
  },
  description: {
    textAlign: "center",
    fontSize: 18,
    color: "#00000095",
    marginTop: 8,
  },
});
