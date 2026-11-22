# Lean ERP demo

## Goal
Turn the blank home screen into a small, demo-ready ERP interface while minimizing implementation scope. A $5 one-time Lovable build-cost cap cannot be guaranteed: build charges are usage-based and depend on the work and iterations. This plan avoids paid runtime services but does not set or guarantee the Lovable build charge.

## Build
- Replace `/` with a responsive executive dashboard using the existing design tokens.
- Use a small, consistent sample dataset to show a few company metrics and pending work.
- Add a compact assistant panel with a few preset questions and prepared answers grounded in that sample data; make clear that answers are demo content.
- Add page-specific title and sharing metadata.

## Keep out of scope
No login, live database, external AI calls, MCP/Synapse, email, write actions, approvals, audit system, or complete HR/Finance/Sales/Operations modules. These are in the uploaded PRD, but implementing them would substantially expand the work and may require paid services.

## Technical approach
Keep this as a single client-facing TanStack Start home page with local sample data; preserve the existing Tailwind/shadcn semantic tokens and do not add backend services or dependencies.

## Verification
Check the dashboard at desktop and mobile widths, exercise a preset assistant question, and run the relevant project checks.
