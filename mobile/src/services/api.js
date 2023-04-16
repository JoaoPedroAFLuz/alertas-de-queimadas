// eslint-disable-next-line import/no-unresolved
import { REGISTRO_API, ALERTA_HUMANO_API, ALERTA_SATELITE_API } from '@env';

export default {
  async carregarAlertas(tipoAlerta, pagina, alertasPorPagina, cidade) {
    const url =
      tipoAlerta === 'humano'
        ? `${ALERTA_HUMANO_API}/alertas/humano?pagina=${pagina}&alertasPorPagina=${alertasPorPagina}&cidade=${cidade}`
        : `${ALERTA_SATELITE_API}/alertas/satelite?pagina=${pagina}&alertasPorPagina=${alertasPorPagina}&cidade=${cidade}`;

    const response = await fetch(url);
    const listaAlertas = await response.json();

    return listaAlertas.map((alerta) => ({ ...alerta, tipoAlerta }));
  },

  async carregarAlerta(alertaId, tipoAlerta) {
    const url =
      tipoAlerta === 'humano'
        ? `${ALERTA_HUMANO_API}/alertas/humano/findOne/${alertaId}`
        : `${ALERTA_SATELITE_API}/alertas/satelite/findOne/${alertaId}`;

    const response = await fetch(url);
    const alerta = await response.json();

    return alerta;
  },

  async emitirAlerta(alerta) {
    const url = `${REGISTRO_API}/alertas/humano`;

    await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(alerta),
    });
  },
};
