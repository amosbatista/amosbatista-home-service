import PaginationService from "./PaginationValuesService";

describe("Pagination Service", () => {
  const listaCompleta = [1, 2, 3, 4, 5 , 6, 7, 8, 9, 10];

  it("deve retornar os valores de uma página de tamanho 2", () => {
    const tamanhoPagina = 2;
    
    const pagina1 = 1;
    const infoPaginaAtual1 = PaginationService(pagina1, tamanhoPagina);
    const atualPagina1 = listaCompleta.slice(infoPaginaAtual1.takeFrom, infoPaginaAtual1.takeTo);
    expect(atualPagina1).toEqual([1, 2]);

    const pagina2 = 4;
    const infoPaginaAtual2 = PaginationService(pagina2, tamanhoPagina);
    const atualPagina2 = listaCompleta.slice(infoPaginaAtual2.takeFrom, infoPaginaAtual2.takeTo);
    expect(atualPagina2).toEqual([7, 8]);
  });

  it("deve retornar os valores de uma página de tamanho 4", () => {
    const tamanhoPagina = 4;
    
    const pagina1 = 1;
    const infoPaginaAtual1 = PaginationService(pagina1, tamanhoPagina);
    const atualPagina1 = listaCompleta.slice(infoPaginaAtual1.takeFrom, infoPaginaAtual1.takeTo);
    expect(atualPagina1).toEqual([1, 2, 3, 4]);

    const pagina2 = 2;
    const infoPaginaAtual2 = PaginationService(pagina2, tamanhoPagina);
    const atualPagina2 = listaCompleta.slice(infoPaginaAtual2.takeFrom, infoPaginaAtual2.takeTo);
    expect(atualPagina2).toEqual([5, 6, 7, 8]);

    const pagina3 = 3;
    const infoPaginaAtual3 = PaginationService(pagina3, tamanhoPagina);
    const atualPagina3 = listaCompleta.slice(infoPaginaAtual3.takeFrom, infoPaginaAtual3.takeTo);
    expect(atualPagina3).toEqual([9, 10]);
  });

});