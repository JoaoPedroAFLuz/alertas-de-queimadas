import styled from 'styled-components/native';

export const ScrollView = styled.ScrollView``;

export const Container = styled.View`
  width: 100%;
  align-self: center;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  margin-top: 20px;
`;

export const Title = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: #00a819;
`;

export const Text = styled.Text`
  font-size: 16px;
  color: ${({ color }) => color};
`;

export const DateContainer = styled.Pressable`
  flex-direction: row;
  width: 90%;
  height: 50px;
  justify-content: space-between;
  align-items: center;
  margin-top: 25px;
  border-radius: 8px;
  padding: 0 16px;
  background: #ffffff;
`;

export const PickerContainer = styled.View``;

export const ButtonContainer = styled.View`
  margin-top: 20px;
  width: 30%;
  border-radius: 20px;
  background: #00a819;
`;

export const Pressable = styled.Pressable`
  align-items: center;
  justify-content: center;
  padding: 10px 0;
  margin: 0;
`;
