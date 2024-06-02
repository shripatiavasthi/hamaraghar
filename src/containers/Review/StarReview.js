// StarReview.js
import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const StarReview = ({ maxStars = 5, starSize = 30, starColor = 'gold', onRatingChange }) => {
  const [rating, setRating] = useState(0);

  const handleStarPress = (index) => {
    setRating(index);
    if (onRatingChange) {
      onRatingChange(index);
    }
  };

  return (
    <View style={styles.container}>
      {Array.from({ length: maxStars }, (_, index) => (
        <TouchableOpacity key={index} onPress={() => handleStarPress(index + 1)}>
          <Icon
            name={index < rating ? 'star' : 'star-o'}
            size={starSize}
            color={starColor}
            style={styles.star}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  star: {
    marginHorizontal: 5,
  },
});

export default StarReview;
