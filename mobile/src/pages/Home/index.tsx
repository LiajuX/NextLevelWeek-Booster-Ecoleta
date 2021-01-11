import React, { useState } from 'react';
import { 
  View, 
  ImageBackground, 
  Image, 
  Text, 
  StyleSheet, 
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { Feather as Icon } from '@expo/vector-icons';

const Home = () => {
  const [uf, setUf] = useState('');
  const [city, setCity] =useState('');

  const navigation = useNavigation();

  function handleNavigateToPoints() {
    navigation.navigate('Points', {
      uf,
      city
    });
  }

  return ( 
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ImageBackground 
        source={require('../../assets/home-background.png')} 
        style={styles.container}
        imageStyle={{ width: 274, height: 368 }}
      > 
        <View style={styles.main}>
          <Image source={require('../../assets/logo.png')} />
          
          <View>
            <Text style={styles.title}>Seu marketplace de coleta de resíduos</Text>
            <Text style={styles.description}>Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente.</Text>
          </View>
        </View>

        <View style={styles.footer}>
          <TextInput 
            style={styles.input}
            placeholder="Digite a UF"
            value={uf}
            onChangeText={setUf}
            maxLength={2}
            autoCapitalize="characters"
            autoCorrect={false}
          />

          <TextInput 
            style={styles.input}
            placeholder="Digite a cidade"
            value={city}
            onChangeText={setCity}
            autoCorrect={false}
          />

          <RectButton style={styles.button} onPress={handleNavigateToPoints}>
            <View style={styles.buttonIcon}>
              <Text>
                <Icon name="arrow-right" color="#FFF" size={24} />
              </Text>
            </View>

            <Text style={styles.buttonText}>
              Entrar
            </Text>
          </RectButton>
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
  },

  main: {
    flex: 1,
    justifyContent: 'center',
  },

  title: {
    maxWidth: 260,
    marginTop: 64,

    color: '#322153',
    
    fontSize: 32,
    fontFamily: 'Ubuntu_700Bold',
  },

  description: {
    maxWidth: 260,

    marginTop: 16,
    
    color: '#6C6C80',
    
    fontSize: 16,
    fontFamily: 'Roboto_400Regular',
    lineHeight: 24,
  },

  footer: {},

  select: {},

  input: {
    height: 60,
    
    marginBottom: 8,
    paddingHorizontal: 24,
    borderRadius: 10,
    
    backgroundColor: '#FFF',

    fontSize: 16,
  },

  button: {
    flexDirection: 'row',
    alignItems: 'center',
    
    height: 60,
    
    marginTop: 24,
    borderRadius: 10,
    
    backgroundColor: '#34CB79',
    
    overflow: 'hidden',
  },

  buttonIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    
    height: 60,
    width: 60,
    
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },

  buttonText: {
    flex: 1,
    justifyContent: 'center',

    color: '#FFF',
    
    textAlign: 'center',
    fontSize: 16,
    fontFamily: 'Roboto_500Medium',
  }
});

export default Home;