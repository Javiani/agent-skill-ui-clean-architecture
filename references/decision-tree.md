# Decision tree for UI Clean Architecture

## Is the code about business meaning?

- Yes -> place it in domain or application
- No -> it is likely UI or infrastructure

## Is the code about user interaction and rendering?

- Yes -> presentation layer
- No -> continue

## Is the code about a network, persistence, caching, storage, or external API?

- Yes -> infrastructure layer
- No -> continue

## Is the code coordinating several domain behaviors to accomplish a task?

- Yes -> application layer
- No -> likely a domain rule or a UI/data adapter

## Does it need to know about the framework or browser runtime?

- Yes -> keep it at the boundary, not in the center
- No -> it is a better candidate for domain or application logic

## Does it translate external data into internal structures?

- Yes -> adapter/infrastructure boundary
- No -> it may be domain or application logic

## Can the logic be tested without rendering or network calls?

- Yes -> move it inward and keep it independent
- No -> investigate whether it is a UI or infrastructure concern

## Does the module have a stable meaning regardless of delivery technology?

- Yes -> domain/application candidate
- No -> likely presentation or infrastructure

## Boundary check

Before finishing, confirm:
- outer layers depend on inner layers
- no direct dependency from the domain to the UI or infrastructure
- boundaries translate data and contracts
- no business rules live in framework-specific code
