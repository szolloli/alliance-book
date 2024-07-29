import { Text, View, Dimensions, RefreshControl, ActivityIndicator } from 'react-native';
import React, { useEffect } from 'react';
import Character from '@/components/Character';
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useDerivedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { router, useNavigation } from 'expo-router';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { useInfiniteSwapiCharacters } from '@/hooks/swapi/useSwapiCharacters';
import { LinearGradient } from 'expo-linear-gradient';
import { extractIdFromUrl } from '@/utils/utils';
import { Colors } from '@/constants/Colors';

export default function HomeScreen() {
  const width = Dimensions.get('screen').width;
  const navigation = useNavigation();

  // Setup scroll animation
  const scrollY = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y;
  });

  // Horizontal position of the sun
  const sunPositionX = useDerivedValue(() => {
    return (scrollY.value % width) - width / 2 - 16;
  }, [scrollY]);

  // Horizontal position of the sun
  const sunPositionY = useDerivedValue(() => {
    return -Math.sin((Math.PI * (scrollY.value % width)) / width) * 50;
  }, [scrollY]);

  // Darkness of the background
  const opacity = useDerivedValue(() => {
    return 1 - Math.sin((Math.PI * ((scrollY.value % width) + 0.5 * Math.PI)) / width);
  }, [scrollY]);

  const sunAnimatedStyle = useAnimatedStyle(() => {
    return {
      left: sunPositionX.value,
      top: sunPositionY.value,
    };
  });

  const darknessAnimatedStyle = useAnimatedStyle(() => {
    return {
      width: '100%',
      height: '100%',
      backgroundColor: Colors.background,
      opacity: opacity.value,
    };
  });

  // Setup custom animated header
  useEffect(() => {
    navigation.setOptions({
      headerBackground: () => (
        <LinearGradient
          colors={[Colors.background, Colors.skyGradient1, Colors.skyGradient2]}
          locations={[0, 0.9, 1]}
          start={{ x: 0, y: 1 }}
          end={{ x: 0, y: 0 }}>
          <Animated.View style={darknessAnimatedStyle} />
        </LinearGradient>
      ),
      headerTitle: () => (
        <Animated.View style={sunAnimatedStyle}>
          <View style={styles.sun1} />
          <View style={styles.sun2} />
        </Animated.View>
      ),
    });
  }, []);

  const { data: infiniteData, isLoading, fetchNextPage, refetch } = useInfiniteSwapiCharacters();
  const data = infiniteData?.pages.map((page) => page.results.flat()).flat();

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={Colors.text} />
      </View>
    );
  }

  if (!data) {
    return;
  }
  if (!data) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>No data</Text>;
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Animated.FlatList
        refreshControl={
          <RefreshControl
            refreshing={data && isLoading}
            colors={[Colors.text]}
            tintColor={Colors.text}
          />
        }
        refreshing={data && isLoading}
        onRefresh={() => {
          refetch();
        }}
        onEndReached={() => fetchNextPage()}
        onScroll={scrollHandler}
        data={data}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => {
          const id = extractIdFromUrl(item.url);
          return (
            <TouchableOpacity onPress={() => router.push(id)}>
              <Character id={id} name={item.name} height={item.height} weight={item.mass} />
            </TouchableOpacity>
          );
        }}
        ListEmptyComponent={() => <View>No items</View>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    justifyContent: 'center',
  },
  sun1: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.planet1,
  },
  sun2: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.planet2,
    marginTop: 16,
    marginLeft: 16,
  },
  text: {
    color: Colors.text,
  },
});
