export interface ProdutoDTO {
    id : string;
    nome : string;  
    preco : number;
    imageUrl? : string; /* imageUrl? tem  a função de guarda a imagem do produto*/ 
}