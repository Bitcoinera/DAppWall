<p align="center">
<img align="center" src="DAppWall.png" width="345" height="294">
</p>
<h2> Inspiración </h2>

<p>Crear una red más segura con DAppNode</p>

  <h2> ¿Qué hace? </h2>
  
<p>
* DAppWall es una DApp para DAppNode que permite crear listas de nodos. Con un proceso de governanza se determina si un nodo (su ip o su id) pasa a formar parte de una *blacklist/whitelist*. En función de esa lista, DAppWall genera su firewall. 

* DAppWall utiliza una sistema de gobernanza mediante una DAO en Aragon (pudiendo verificar su identidad con Uport) en el cual, la comunidad decidirá quien entra en la lista negra o blanca. En otras palabras, cada nodo decide que nodos van en su lista negra o blanca, estos nodos luego compartirán sus listas para ponerlos en la lista principal, la cual DAppWall usará para construir firewall. 

* Permite crear una lista de nodos federados o una red de confianza.

* También permite crear una estructura de protección para nodos que lo necesiten, ocultando así los nodos más sensibles.
</p>


<summary>
  <b> ¿Cómo lo hemos construido? </b>
</summary>
<details>
<p>
 Nuestro objetivo es construir el front-end con HTML5 y Bootstrap, el back-end con IP-tables (gobernado por un smartContract).
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
Como usar Aragon y crear una DApp para DAppnode con su sdk
</p>
</details>
