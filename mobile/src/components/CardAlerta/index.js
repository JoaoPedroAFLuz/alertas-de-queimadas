import moment from 'moment';
import {
  Alerta, Info, Key, Value,
} from './styles';

export function CardAlerta({ alerta, onPress }) {
  return (
    <Alerta onPress={onPress}>
      {alerta.tipoAlerta === 'humano' ? (
        <>
          <Info>
            <Key>Local:</Key>
            <Value>{alerta.local}</Value>
          </Info>
          <Info>
            <Key>Data e hora:</Key>
            <Value>
              {moment(alerta.dataHora).format('HH:mm:ss DD/MM/YYYY')}
            </Value>
          </Info>
          <Info>
            <Key>Tipo do fogo:</Key>
            <Value>{alerta.tipo}</Value>
          </Info>
        </>
      ) : (
        <>
          <Info>
            <Key>Local:</Key>
            <Value>{alerta.municipio}</Value>
          </Info>
          <Info>
            <Key>Data e hora:</Key>
            <Value>
              {moment(alerta.datahora, 'YYYY/MM/DD HH:mm:ss').format(
                'HH:mm:ss DD/MM/YYYY',
              )}
            </Value>
          </Info>
          <Info>
            <Key>FRP:</Key>
            <Value>{alerta.frp}</Value>
          </Info>
        </>
      )}
    </Alerta>
  );
}
