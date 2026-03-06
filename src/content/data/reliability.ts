export interface ReliabilitySnapshot {
  id: string;
  label: string;
  date: string;
  description: string;
}

export interface ReliabilityGate {
  id: string;
  gate: string;
  status: "pass" | "fail";
  metric: string;
  note: string;
}

export interface ReliabilityTrace {
  step: string;
  latencyMs: number;
  outcome: string;
}

export interface ReliabilityBudget {
  label: string;
  value: string;
  note: string;
}

export const reliabilityData = {
  snapshots: [
    {
      id: "v1",
      label: "Snapshot v1",
      date: "2025-10-03",
      description: "Initial stable release with schema validation and baseline gates.",
    },
    {
      id: "v2",
      label: "Snapshot v2",
      date: "2025-11-22",
      description: "Added trace instrumentation and stricter edge-case handling.",
    },
    {
      id: "v3",
      label: "Snapshot v3",
      date: "2026-01-15",
      description: "Performance-tuned runtime with deterministic replay and version pinning.",
    },
  ] satisfies ReliabilitySnapshot[],
  gatesBySnapshot: {
    v1: [
      {
        id: "schema-contract",
        gate: "Schema Contract",
        status: "pass",
        metric: "100%",
        note: "All required payload contracts validated by AJV.",
      },
      {
        id: "critical-rules",
        gate: "Critical Rule Paths",
        status: "pass",
        metric: "24/24",
        note: "No divergence in deterministic decision branches.",
      },
      {
        id: "p95-latency",
        gate: "Latency Budget",
        status: "fail",
        metric: "52ms p95",
        note: "Exceeded target due to nested rule resolution overhead.",
      },
    ],
    v2: [
      {
        id: "schema-contract",
        gate: "Schema Contract",
        status: "pass",
        metric: "100%",
        note: "Backward-compatible schema migration complete.",
      },
      {
        id: "critical-rules",
        gate: "Critical Rule Paths",
        status: "pass",
        metric: "31/31",
        note: "Expanded scenario coverage with no regressions.",
      },
      {
        id: "p95-latency",
        gate: "Latency Budget",
        status: "pass",
        metric: "39ms p95",
        note: "Caching and evaluator pruning restored budget.",
      },
    ],
    v3: [
      {
        id: "schema-contract",
        gate: "Schema Contract",
        status: "pass",
        metric: "100%",
        note: "Strict schema and SDK version parity enforced.",
      },
      {
        id: "critical-rules",
        gate: "Critical Rule Paths",
        status: "pass",
        metric: "43/43",
        note: "High-risk decision paths validated with replay tests.",
      },
      {
        id: "p95-latency",
        gate: "Latency Budget",
        status: "pass",
        metric: "34ms p95",
        note: "Stable under production-like multi-tenant load.",
      },
    ],
  } as Record<string, ReliabilityGate[]>,
  tracesBySnapshot: {
    v1: [
      { step: "request_received", latencyMs: 1.7, outcome: "ok" },
      { step: "schema_validation", latencyMs: 8.1, outcome: "ok" },
      { step: "rule_graph_eval", latencyMs: 31.5, outcome: "ok" },
      { step: "policy_resolution", latencyMs: 9.3, outcome: "ok" },
      { step: "response_emit", latencyMs: 2.2, outcome: "ok" },
    ],
    v2: [
      { step: "request_received", latencyMs: 1.5, outcome: "ok" },
      { step: "schema_validation", latencyMs: 6.4, outcome: "ok" },
      { step: "rule_graph_eval", latencyMs: 24.2, outcome: "ok" },
      { step: "policy_resolution", latencyMs: 5.8, outcome: "ok" },
      { step: "response_emit", latencyMs: 1.9, outcome: "ok" },
    ],
    v3: [
      { step: "request_received", latencyMs: 1.3, outcome: "ok" },
      { step: "schema_validation", latencyMs: 5.9, outcome: "ok" },
      { step: "rule_graph_eval", latencyMs: 20.8, outcome: "ok" },
      { step: "policy_resolution", latencyMs: 4.2, outcome: "ok" },
      { step: "response_emit", latencyMs: 1.6, outcome: "ok" },
    ],
  } as Record<string, ReliabilityTrace[]>,
  latencyBudgets: [
    {
      label: "Decision API p95",
      value: "< 40ms",
      note: "Budget for synchronous business-critical calls.",
    },
    {
      label: "Schema Validation",
      value: "< 10ms",
      note: "Strict contract checks before decision execution.",
    },
    {
      label: "Trace Export",
      value: "< 5ms",
      note: "Asynchronous write path keeps response fast.",
    },
  ] satisfies ReliabilityBudget[],
};
