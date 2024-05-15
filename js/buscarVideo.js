import { conectaApi } from "./conectaApi.js";
import constroiCard from "./mostrarVideos.js";

async function buscarVideo(evento)
{
    const dadosDePesquisa = document.querySelector("[data-pesquisa]").value;
    const busca = await conectaApi.buscaVideo(dadosDePesquisa);
    const lista = document.querySelector("[data-lista]");

    while(lista.firstChild)
    {
        lista.removeChild(lista.firstChild);
    }
    busca.forEach(elemento => lista.appendChild(constroiCard(elemento.titulo, elemento.descricao, elemento.url, elemento.imagem)));
    if(busca.length == 0)
    {
        lista.innerHTML = `<h2 class="mensagem__titulo">Nenhum vídeo corresponde a pesquisa</h2>`;
    }
}

const botaoPesquisa = document.querySelector("[data-botao]");
botaoPesquisa.addEventListener("click", evento => 
{
    evento.preventDefault();
    buscarVideo(evento)
});

const barraPesquisa = document.querySelector("[data-pesquisa]");
barraPesquisa.addEventListener("keypress", evento => 
    {
        if(evento.key === "Enter")
        {
            evento.preventDefault();
            buscarVideo(evento)
        }
    });