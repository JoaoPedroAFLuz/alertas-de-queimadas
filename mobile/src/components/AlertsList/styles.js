import styled from 'styled-components/native';

export const Container = styled.View`
  width: 100%;
  height: 100%;
  background: #f3f6f4;
  align-items: center;
  flex-direction: column;
  padding-top: 16px;
`;

export const ButtonContainer = styled.View`
  flex-direction: row;
  margin-bottom: 16px;
`;

export const TouchableOpacity = styled.TouchableOpacity`
  margin-left: 10px;
  padding: 20px;
  border: 1px solid #00a819;
  border-radius: 20px;

  &:disabled {
    background-color: #00a819;
  }
`;

export const Text = styled.Text``;
