import { View, Text, StyleSheet, Dimensions } from "react-native";
import { ImageSliderType } from "../../data/SliderData";
import Animated, {
  Extrapolation,
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";

type Props = {
  items: ImageSliderType[];
  paginationIndex: number;
  scrollX: SharedValue<number>;
};

const { width } = Dimensions.get("screen");

export default function Pagination({ items, paginationIndex, scrollX }: Props) {
  return (
    <View style={styles.container}>
      {items.map((_, index) => {
        const pgAnimationStyle = useAnimatedStyle(() => {
          const dotWidth = interpolate(
            scrollX.value,
            [(index - 1) * width, index * width, (index + 1) * width],
            [9, 20, 8],
            Extrapolation.CLAMP
          );

          return {
            width: dotWidth,
          };
        });
        return (
          <Animated.View
            key={index}
            style={[
              styles.dot,
              pgAnimationStyle,
              {
                backgroundColor: paginationIndex === index ? "#E94057" : "#aaa",
              },
            ]}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    gap: 4,
  },
  dot: {
    backgroundColor: "#aaa",
    height: 8,
    width: 8,
    marginHorizontal: 2,
    borderRadius: 8,
  },
});
