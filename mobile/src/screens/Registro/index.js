import { useState } from 'react';
import { Keyboard, TouchableWithoutFeedback } from 'react-native';

import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';

import api from '../../services/api';
import { Input } from '../../components/Input';

import {
  ButtonContainer,
  Container,
  DateContainer,
  Pressable,
  ScrollView,
  Text,
  Title,
} from './styles';

export function Registro() {
  const [local, setLocal] = useState('');
  const [tipo, setTipo] = useState('');
  const [categoria, setCategoria] = useState('');
  const [tempo, setTempo] = useState('');
  const [observacoes, setObservacoes] = useState('');
  const [dataHora, setDatahora] = useState(new Date());
  const [datePickerVisible, setDatePickerVisible] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisible(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisible(false);
  };

  const handleConfirm = (date) => {
    setDatahora(date);
    hideDatePicker();
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  async function save() {
    const alerta = {
      local,
      tipo,
      categoria,
      tempo,
      observacoes,
      dataHora: moment(dataHora).format('HH:mm:ss DD/MM/YYYY'),
    };

    await api.emitirAlerta(alerta);
  }

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        dismissKeyboard();
      }}
    >
      <ScrollView>
        <Container>
          <Title>Informações sobre a queimada</Title>

          <Input text={local} onChangeText={setLocal} placeholder="Cidade" />

          <Input text={tipo} onChangeText={setTipo} placeholder="Tipo" />

          <Input
            text={categoria}
            onChangeText={setCategoria}
            placeholder="Categoria"
          />

          <Input
            text={tempo}
            onChangeText={setTempo}
            placeholder="Tempo presente"
          />

          <Input
            text={observacoes}
            onChangeText={setObservacoes}
            placeholder="Observações"
          />

          <DateContainer onPress={showDatePicker}>
            <Text color="#aaaaaa">Data e hora</Text>

            <Text color="#111111">
              {dataHora
                ? moment(dataHora.toUTCString()).format('DD/MM/YYYY | HH:mm:ss')
                : 'Selecione a data'}
            </Text>

            <DateTimePickerModal
              date={dataHora}
              maximumDate={new Date()}
              isVisible={datePickerVisible}
              is24Hour
              mode="datetime"
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
            />
          </DateContainer>

          <ButtonContainer>
            <Pressable onPress={() => save()}>
              <Text color="#ffffff">Enviar</Text>
            </Pressable>
          </ButtonContainer>
        </Container>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
}
