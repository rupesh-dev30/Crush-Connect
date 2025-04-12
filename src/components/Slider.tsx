import React, { useEffect, useRef, useState } from "react";
import { View, FlatList, ViewToken } from "react-native";
import { ImageSliderType } from "../../data/SliderData";
import SliderItem from "./SliderItem";
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import Pagination from "./Pagination";

type Props = {
  itemList: ImageSliderType[];
};

export default function Slider({ itemList }: Props) {
  const scrollX = useSharedValue(0);
  const [paginationIndex, setPaginationIndex] = useState(0);
  const [data, setData] = useState(itemList);

  const scrollViewRef = useRef<Animated.FlatList<ImageSliderType>>(null);

  const onScrollHandler = useAnimatedScrollHandler({
    onScroll: (e) => {
      scrollX.value = e.contentOffset.x;
    },
  });

  const onViewableItemsChanged = ({
    viewableItems,
  }: {
    viewableItems: ViewToken[];
  }) => {
    if (viewableItems[0]?.index !== undefined && viewableItems[0]?.index !== null) {
      setPaginationIndex(viewableItems[0].index % itemList.length);
    }
  };

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50,
  };

  const viewabilityConfigCallbackPairs = useRef([
    { viewabilityConfig, onViewableItemsChanged },
  ]);

  // Auto-scroll logic
  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (paginationIndex + 1) % itemList.length; // Loop back after last item
      scrollViewRef.current?.scrollToIndex({
        index: nextIndex,
        animated: true,
      });
      setPaginationIndex(nextIndex);
    }, 3000); // Change every 3 seconds

    return () => clearInterval(interval); // Clean up the interval on unmount
  }, [paginationIndex, itemList.length]);

  return (
    <View>
      <Animated.FlatList
        ref={scrollViewRef}
        data={data}
        renderItem={({ item, index }) => (
          <SliderItem item={item} index={index} scrollX={scrollX} />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        onScroll={onScrollHandler}
        scrollEventThrottle={16}
        keyExtractor={(item, index) => index.toString()}
        viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
        onEndReached={() => setData([...data, ...itemList])}
        onEndReachedThreshold={0.5}
      />

      <Pagination
        items={itemList}
        scrollX={scrollX}
        paginationIndex={paginationIndex}
      />
    </View>
  );
}
