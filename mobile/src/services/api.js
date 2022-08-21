// eslint-disable-next-line import/no-unresolved
import { ALERTA_HUMANO_API, ALERTA_SATELITE_API } from '@env';

export default {
  async carregarAlertas(tipoAlerta, pagina, alertasPorPagina) {
    const url = tipoAlerta === 'humano'
      ? `${ALERTA_HUMANO_API}/alertas/humano?pagina=${pagina}&alertasPorPagina=${alertasPorPagina}`
      : `${ALERTA_SATELITE_API}/alertas/satelite?pagina=${pagina}&alertasPorPagina=${alertasPorPagina} `;

    const response = await fetch(url);
    const listaAlertas = await response.json();

    return listaAlertas.map((alerta) => ({ ...alerta, tipoAlerta }));
  },

  async carregarAlertasFiltrados(tipoAlerta, pagina, alertasPorPagina, cidade) {
    const url = tipoAlerta === 'humano'
      ? `${ALERTA_HUMANO_API}/alertas/humano/cidade?pagina=${pagina}&alertasPorPagina=${alertasPorPagina}&cidade=${cidade}`
      : `${ALERTA_SATELITE_API}/alertas/satelite/cidade?pagina=${pagina}&alertasPorPagina=${alertasPorPagina}&cidade=${cidade}`;

    const response = await fetch(url);
    const listaAlertas = await response.json();

    return listaAlertas.map((alerta) => ({ ...alerta, tipoAlerta }));
  },

  async carregarAlerta(alertaId, tipoAlerta) {
    const url = tipoAlerta === 'humano'
      ? `${ALERTA_HUMANO_API}/alertas/humano/findOne/${alertaId}`
      : `${ALERTA_SATELITE_API}/alertas/satelite/findOne/${alertaId}`;

    const response = await fetch(url);
    const alerta = await response.json();

    return alerta;
  },
};
