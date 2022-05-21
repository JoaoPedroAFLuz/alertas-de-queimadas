import styled from 'styled-components/native';

export const Container = styled.View`
  width: 90%;
  align-self: center;
  align-items: center;
  justify-content: space-between;
  border-radius: 24px;
  flex-direction: column;
  padding-top: 16px;
`;

export const Alert = styled.View`
  background: #ddd;
  width: 90%;
  padding: 8px 16px;
  align-items: center;
  flex-direction: row;
  border-radius: 24px;
`;

export const Description = styled.View`
  width: 100%;
  justify-content: space-between;
`;

export const Info = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: 4px;
  margin-top: 20px;
  flex-wrap: wrap;
`;

export const Title = styled.Text`
  font-size: 18px;
  font-weight: bold;
`;

export const Key = styled.Text``;

export const Value = styled.Text`
  margin-top: 5px;
`;

export const Image = styled.Image`
  width: 150px;
  height: 150px;
`;

export const ButtonContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
