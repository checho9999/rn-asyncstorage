import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, Button, TouchableHighlight } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

const App = () => {

  //Definimos el state del texto ingresado por el usuario  
  const [ inputTexto, guardarInputTexto ] = useState('');
  //Definimos el state para poder guardar lo obtenido desde el AsyncStorage.get
  const [ nombreStorage, guardarNombreStorage ] = useState('');

  useEffect(() => { 
    ObtenerDatosStorage()
  }, [])

  //Guardamos el input del usuario en el storage con AsyncStorage.setItem
  const guardarDatosStorage = async () => {
    //console.log('Guardando datos...: ', inputTexto)
    try {
      await AsyncStorage.setItem('nombre', inputTexto);
      guardarNombreStorage(inputTexto); //Actualizamos y mostramos en tiempo real el input recien ingresado
    }
    catch(error) {
      console.log(error);
    }
  }
  
  //Obtenemos los datos guardados con AsyncStorage.getItem
  const ObtenerDatosStorage = async () => {    
    try {
      const nombre = await AsyncStorage.getItem('nombre');
      guardarNombreStorage(nombre); //Mostramos el input guardado previamente en el storage
      //console.log('Datos AsyncStorage: ', nombre)
    }
    catch(error) {
      console.log(error);
    }
  }

  //Eliminamos los datos guardados con AsyncStorage.removeItem
  const  eliminarDatosStorage = async () => {    
    try {
      const nombre = await AsyncStorage.removeItem('nombre');
      guardarNombreStorage(''); //Actualizamos y dejamos de mostrar en tiempo real el input guardado previamente en el storage y el boton de eliminar
      //console.log('Datos AsyncStorage: ', nombre)
    }
    catch(error) {
      console.log(error);
    }
  }
  
  return (
    <>
      <View style={styles.contenedor}>
        { nombreStorage ? <Text>Hola: {nombreStorage}</Text> : null }

        <TextInput style={styles.input} 
          placeholder='Escribe tu nombre'
          onChangeText={ texto => guardarInputTexto(texto) }
        />

        <Button
          title='Guardar'
          color='#333'
          onPress={ () => guardarDatosStorage() }
        />

        { nombreStorage ? 
          <TouchableHighlight style={styles.btnEliminar}
            onPress={ () => eliminarDatosStorage() }
          >  
            <Text style={styles.textoEliminar}>Eliminar Nombre &times;</Text>  
          </TouchableHighlight>
          : null
        }

      </View>
    </>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center'
  },
  input: {
    borderColor: '#666',
    borderBottomWidth: 1,
    width: 300,
    height: 40 
  },
  btnEliminar: {
    backgroundColor: 'red',
    marginTop: 20,
    padding: 10
  },
  textoEliminar: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    textTransform: 'uppercase',
    width: 300
  }
});

export default App;
