import {
  Alert,
  Info,
  Key,
  Value,
} from './styles';

export function AlertCard({ alerta }) {
  return (
    <Alert>
      {alerta.tipoAlerta === 'humano' ? (
        <>
          <Info>
            <Key>Local:</Key>
            <Value>{alerta.local}</Value>
          </Info>
          <Info>
            <Key>Data:</Key>
            <Value>{alerta.dataHora}</Value>
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
            <Key>Data:</Key>
            <Value>{alerta.datahora['$date']}</Value>
          </Info>
          <Info>
            <Key>FRP:</Key>
            <Value>{alerta.frp}</Value>
          </Info>
        </>
      )}
    </Alert>
  );
}
