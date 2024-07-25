import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import Animated, { FadeIn, FadeInDown, FadeInRight, FadeOutLeft } from 'react-native-reanimated';

// TODO: Replace with actual data
const character = {
  name: 'Luke Skywalker',
  height: 172,
  mass: 77,
  hair_color: 'blond',
  skin_color: 'fair',
  eye_color: 'blue',
  birth_year: '19BBY',
  gender: 'male',
};

const CharacterDetailScreen = () => {
  const { id } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <View style={styles.background}>
        <Animated.Image
          source={{
            // TODO: Replace with .env base url value
            uri: `https://starwars-visualguide.com/assets/img/characters/${id}.jpg`,
          }}
          entering={FadeIn.duration(1000)}
          style={styles.image}
          resizeMode="cover"
        />
        <LinearGradient
          colors={['transparent', '#1f2226']}
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
          {character.name}
        </Animated.Text>
        <View style={styles.horizontalDivider} />
      </View>
      {/* Details card */}
      <View style={styles.detailsContainer}>
        <LinearGradient
          colors={['#32373e', '#15181c']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.detailsContainerGradient}>
          <View style={styles.details}>
            {/* Left column */}
            <View style={styles.detailRow}>
              <Animated.View entering={FadeInDown.duration(1000)} style={styles.detail}>
                <Text style={[styles.label, styles.text]}>Height:</Text>
                <Text style={styles.text}> {character.height} cm</Text>
              </Animated.View>
              <Animated.View entering={FadeInDown.duration(1000).delay(100)} style={styles.detail}>
                <Text style={[styles.label, styles.text]}>Mass:</Text>
                <Text style={styles.text}> {character.mass} kg</Text>
              </Animated.View>
              <Animated.View entering={FadeInDown.duration(1000).delay(200)} style={styles.detail}>
                <Text style={[styles.label, styles.text]}>Hair Color:</Text>
                <Text style={styles.text}> {character.hair_color}</Text>
              </Animated.View>
              <Animated.View entering={FadeInDown.duration(1000).delay(300)} style={styles.detail}>
                <Text style={[styles.label, styles.text]}>Skin Color:</Text>
                <Text style={styles.text}> {character.skin_color}</Text>
              </Animated.View>
            </View>
            {/* Right column */}
            <View style={styles.detailRow}>
              <Animated.View entering={FadeInDown.duration(1000).delay(400)} style={styles.detail}>
                <Text style={[styles.label, styles.text]}>Eye Color:</Text>
                <Text style={styles.text}> {character.eye_color}</Text>
              </Animated.View>
              <Animated.View entering={FadeInDown.duration(1000).delay(500)} style={styles.detail}>
                <Text style={[styles.label, styles.text]}>Birth Year:</Text>
                <Text style={styles.text}> {character.birth_year}</Text>
              </Animated.View>
              <Animated.View entering={FadeInDown.duration(1000).delay(600)} style={styles.detail}>
                <Text style={[styles.label, styles.text]}>Gender:</Text>
                <Text style={styles.text}> {character.gender}</Text>
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
    backgroundColor: '#1f2226',
    justifyContent: 'flex-start',
    alignItems: 'center',
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
    backgroundColor: 'gray',
  },
  detailsContainer: {
    margin: 32,
    shadowColor: 'black',
    shadowOffset: { width: 4, height: 16 },
    shadowOpacity: 0.5,
    shadowRadius: 24,
  },
  detailsContainerGradient: {
    padding: 20,
    borderRadius: 16,
  },
  detailRow: {
    flexDirection: 'column',
    gap: 8,
  },
  details: {
    color: 'red',
    flexDirection: 'row',
    justifyContent: 'space-between',
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
    color: '#fff',
  },
  detail: {
    fontSize: 16,
    marginBottom: 5,
    color: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    color: 'white',
    fontSize: 16,
  },
  label: {
    fontWeight: 'bold',
  },
});

export default CharacterDetailScreen;
