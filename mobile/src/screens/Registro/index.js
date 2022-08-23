import { useState } from 'react';
import { Button, Keyboard, TouchableWithoutFeedback } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
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
  const [cidade, setCidade] = useState('');
  const [tipo, setTipo] = useState('');
  const [categoria, setCategoria] = useState('');
  const [tempoPresente, setTempoPresete] = useState('');
  const [observacoes, setObservacoes] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [datePickerVisible, setDatePickerVisible] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisible(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisible(false);
  };

  const handleConfirm = (date) => {
    setSelectedDate(date);
    hideDatePicker();
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  function save() {
    // console.log('Cidade:', cidade);
    // console.log('Tipo:', tipo);
    // console.log('Categoria:', categoria);
    // console.log('Tempo presente:', tempoPresente);
    // console.log('Observações:', observacoes);
    console.log('Data e hora:', selectedDate.toLocaleString());
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

          <Input text={cidade} onChangeText={setCidade} placeholder="Cidade" />

          <Input text={tipo} onChangeText={setTipo} placeholder="Tipo" />

          <Input
            text={categoria}
            onChangeText={setCategoria}
            placeholder="Categoria"
          />

          <Input
            text={tempoPresente}
            onChangeText={setTempoPresete}
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
              {selectedDate
                ? selectedDate.toLocaleString()
                : 'No date selected'}
            </Text>

            <DateTimePickerModal
              date={selectedDate}
              isVisible={datePickerVisible}
              is24Hour
              display="inline"
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
