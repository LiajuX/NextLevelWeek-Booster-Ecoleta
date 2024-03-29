import React, { useState, useEffect } from 'react';
import { 
  View, 
  StyleSheet,
  TouchableOpacity, 
  Image, 
  Text, 
  SafeAreaView,
  Linking,
} from 'react-native';
import { RectButton } from  'react-native-gesture-handler';
import { useNavigation, useRoute } from '@react-navigation/native'
import { Feather as Icon, FontAwesome } from '@expo/vector-icons';
import * as MailComposer from 'expo-mail-composer';

import api from '../../services/api';

interface Params {
  point_id: number;
}

interface Data {
  point: {
    image: string;
    image_url: string;
    name: string;
    email: string;
    whatsapp: string;
    city: string;
    uf: string;
  };
  items: Array<{
    title: string;
  }>;
}

const Detail = () => {
  const [data, setData] = useState<Data>({} as Data);

  const navigation = useNavigation();

  const route = useRoute()
  const params = route.params as Params;

  useEffect(() => {
    api.get(`points/${params.point_id}`).then(response => {
      setData(response.data);
    });
  }, []);

  function handleNavigateBack() {
    navigation.goBack();
  }

  function handleComposeMail() {
    MailComposer.composeAsync({
      subject: 'Interesse na coleta de resíduos',
      recipients: [data.point.email],
    });
  }
  
  function handleWhatsApp() {
    Linking.openURL(`whatsapp://send?phone=${data.point.whatsapp}`);
  }

  if(!data.point) {
    return null;
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
          <TouchableOpacity  onPress={handleNavigateBack}>
            <Icon name="arrow-left" size={20} color="#34cb79" />
          </TouchableOpacity>

          <Image style={styles.pointImage} source={{ uri: data.point.image_url }} />
          <Text style={styles.pointName}>{ data.point.name }</Text>
          <Text style={styles.pointItems}>
            { data.items.map(item => item.title).join(', ') }
          </Text>
      
          <View style={styles.address}>
            <Text style={styles.addressTitle}>Endereço</Text>
            <Text style={styles.addressContent}>{ data.point.city }, { data.point.uf }</Text>
          </View>
      </View>

      <View style={styles.footer}>
        <RectButton style={styles.button} onPress={handleWhatsApp}>
          <FontAwesome name="whatsapp" size={20} color="#FFF" />
          <Text style={styles.buttonText}>WhatsApp</Text>
        </RectButton>

        <RectButton style={styles.button} onPress={handleComposeMail}>
          <Icon name="mail" size={20} color="#FFF" />
          <Text style={styles.buttonText}>E-mail</Text>
        </RectButton>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
    paddingTop: 56,
  },

  pointImage: {
    width: '100%',
    height: 120,

    marginTop: 32,
    borderRadius: 10,

    resizeMode: 'cover',
  },

  pointName: {
    marginTop: 24,

    color: '#322153',
    
    fontSize: 28,
    fontFamily: 'Ubuntu_700Bold',
  },

  pointItems: {
    marginTop: 8,

    color: '#6C6C80',
    
    fontSize: 16,
    fontFamily: 'Roboto_400Regular',
    lineHeight: 24,
  },

  address: {
    marginTop: 32,
  },
  
  addressTitle: {
    color: '#322153',

    fontSize: 16,
    fontFamily: 'Roboto_500Medium',
  },

  addressContent: {
    marginTop: 8,
    
    color: '#6C6C80',

    fontFamily: 'Roboto_400Regular',
    lineHeight: 24,
  },

  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',

    paddingVertical: 20,
    paddingHorizontal: 32,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: '#999',
  },
  
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    
    width: '48%',
    height: 50,

    borderRadius: 10,
    
    backgroundColor: '#34CB79',
  },

  buttonText: {
    marginLeft: 8,

    color: '#FFF',
    
    fontSize: 16,
    fontFamily: 'Roboto_500Medium',
  },
});

export default Detail;