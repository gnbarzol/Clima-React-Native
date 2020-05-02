import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
} from 'react-native';
import {Picker} from '@react-native-community/picker';

const Formulario = () => {
  const [pais, setPais] = useState('');
  const [ciudad, setCiudad] = useState('');

  return (
    <>
      <View>
        <TextInput
          style={styles.input}
          placeholder="Ciudad"
          placeholderTextColor="#000"
          onChangeText={texto => setCiudad(texto)}
        />
        <Picker
          selectedValue={pais}
          itemStyle={styles.picker}
          onValueChange={(itemValue, itemIndex) => setPais(itemValue)}>
          <Picker.Item label="- Seleccionar -" value="" />
          <Picker.Item label="Ecuador" value="EC" />
          <Picker.Item label="Estados Unidos" value="USA" />
        </Picker>
        <TouchableWithoutFeedback>
          <View style={styles.btnConsultar}>
            <Text style={styles.txtBtn}>Submit</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    padding: 10,
    backgroundColor: '#fff',
    textAlign: 'center',
    fontSize: 20,
    marginVertical: 10, 
  },
  picker: {
    backgroundColor: '#fff',
    height: 110,
  },
  btnConsultar: {
    backgroundColor: '#30475e',
    marginTop: 30,
    padding: 12,
    borderRadius: 10,
  },
  txtBtn: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
  },
});

export default Formulario;
