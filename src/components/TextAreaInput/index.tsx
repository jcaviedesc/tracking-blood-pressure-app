import React from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TextInputProps,
} from 'react-native';
import { Fonts, Colors } from '../../styles';

type Props = {
  title: string;
  refInput?: React.LegacyRef<TextInput>;
  onSubmitEditing?: TextInputProps['onSubmitEditing'];
};

const TextAreaInput: React.FC<Props> = ({
  title,
  refInput,
  onSubmitEditing,
}) => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>{title}</Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          ref={refInput}
          onSubmitEditing={onSubmitEditing}
          multiline
          style={styles.textArea}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 18,
  },
  title: {
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.size.h5,
    marginBottom: 9,
  },
  inputContainer: {
    backgroundColor: Colors.lightGray,
    height: 76,
    borderRadius: 5,
  },
  textArea: {
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.size.h6,
  },
});

export default TextAreaInput;
