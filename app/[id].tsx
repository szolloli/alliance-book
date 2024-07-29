import { Colors } from '@/constants/Colors';
import useSwapiCharacter from '@/hooks/swapi/useSwapiCharacter';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Text, StyleSheet, View, ActivityIndicator } from 'react-native';
import Animated, { FadeIn, FadeInDown, FadeInRight, FadeOutLeft } from 'react-native-reanimated';

const CharacterDetailScreen = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data, isLoading } = useSwapiCharacter(id!);

  if (isLoading) {
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator />
      </View>
    );
  }

  if (!data) {
    return (
      <View style={[styles.container, styles.center]}>
        <Text>No data</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.background}>
        <Animated.Image
          source={{
            uri: `${process.env.EXPO_PUBLIC_CHARACTER_IMAGE_URL}/${id}.jpg`,
          }}
          entering={FadeIn.duration(1000)}
          style={styles.image}
          resizeMode="cover"
        />
        <LinearGradient
          colors={['transparent', Colors.background]}
          locations={[0.3, 1]}
          style={styles.gradientOverlay}
        />
      </View>
      {/* Name */}
      <View style={styles.nameContainer}>
        <Animated.Text
          entering={FadeInRight.duration(1000)}
          exiting={FadeOutLeft}
          style={styles.name}>
          {data?.name}
        </Animated.Text>
        <View style={styles.horizontalDivider} />
      </View>
      {/* Details card */}
      <View style={styles.detailsContainer}>
        <LinearGradient
          colors={[Colors.detailsCardGradient1, Colors.detailsCardGradient2]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.detailsContainerGradient}>
          <View style={styles.details}>
            {/* Left column */}
            <View style={styles.detailRow}>
              <Animated.View entering={FadeInDown.duration(1000)} style={styles.detail}>
                <Text style={[styles.label, styles.text]}>Height:</Text>
                <Text style={styles.text}> {data.height} cm</Text>
              </Animated.View>
              <Animated.View entering={FadeInDown.duration(1000).delay(100)} style={styles.detail}>
                <Text style={[styles.label, styles.text]}>Mass:</Text>
                <Text style={styles.text}> {data.mass} kg</Text>
              </Animated.View>
              <Animated.View entering={FadeInDown.duration(1000).delay(200)} style={styles.detail}>
                <Text style={[styles.label, styles.text]}>Hair:</Text>
                <Text style={styles.text}> {data.hair_color}</Text>
              </Animated.View>
              <Animated.View entering={FadeInDown.duration(1000).delay(300)} style={styles.detail}>
                <Text style={[styles.label, styles.text]}>Skin:</Text>
                <Text style={styles.text}> {data.skin_color}</Text>
              </Animated.View>
            </View>
            <View style={styles.verticalDivider} />
            {/* Right column */}
            <View style={styles.detailRow}>
              <Animated.View entering={FadeInDown.duration(1000).delay(400)} style={styles.detail}>
                <Text style={[styles.label, styles.text]}>Eyes:</Text>
                <Text style={styles.text}> {data.eye_color}</Text>
              </Animated.View>
              <Animated.View entering={FadeInDown.duration(1000).delay(500)} style={styles.detail}>
                <Text style={[styles.label, styles.text]}>Born:</Text>
                <Text style={styles.text}> {data.birth_year}</Text>
              </Animated.View>
              <Animated.View entering={FadeInDown.duration(1000).delay(600)} style={styles.detail}>
                <Text style={[styles.label, styles.text]}>Gender:</Text>
                <Text style={styles.text}> {data.gender}</Text>
              </Animated.View>
            </View>
          </View>
        </LinearGradient>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: Colors.background,
    alignItems: 'center',
  },
  center: {
    justifyContent: 'center',
  },
  background: {
    position: 'absolute',
  },
  gradientOverlay: {
    height: '100%',
    width: '100%',
    position: 'absolute',
  },
  image: {
    aspectRatio: 8 / 11,
    width: '100%',
    height: undefined,
    resizeMode: 'contain',
  },
  horizontalDivider: {
    width: '100%',
    height: 1,
    backgroundColor: Colors.subtext,
  },
  detailsContainer: {
    margin: 32,
    shadowColor: Colors.background,
    shadowOffset: { width: 4, height: 16 },
    shadowOpacity: 0.5,
    shadowRadius: 24,
  },
  detailsContainerGradient: {
    padding: 20,
    borderRadius: 16,
  },
  detailRow: {
    flex: 1,
    flexDirection: 'column',
    gap: 8,
  },
  verticalDivider: {
    width: 1,
    height: '100%',
    backgroundColor: Colors.subtext,
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
    alignItems: 'flex-start',
    width: '100%',
  },
  nameContainer: {
    marginTop: 340,
    width: '100%',
    paddingHorizontal: 20,
  },
  name: {
    alignSelf: 'flex-start',
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 10,
    color: Colors.text,
  },
  detail: {
    fontSize: 16,
    marginBottom: 5,
    color: Colors.text,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    color: Colors.text,
    fontSize: 16,
  },
  label: {
    fontWeight: 'bold',
  },
});

export default CharacterDetailScreen;
