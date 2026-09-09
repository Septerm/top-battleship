



export function hello () {

    const message = "Basic Node Stack v1.0"
    const container = document.querySelector(".container");
    const text = document.createElement('h1');
    text.textContent = message;

    container.appendChild(text);

} 