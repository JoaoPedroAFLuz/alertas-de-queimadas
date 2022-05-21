import styled from 'styled-components/native';

export const Container = styled.View`
  width: 100%;
  height: 100%;
  background: #f3f6f4;
  align-items: center;
  flex-direction: column;
  padding: 24px;
`;

export const ContainerBotao = styled.View`
  flex-direction: row;
  margin-bottom: 16px;
`;

export const BotaoAlerta = styled.TouchableOpacity`
  margin: 0 8px;
  padding: 20px;
  border: 1px solid #00a819;
  border-radius: 20px;

  background-color: ${({ disabled }) => (disabled ? '#00a819' : '#f3f6f4')};
`;

export const TextoAlerta = styled.Text`
  color: ${({ disabled }) => (disabled ? '#f3f6f4' : '#00a819')};
`;

export const FlatListAlertas = styled.FlatList`
  width: 100%;
`;
