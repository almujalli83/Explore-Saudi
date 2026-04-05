import React, { useRef, useState, useEffect, useCallback } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Dimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import { Image } from 'expo-image';
import { colors, spacing, borderRadius } from '../../constants/theme';

interface ImageCarouselProps {
  images: string[];
  height?: number;
  showDots?: boolean;
  autoPlay?: boolean;
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const ImageCarousel: React.FC<ImageCarouselProps> = ({
  images,
  height = 240,
  showDots = true,
  autoPlay = false,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const autoPlayTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  const onScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const offsetX = event.nativeEvent.contentOffset.x;
      const index = Math.round(offsetX / SCREEN_WIDTH);
      setActiveIndex(index);
    },
    [],
  );

  useEffect(() => {
    if (autoPlay && images.length > 1) {
      autoPlayTimer.current = setInterval(() => {
        setActiveIndex((prev) => {
          const nextIndex = (prev + 1) % images.length;
          flatListRef.current?.scrollToOffset({
            offset: nextIndex * SCREEN_WIDTH,
            animated: true,
          });
          return nextIndex;
        });
      }, 4000);
    }

    return () => {
      if (autoPlayTimer.current) {
        clearInterval(autoPlayTimer.current);
      }
    };
  }, [autoPlay, images.length]);

  const renderItem = ({ item }: { item: string }) => (
    <View style={[styles.imageContainer, { width: SCREEN_WIDTH, height }]}>
      <Image
        source={{ uri: item }}
        style={styles.image}
        contentFit="cover"
        placeholder={{ blurhash: 'LGF5]+Yk^6#M@-5c,1J5@[or[Q6.' }}
        transition={300}
      />
    </View>
  );

  return (
    <View style={[styles.container, { height }]}>
      <FlatList
        ref={flatListRef}
        data={images}
        renderItem={renderItem}
        keyExtractor={(_, index) => index.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        scrollEventThrottle={16}
        bounces={false}
      />
      {showDots && images.length > 1 && (
        <View style={styles.dotsContainer}>
          {images.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                index === activeIndex ? styles.dotActive : styles.dotInactive,
              ]}
            />
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    overflow: 'hidden',
    borderRadius: borderRadius.lg,
  },
  imageContainer: {
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  dotsContainer: {
    position: 'absolute',
    bottom: spacing.sm + 4,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 3,
  },
  dotActive: {
    backgroundColor: colors.white,
    width: 20,
    borderRadius: 4,
  },
  dotInactive: {
    backgroundColor: 'rgba(255,255,255,0.5)',
  },
});

export default ImageCarousel;
