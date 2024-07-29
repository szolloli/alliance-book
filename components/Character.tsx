import { View, StyleSheet, Image, Text } from 'react-native';
import React from 'react';
import { Colors } from '@/constants/Colors';

type CharacterProps = {
  id: string;
  name: string;
  height: string;
  weight: string;
};

export default function Character({ id, name, height, weight }: CharacterProps) {
  return (
    <View style={styles.container}>
      <Image
        src={`${process.env.EXPO_PUBLIC_CHARACTER_IMAGE_URL}/${id}.jpg`}
        style={styles.image}
      />
      <View style={styles.textInfoContainer}>
        <View style={{ flexDirection: 'column' }}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.description}>
            Height: {height !== 'unknown' ? `${height} cm` : 'N/A'} | Weight:{' '}
            {weight !== 'unknown' ? `${weight} lbs` : 'N/A'}
          </Text>
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
    backgroundColor: Colors.background,
  },
  textInfoContainer: {
    marginLeft: 16,
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    alignSelf: 'flex-start',
    justifyContent: 'space-between',
  },
  image: {
    width: 64,
    height: 64,
    overflow: 'hidden',
    borderRadius: 32,
  },
  name: {
    flexDirection: 'column',
    color: Colors.text,
    fontSize: 20,
  },
  description: {
    color: Colors.subtext,
  },
});
