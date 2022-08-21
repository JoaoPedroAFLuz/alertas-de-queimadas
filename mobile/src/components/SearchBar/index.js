import Icon from 'react-native-vector-icons/AntDesign';

import { Container, TextInput } from './styles';

export function SearchBar({ setBusca, onClick }) {
  return (
    <Container>
      <TextInput placeholder="Busque por uma cidade..." onChangeText={(event) => setBusca(event)} />
      <Icon style={{ padding: 8 }} size={20} name="search1" onPress={onClick} />
    </Container>
  );
}
