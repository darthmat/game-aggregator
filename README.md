# game-aggregator
The application aggregates video game data from RAWG (the largest video game database) and current price deals from IsThereAnyDeal (ITAD). It allows you to search for games, retrieve rich game profiles with deals, and tracks popular search queries.

### Prerequisites
The application requires Docker and Docker Compose to run, targeting Node 24.
All dependencies are managed with pnpm.

### Installation
Copy .env.example to .env and fill in your database credentials, Redis configuration, and external API keys (RAWG and ITAD).

##### Docker:
```sh
docker compose up --build
```
#### Local:
```sh
pnpm install
pnpm migrations
pnpm develop
```

### API Endpoints
The API routing and validation are handled by Fastify and Zod schemas.
Available endpoints include:

`GET /healthz` - Application health check

`GET /games/search?title={query}` - Search for games based on a title

`GET /game/:title/:country?` - Retrieve a specific game profile along with its pricing deals

`GET /search-history/popular` - Retrieve the top 10 most popular search queries

### Tests
Tests can be run with:

```sh
pnpm test
```

### Architectural decisions
I tried to keep the codebase modular and close to Clean Architecture principles, focusing on testability and clear boundaries.

- **Manual DI & Separation of Concerns**: The HTTP layer (Fastify routers) is strictly separated from the business logic (services) and data access (repositories/API clients). Everything is wired up manually in `container.ts`. This avoided the need for heavy DI frameworks and made mocking dependencies in tests painless.

- **Caching via Decorators**: I wanted to keep the Redis caching logic completely out of the external API clients. I used the Decorator pattern (e.g., `CachedRawgApi` wraps the base API class) so the core fetching logic stays clean and untouched.

- **Event-Driven Background Tasks**: Tracking search history shouldn't slow down the actual search. The app emits a background event using Node's native `EventEmitter` (a simple fire-and-forget approach). If the DB insert fails, the user still gets their game results without any delay.

- **Testing Strategy**: Instead of dealing with messy `vi.mock()` chains, I built Fakes for the external APIs (`FakeRawgApi`, `FakeItadApi`) to keep unit tests fast and deterministic. For the repository layer, the integration tests spin up real PostgreSQL instances on the fly using Testcontainers.

- **Type Safety**: Zod handles all the runtime validation (both for incoming Fastify requests and external API payloads), while Kysely ensures type-safe SQL queries.

- **API Resilience**: To prevent the app from hanging or getting rate-limited by RAWG/ITAD, external fetch calls are wrapped with `p-limit` (to control concurrency) and `AbortController` (to enforce strict timeouts).