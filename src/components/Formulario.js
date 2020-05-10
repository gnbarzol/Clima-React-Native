import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  Animated,
  Alert,
} from 'react-native';
import {Picker} from '@react-native-community/picker';

const Formulario = ({busqueda, setBusqueda, setConsultar}) => {
  const {ciudad, pais} = busqueda;

  const [animacionBoton] = useState(new Animated.Value(1));

  const inAnimacion = () => {
    Animated.spring(animacionBoton, {
      toValue: 0.9,
      useNativeDriver: true,
    }).start();
  };

  const outAnimacion = () => {
    Animated.spring(animacionBoton, {
      toValue: 1,
      useNativeDriver: true,
      //friction: 1 Para controlar el rebote, mientras mas alto menos rebote
      //tension: 30 Mas alto mas tensa es la animacion.
    }).start();
  };

  const animarScala = {
    transform: [{scale: animacionBoton}],
  };

  const consultarClima = () => {
    if (ciudad.trim() === '' || pais.trim() === '') {
      mostrarAlerta();
      return;
    }
    setConsultar(true);
  };

  const mostrarAlerta = () => {
    Alert.alert('Error', 'Agregue una ciudad y país para la búsqueda',
      [{text: 'Entendido'}]
    );
  };

  return (
    <>
      <View>
        <TextInput
          style={styles.input}
          placeholder="Ciudad"
          placeholderTextColor="#000"
          onChangeText={ciudad => setBusqueda({...busqueda, ciudad})}
        />
        <Picker
          selectedValue={pais}
          itemStyle={styles.picker}
          onValueChange={(pais, itemIndex) => setBusqueda({...busqueda, pais})}>
          <Picker.Item label="- Seleccionar -" value="" />
          <Picker.Item label="Ecuador" value="EC" />
          <Picker.Item label="Estados Unidos" value="US" />
        </Picker>
        <TouchableWithoutFeedback
          onPressIn={() => inAnimacion()}
          onPressOut={() => outAnimacion()}
          onPress={() => consultarClima()}>
          <Animated.View style={[styles.btnConsultar, animarScala]}>
            <Text style={styles.txtBtn}>Buscar clima</Text>
          </Animated.View>
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
    backgroundColor: '#1b1b2f',
    marginTop: 30,
    padding: 12,
    borderRadius: 10,
  },
  txtBtn: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
});

export default Formulario;
