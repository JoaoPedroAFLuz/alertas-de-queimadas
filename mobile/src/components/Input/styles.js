import styled from 'styled-components/native';
import { TextInput } from 'react-native';

export const Container = styled.View`
  width: 90%;
`;

export const StyledInput = styled(TextInput)`
  margin-top: 25px;
  background: #fff;
  height: 52px;
  width: 100%;
  border-radius: 8px;
  padding: 0 16px;
`;
