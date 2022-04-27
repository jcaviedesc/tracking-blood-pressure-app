import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Platform,
  Image,
} from 'react-native';
// TODO import according to i18n
import 'dayjs/locale/es-mx';
import dayjs from 'dayjs';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import DateTimePicker from '@react-native-community/datetimepicker';
import type { RootStackParamList } from '../../router/types';
import { useI18nLocate } from '../../providers/LocalizationProvider';
import { Button, Input } from '../../components';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { selectUser, updateUserField } from '../../store/singup/singupSlice';
import { AppStyles, Fonts, Colors, Images } from '../../styles';
import { birthdateSchema } from './schemaValidators/singup';

type Props = NativeStackScreenProps<RootStackParamList, 'Singup/Birthdate'>;

const BirthdateScreen: React.FC<Props> = ({ navigation }) => {
  const { translate } = useI18nLocate();
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const { birthdate, address } = user;
  const [date, setDate] = useState(new Date(1598051730000));
  const [show, setShow] = useState(false);
  const [inputErrors, setInputErrors] = useState('');

  const dispatchAction = (userField: string, value: string) => {
    dispatch(updateUserField({ field: userField, value }));
  };
  const nextStepHandler = () => {
    const { error } = birthdateSchema.validate(birthdate);
    if (error) {
      setInputErrors(translate('validation.required'));
    } else {
      setInputErrors('');
      navigation.navigate('Singup/BodyInfo');
    }
  };

  const onChange = (event: Event, selectedDate: Date | undefined): void => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
    dispatchAction('birthdate', dayjs(currentDate).format('YYYY-MM-DD'));
  };

  const showDatepicker = () => {
    setShow(true);
  };

  return (
    <View style={styles.mainContainer}>
      <ScrollView style={styles.mainContainer}>
        <View style={styles.titleContainer}>
          <Image source={Images.birthdateLocation} style={styles.image} />
        </View>
        <View style={styles.section}>
          <Input
            title={translate('birthdate_screen.address')}
            value={address}
            onChangeText={text => {
              dispatchAction('address', text);
            }}
            hint={translate('birthdate_screen.address_hint')}
          />
        </View>
        <View style={styles.section}>
          <Text style={styles.birthdateText}>
            {translate('birthdate_screen.birthdate')}
          </Text>
          <View>
            <TouchableHighlight
              underlayColor={Colors.background}
              style={[
                styles.touchableBirthdate,
                {
                  borderColor:
                    inputErrors !== '' ? Colors.error : Colors.lightGray,
                },
              ]}
              onPress={showDatepicker}>
              <Text style={styles.touchableText}>
                {birthdate
                  ? dayjs(date).locale('es-mx').format('DD - MMMM -  YYYY')
                  : '_ _ - _ _ - _ _'}
              </Text>
            </TouchableHighlight>
          </View>
          {inputErrors !== '' && <Text style={styles.hint}>{inputErrors}</Text>}
        </View>
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode="date"
            is24Hour={true}
            display="spinner"
            onChange={onChange}
          />
        )}
      </ScrollView>
      <View style={styles.section}>
        <Button title={translate('button.next')} onPress={nextStepHandler} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  ...AppStyles.screen,
  titleContainer: {
    flex: 11,
    alignItems: 'center',
  },
  birthdateText: {
    marginLeft: 3,
    fontFamily: Fonts.type.light,
    fontSize: Fonts.size.h5,
    color: Colors.paragraph,
  },
  touchableBirthdate: {
    marginTop: 9,
    backgroundColor: Colors.lightGray,
    borderRadius: 5,
    borderWidth: 1,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 6,
  },
  touchableText: {
    color: Colors.headline,
    fontFamily: Fonts.type.bold,
    fontSize: 18,
  },
  image: {
    width: 280,
    height: 308,
    resizeMode: 'contain',
  },
  hint: {
    fontFamily: Fonts.type.light,
    fontSize: Fonts.size.hint,
  },
});

export default BirthdateScreen;
