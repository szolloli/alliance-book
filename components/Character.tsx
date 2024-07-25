import { View, StyleSheet, Image } from 'react-native';
import React from 'react';
import { ThemedText } from './ThemedText';

type CharacterProps = {
  id: number;
  name: string;
  height: number;
  weight: number;
};

export default function Character({ id, name, height, weight }: CharacterProps) {
  return (
    <View style={styles.container}>
      <Image
        // TODO: Replace with .env base url value
        src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`}
        style={styles.image}
      />
      <View
        style={{
          marginHorizontal: 10,
          flexDirection: 'row',
          flex: 1,
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <View style={{ flexDirection: 'column' }}>
          <ThemedText type="defaultSemiBold">{name}</ThemedText>
          <ThemedText style={styles.description}>
            Height: {height} cm | Weight: {weight} lbs
          </ThemedText>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
  },
  image: {
    width: 64,
    height: 64,
    overflow: 'hidden',
    borderRadius: 32,
  },
  name: {
    flexDirection: 'column',
  },
  description: {
    color: 'gray',
  },
});
