# StellarRoute Documentation

This directory is the documentation hub for StellarRoute. It organizes design, deployment, API, SDK, contract, and development content so contributors can find the right guide quickly.

## Documentation categories

### Architecture

- [Architecture overview](architecture/README.md) — entry point for architecture and operational design.
- [Diagrams](architecture/diagrams.md) — system, data flow, and deployment diagrams.
- [Database schema](architecture/database-schema.md) — normalized liquidity model and ERD.
- [Performance notes](architecture/PERFORMANCE_NOTES.md) — performance guidance and optimization notes.
- [Worker pool](architecture/WORKER_POOL.md) — indexer worker architecture and ingestion design.
- [Reconciliation](architecture/RECONCILIATION.md) — data consistency and recovery strategy.
- [Multi-region architecture](architecture/MULTI_REGION_ARCHITECTURE.md) — geo-distributed system design.
- [Multi-region runbook](architecture/MULTI_REGION_RUNBOOK.md) — operational runbook for multi-region deployments.

### API

- [API overview](api/README.md) — entry point for API reference.
- [Routes endpoint](api/routes_endpoint.md) — quote, orderbook, and route REST endpoints.
- [WebSocket API](api/websocket.md) — real-time quote stream API.
- [Versioning](api/versioning.md) — API versioning strategy.
- [Versioning policy](api/versioning-policy.md) — lifecycle policy for API changes.
- [Error taxonomy](api/error_taxonomy.md) — standardized API error responses.
- [v1 migration guide](api/v1-migration-guide.md) — compatibility and migration advice.
- [OpenAPI spec](api/openapi.yaml) — machine-readable REST API schema.

### Contracts

- [Contracts overview](contracts/README.md) — entry point for Soroban contract docs.
- [Router interface](contracts/router-interface.md) — public contract interface and event schema.
- [Contract deployment runbook](contracts/deployment-runbook.md) — Soroban contract lifecycle.
- [Gas benchmarks](contracts/gas-benchmarks.md) — gas cost and performance benchmarks.
- [Gas optimization](contracts/gas-optimization-usage.md) — WASM and gas optimization guidance.

### Deployment

- [Deployment overview](deployment/README.md) — deployment and production guides.
- [DB pool tuning](deployment/db-pool-tuning.md) — PostgreSQL pool sizing and tuning.
- [Database timeout guardrails](deployment/database-timeout-guardrails.md) — runtime timeout strategies.
- [Tracing troubleshooting](deployment/tracing-troubleshooting.md) — observability and tracing guidance.

### Development

- [Setup guide](development/SETUP.md) — local environment setup and tooling.
- [Testing guide](development/testing-guide.md) — project test strategies and commands.
- [Wallet integration](development/wallet-integration.md) — frontend wallet integration patterns.

### SDK

- [TypeScript SDK documentation](sdk-js/README.md) — TypeScript SDK guides and API docs.
- [Rust SDK documentation](sdk-rust/README.md) — Rust SDK usage and examples.

### Supporting docs

- [Monitoring](monitoring.md) — monitoring and metrics guidance.
- [Readiness](readiness/M2_GUIDE.md) — readiness and runbook content.
- [Audit log retention](audit-log-retention.md) — audit log retention policy.
- [Hybrid optimizer](hybrid_optimizer.md) — optimizer architecture and behavior.
- [Incident replay workflow](incident-replay-workflow.md) — replay and recovery workflow.

## Getting started

See the main [project README](../README.md) for an overview of StellarRoute.
