import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from 'react-native';
import Formulario from './components/Formulario';
import Clima from './components/Clima';
import axios from 'axios';

const App = () => {
  const [busqueda, setBusqueda] = useState({
    ciudad: '',
    pais: '',
  });

  const [consultar, setConsultar] = useState(false);
  const [dataConsulta, setDataConsulta] = useState({});
  const [bgColor, setbgColor] = useState('rgb(71, 149, 212)');

  useEffect(() => {
    if (consultar) {
      const consultarApi = async () => {
        const apiKey = '87ea63fa5673e33840d9e897d4611344';
        const urlAPI = `http://api.openweathermap.org/data/2.5/weather?q=${
          busqueda.ciudad
        },${busqueda.pais}&appid=${apiKey}`;
        try {
          const response = await axios.get(urlAPI);
          setDataConsulta(response.data);

          //Modifica el color de fondo
          const kelvin = 273.15;
          const {main} = response.data;
          const tempActual = parseInt(main.temp - kelvin);
          if (tempActual < 10) {
            setbgColor('rgb(105, 108, 149)');
          } else if (tempActual >= 10 && tempActual < 25) {
            setbgColor('rgb(71, 149, 212)');
          } else {
            setbgColor('rgb(178, 28, 61)');
          }
        } catch (error) {
          console.log(error);
          mostrarAlerta();
        }
      };
      consultarApi();
      setConsultar(false);
    }
  }, [consultar]);

  const mostrarAlerta = () => {
    Alert.alert('Error', 'No hay resultado para la ciudad y país escogido', [
      {text: 'Ok'},
    ]);
  };

  const cerrarTeclado = () => {
    Keyboard.dismiss();
  };

  const bgColorApp = {
    backgroundColor: bgColor,
  };

  return (
    <TouchableWithoutFeedback onPress={() => cerrarTeclado()}>
      <View style={[styles.contenedor, bgColorApp]}>
        <View style={{marginHorizontal: '2%'}}>
          <Clima data={dataConsulta} />
          <Formulario
            busqueda={busqueda}
            setBusqueda={setBusqueda}
            setConsultar={setConsultar}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    justifyContent: 'center',
    flex: 1,
  },
  calido: {
    backgroundColor: 'blue',
  },
  caliente: {
    backgroundColor: 'red',
  },
});

export default App;
