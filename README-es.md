<p align="center">
<img align="center" src="DAppWall.png" width="345" height="294">
</p>
<h2> Inspiración </h2>

<p>Crear una red más segura con DAppNode</p>

  <h2> ¿Qué hace? </h2>
  
<p>
* DAppWall es una DApp para DAppNode que permite crear listas de nodos. Con un proceso de governanza se determina si un nodo (su ip o su id) pasa a formar parte de una <i>blacklist</i> o <i>whitelist</i>. En función de esa lista, DAppWall genera el firewall, al que hemos llamado DAppWall. 

* DAppWall utiliza una sistema de gobernanza mediante una DAO en Aragon (pudiendo verificar su identidad con uPort) en el cual, la comunidad decidirá quién entra en la lista negra o blanca. En otras palabras, cada nodo decide qué nodos van en su lista negra o blanca. Estos nodos luego compartirán sus listas para ponerlos en la lista principal, la cual DAppWall usará para construir el DAppWall. 

* Permite crear una lista de nodos federados o red de confianza.

* También permite crear una estructura de protección para nodos que lo necesiten, ocultando así los nodos más sensibles.
</p>


<summary>
  <b> ¿Cómo lo hemos construido? </b>
</summary>
<details>
<p>
 Nuestro objetivo es construir el frontend con HTML5 y Bootstrap, aunque la idea será usar React en le futuro próximo. El backend con iptables (gobernado por un smartcontract).
</p>
</details>
<summary>
  <b> Obstáculos encontrados </b>
</summary>
<details>
<p>
Crear la DAO ha sido lo más complejo, escribir los contractos también a nos ha causado problemas debido a la complejidad de las reglas elejidas.
 </p>
</details>
<summary>
  <b> ¿Qué hemos aprendido? </b>
</summary>
<details>
<p>
Conectar Metamask (web3) a nuestro frontend.
Interactuar con smart contract desde Nodejs.
Cómo usar Aragon y crear una DApp para DAppnode con su SDK.
</p>
</details>
