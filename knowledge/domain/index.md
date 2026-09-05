
# Domain

A Domain represents one screen or page. It includes every part required for that screen to work correctly and independently.

Each screen must be `standalone`. It must know all inputs and outputs required to operate and to expose data needed by the next screen.

The Domain is the highest-level component of the screen. It contains the components and dependencies required to generate the screen and must be imported and rendered according to the framework route.

Code example using Astro:

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
