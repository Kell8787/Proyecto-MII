let btnEjercicio1 = null; 
let btnEjercicio5 = null;
let sinCero = {contador: 0, positivos: 0, negativos: 0 };
let conCero = { contador: 0, igualCero: 0, diffCero: 0 };

const enlazarElementos = () => {
  btnEjercicio1 = document.querySelector("div.btn1");
  btnEjercicio5 = document.querySelector("div.btn2");
};

// Funcion que ejecutara los eventos del boton "Ejecicio 1" y "Ejecicio 5"
const eventos = () => {
// Se utilizara un addEvenListener cuando el usuario haga click en el boton de "Ejercicio 1".
  btnEjercicio1.addEventListener("click", () => {
    let arrPrincipal = [];
    let arrEscogidos = [];
    let posRep = [];
    let resultados = [];

    let cantRep = prompt(`Cuantas veces desea realizar el experimento?`);
    let zero = confirm(`Desea incluir el 0?`);

    const llenarArr = () => {
      zero === true ? (arrPrincipal[0] = 0) : null;
      zero === true ? (conCero.contador += 1) : (sinCero.contador += 1);

      for (let i = 0; i < 14; i++) {
        let num = 0;

        num = Math.floor(Math.random() * 100 + 1);

        if (arrPrincipal.length < 6) arrPrincipal.push(num);
        else arrPrincipal.push(-num);

        if (arrPrincipal.length === 14) break;
      }

      //alert(`\nLos numeros disponibles para el experimento son:\n\n${arrPrincipal.join(',  ')}`);
    };

    const escogerNumeros = () => {
      for (let i = 0; ; i++) {
        let pos = Math.floor(Math.random() * 14);

        if (posRep.includes(pos)) continue;
        else arrEscogidos.push(arrPrincipal[pos]);

        posRep.push(pos);

        if (arrEscogidos.length === 4) break;
      }

      //alert(`Array principal:\n\n ${arrPrincipal.join(',  ')}\n\nNumeros escogidos para el experimento:\n\n${arrEscogidos.join(',  ')}`);
    };

    const multiplicarNums = ([pos1, pos2, pos3, pos4]) => {
      let result = pos1 * pos2 * pos3 * pos4;

      if (zero) {
        if (result === 0) conCero.igualCero += 1;
        else conCero.diffCero += 1;
      } else {
        if (result > 0) sinCero.positivos += 1;
        else sinCero.negativos += 1;
      }

      if (result === -0) result = 0;

      resultados.push(result);

      //alert(`El resultado de multiplicar todos los numeros del array:\n\n${arrEscogidos.join(',  ')}\n\nEs:\n\n${result.toLocaleString('en-ES')}`);
      arrPrincipal.length = 0;
      arrEscogidos.length = 0;
      posRep.length = 0;
    };

    const datosExperimento = () => {
      if (zero) {
        alert(
          `El experimento se ha realizado ${conCero.contador} veces incluyendo el cero en los numeros positivos.\n\n
                    Cantidad de resultados nulos: ${conCero.igualCero}\n\n
                    Cantidad de resultados no nulos: ${conCero.diffCero}`
        );
      } else {
        alert(
          `El experimento se ha realizado ${sinCero.contador} veces sin incluir el cero en los numeros positivos.\n\n
                    Cantidad de resultados positivos: ${sinCero.positivos}\n\n
                    Cantidad de resultados negativos: ${sinCero.negativos}`
        );
      }

      let verResults = confirm(`Desea ver todos los resultados obtenidos?`);

      if (verResults)
        alert(`Los resultados obtenidos son:\n\n${resultados.join("\n")}`);
    };

    for (let i = 0; i < cantRep; i++) {
      llenarArr();
      escogerNumeros();
      multiplicarNums(arrEscogidos);
    }
    datosExperimento();

    cantRep = 0;
    sinCero.contador = 0;
    sinCero.negativos = 0;
    sinCero.positivos = 0;
    conCero.contador = 0;
    conCero.diffCero = 0;
    conCero.igualCero = 0;
    resultados.length = 0;
  });

  // Se utilizara un addEvenListener cuando el usuario haga click en el boton de "Ejercicio 5".
  btnEjercicio5.addEventListener("click", () => {
    const cantidadExperimentos = obtenerCantidadExperimentos();

    if (!cantidadExperimentos || isNaN(cantidadExperimentos)) {
      mostrarMensajeError(
        "Por favor, ingrese un número válido para la cantidad de lanzamientos."
      );
      return;
    }

    let conteoExito = 0;

    const lanzarDados = () => {
      for (let i = 0; i < cantidadExperimentos; i++) {
        const dado1 = obtenerNumeroAleatorio(1, 6);
        const dado2 = obtenerNumeroAleatorio(1, 6);

        if (dado1 + dado2 >= 9) {
          conteoExito++;
        }
      }
    };

    const calcularProbabilidad = () => {
      const probabilidad = conteoExito / cantidadExperimentos;

      mostrarResultados(cantidadExperimentos, conteoExito, probabilidad);
    };

    lanzarDados();
    calcularProbabilidad();
  });

  function obtenerCantidadExperimentos() {
    return parseInt(prompt("Ingrese la cantidad de lanzamientos:"), 10);
  }

  function obtenerNumeroAleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function mostrarMensajeError(mensaje) {
    alert(mensaje);
  }

  function mostrarResultados(cantidadExperimentos, conteoExito, probabilidad) {
    const probabilidadPorcentual = (probabilidad * 100).toFixed(2); /// Hacer que me tire el resultado en probabilidad Porcentual.
    const mensajeResultados = `
        Número de experimentos: ${cantidadExperimentos}
        Número de casos favorables: ${conteoExito}
        Probabilidad P(Suma >= 9) y este el 6 en almenos 1 dado: ${probabilidad.toFixed(4)} o 
        aproximadamente ${probabilidadPorcentual}%
    `;

    alert(mensajeResultados);
  }
};

const Main = () => {
  enlazarElementos();
  eventos();
};

Main();
