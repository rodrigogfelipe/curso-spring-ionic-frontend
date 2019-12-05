/**Mostrando dados e imagem do cliente para página de profile */

export interface ClienteDTO {
    id : string;
    nome : string;
    email : string;
    imageUrl? : string;/*URL da imagem ? significar uma opção na obrifatoria da imagem*/
}