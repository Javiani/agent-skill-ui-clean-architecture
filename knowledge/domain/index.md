
# Domain

Domain representa cada tela / página do sistema. Um domínio envolve todas as partes que sao necessárias para que a tela em si funciona corretamente e de maneira independente.

Cada tela deve funcionar de maneira `standalone`, ela deve saber todos os inputs e outputs que ela necessita salvar e disponibilizar para a próxima tela.

O Dominio é o componente de mais alto nível da tela, conterá todos os componentes e dependencias necessários para gerar a tela e deve ser importado e renderizado pelo sistema de acordo com a sua rota.

Exemplo de Código ( Usando o framework Astro )

```
---
import Header from '<path of the component>'
import Hero from '<path of the component>'
import Features from '<path of the component>'
import Examples from '<path of the component>'
import Cta from '<path of the component>'
import Footer from '<path of the component>'
--- 

<main>
	<Header />
	<Hero />
	<Features />
	<Examples />
	<Cta />
	<Footer />
</main>

```
