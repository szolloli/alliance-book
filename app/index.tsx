import {
  Text,
  View,
  Dimensions,
  RefreshControl,
  ActivityIndicator,
  Pressable,
  Modal,
  TextInput,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
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
import { Ionicons } from '@expo/vector-icons';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

export default function HomeScreen() {
  const width = Dimensions.get('screen').width;
  const navigation = useNavigation();
  const [modalOpen, setModalOpen] = useState(false);
  const [searchText, setSearchText] = useState('');
  const filterOptionsRef = useRef({
    male: false,
    female: false,
  });
  const [filters, setFilters] = useState({
    searchText: '',
    male: false,
    female: false,
  });

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
  }, [darknessAnimatedStyle, sunAnimatedStyle, navigation]);

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
    return (
      <View style={styles.container}>
        <Text style={styles.text}>No data</Text>;
      </View>
    );
  }

  // Filter data
  const filteredData = data
    .filter((item) => {
      return (
        filters.searchText.length === 0 ||
        item.name.toLowerCase().includes(filters.searchText.toLowerCase())
      );
    })
    .filter((item) => {
      // If male and female are both selected, show all with gender n/a
      if (filters.male && filters.female) {
        return item.gender === 'n/a';
      }
      if (filters.male) {
        return item.gender === 'male';
      }
      if (filters.female) {
        return item.gender === 'female';
      }
      return true;
    });

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
        data={filteredData}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => {
          const id = extractIdFromUrl(item.url);
          return (
            <TouchableOpacity onPress={() => router.push(id)}>
              <Character
                id={id}
                name={item.name}
                height={item.height.toString()}
                weight={item.mass.toString()}
              />
            </TouchableOpacity>
          );
        }}
        ListEmptyComponent={() => <Text style={styles.emptyText}>No items</Text>}
      />
      {/* FLoating filter button */}
      <Pressable style={styles.floatingButton} onPress={() => setModalOpen(true)}>
        <Ionicons name="filter" size={32} color={Colors.text} />
      </Pressable>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalOpen}
        style={styles.modalContent}
        onRequestClose={() => {
          setModalOpen(false);
        }}>
        <TouchableOpacity
          style={styles.modalBackdrop}
          onPress={() => setModalOpen(false)}></TouchableOpacity>
        <View style={styles.modalContent}>
          <Text style={styles.filterTitle}>Filter</Text>
          <TextInput
            style={styles.searchBar}
            value={searchText}
            placeholder="Search by name..."
            placeholderTextColor={Colors.background}
            onChangeText={setSearchText}
          />
          <View style={styles.checkboxContainer}>
            <BouncyCheckbox
              isChecked={filters.male || filterOptionsRef.current.male}
              textStyle={{ color: Colors.text, textDecorationLine: 'none' }}
              text={'Male'}
              onPress={() => (filterOptionsRef.current.male = !filters.male)}
            />
            <BouncyCheckbox
              isChecked={filters.female || filterOptionsRef.current.female}
              textStyle={styles.checkboxLabel}
              text={'Female'}
              onPress={() => (filterOptionsRef.current.female = !filters.female)}
            />
          </View>
          <TouchableOpacity
            style={styles.applyButton}
            onPress={() => {
              setFilters({
                searchText: searchText,
                male: filterOptionsRef.current.male,
                female: filterOptionsRef.current.female,
              });
              setModalOpen(false);
            }}>
            <Text style={styles.applyButtonText}>Apply</Text>
          </TouchableOpacity>
        </View>
      </Modal>
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
  floatingButton: {
    backgroundColor: Colors.subtext,
    width: 64,
    height: 64,
    borderRadius: 32,
    position: 'absolute',
    bottom: 32,
    right: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    height: '35%',
    marginTop: 'auto',
    backgroundColor: Colors.detailsCardGradient1,
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
    padding: 24,
  },
  modalBackdrop: {
    flex: 1,
  },
  filterTitle: {
    color: Colors.text,
    fontSize: 24,
    fontWeight: 'bold',
  },
  searchBar: {
    width: '100%',
    height: 40,
    color: Colors.background,
    fontSize: 16,
    borderWidth: 1,
    borderRadius: 20,
    backgroundColor: Colors.text,
    paddingHorizontal: 10,
    marginTop: 20,
    marginBottom: 20,
  },
  checkboxContainer: {
    gap: 16,
    width: '100%',
  },
  checkboxLabel: {
    color: Colors.text,
    textDecorationLine: 'none',
  },
  applyButton: {
    position: 'absolute',
    bottom: 32,
    right: 32,
    alignItems: 'center',
    marginTop: 20,
    backgroundColor: Colors.subtext,
    padding: 10,
    borderRadius: 20,
  },
  applyButtonText: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 16,
  },
  emptyText: {
    color: Colors.text,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
