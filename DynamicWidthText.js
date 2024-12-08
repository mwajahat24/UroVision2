import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';

const DynamicWidthText = ({ text, style }) => {
  const [textWidth, setTextWidth] = useState(0);

  useEffect(() => {
    const calculatedWidth = text.length * 10; // Approximate width calculation
    setTextWidth(calculatedWidth + 30); // Add 20 units for padding
  }, [text]);

  return (
    <View style={{ width: textWidth }}>
      <Text style={style}>{text}</Text>
    </View>
  );
};

export default DynamicWidthText;
