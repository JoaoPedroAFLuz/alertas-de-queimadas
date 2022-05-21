import styled from 'styled-components/native';

export const Alerta = styled.TouchableOpacity`
  align-self: center;
  background: #fff;
  width: 100%;
  padding: 8px 16px;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 24px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0, 0.4);
  margin-bottom: 16px;
`;

export const Info = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 4px;
`;

export const Key = styled.Text`
  font-weight: bold;
`;

export const Value = styled.Text``;
