import { Container, StyledInput } from './styles';

export function Input({ text, onChangeText, placeholder }) {
  return (
    <Container>
      <StyledInput
        value={text}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#aaaaaa"
      />
    </Container>
  );
}
