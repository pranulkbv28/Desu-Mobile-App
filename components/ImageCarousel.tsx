import { FlatList, Image, StyleSheet, View, Dimensions } from "react-native";
import React, { useEffect, useState, useRef } from "react";
import Image1 from "@/assets/images/petHealthyFood.png";
import Image2 from "@/assets/images/petHealthyFood2.jpg";
import Image3 from "@/assets/images/petHealthyFood3.jpg";
import Image4 from "@/assets/images/petHealthyFood4.jpg";
import { Colors } from "@/constants/Colors";

const ImageCarousel = () => {
  const images = [Image1, Image2, Image3, Image4];
  const screenWidth = Dimensions.get("window").width;
  const flatListRef = useRef<FlatList>(null);

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = activeIndex === images.length - 1 ? 0 : activeIndex + 1;
      flatListRef.current?.scrollToIndex({
        index: nextIndex,
        animated: true,
      });
      setActiveIndex(nextIndex);
    }, 2000);

    return () => clearInterval(interval);
  }, [activeIndex, images.length]);

  const getItemLayout = (_: any, index: number) => ({
    length: screenWidth,
    offset: screenWidth * index,
    index,
  });

  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.imageContainer}>
      <Image source={item} style={styles.image} />
    </View>
  );

  const handleScroll = (event: any) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(scrollPosition / screenWidth);
    setActiveIndex(currentIndex);
  };

  const renderDots = () =>
    images.map((_, index) => (
      <View
        key={index}
        style={[
          styles.dot,
          activeIndex === index ? styles.activeDot : styles.inactiveDot,
        ]}
      />
    ));

  return (
    <View
      style={{
        position: "absolute",
        marginBottom: -60,
        bottom: 0,
        left: "5%",
      }}
    >
      <FlatList
        data={images}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        snapToInterval={screenWidth}
        decelerationRate="fast"
        showsHorizontalScrollIndicator={false}
        keyExtractor={(_, index) => index.toString()}
        onScroll={handleScroll}
        ref={flatListRef}
        getItemLayout={getItemLayout}
        scrollEventThrottle={16}
        style={{ borderRadius: 20 }}
      />
      <View style={styles.dotsContainer}>{renderDots()}</View>
    </View>
  );
};

export default ImageCarousel;

const styles = StyleSheet.create({
  imageContainer: {
    width: Dimensions.get("window").width,
    alignItems: "center",
  },
  image: {
    height: 200,
    width: "100%",
    resizeMode: "cover",
  },
  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 16,
    position: "absolute",
    bottom: -25,
    left: "40%",
    // backgroundColor: "red",
    zIndex: 100,
    elevation: 100,
  },
  dot: {
    height: 10,
    width: 10,
    borderRadius: 5,
    marginHorizontal: 6,
  },
  activeDot: {
    backgroundColor: Colors.appGreen,
  },
  inactiveDot: {
    backgroundColor: "#a6a6a6",
  },
});
