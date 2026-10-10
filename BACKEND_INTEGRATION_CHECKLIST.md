# SafeTra frontend integration checklist

This prototype intentionally uses local mock services only. Do not configure a backend URL or payment-provider key in this frontend until the points below are confirmed. The sibling backend source was inspected for this prototype; API mount prefixes and production deployment configuration still need verification.

## Confirm before connecting

- [ ] Confirm the deployed API base URL, route mount prefixes, CORS policy, versioning, and environment strategy. Route modules expose auth registration/login/OTP/logout, transaction create/get/accept/mark-shipped/mark-delivered/confirm-delivery, payment initialize/verify, dispute open/get, and payout-account get/save operations; module-local paths are not assumed to be final public URLs here.
- [ ] Agree on the auth response contract, cookie vs bearer-token transport, refresh-token rotation, logout/session-expiry handling, device ID behavior, and verification requirements. The backend registration schema requires full name, email, phone, password, confirmation, and BUYER/SELLER user type; login accepts email/password (email only, not phone).
- [ ] Resolve the transaction invitation contract: backend create validation requires `sellerId` as a Mongo ObjectId, while the desired no-account invitation flow begins with contact details. Confirm how an unregistered seller is invited, when seller ID is assigned, how the invitation token is delivered/expired/revoked, and which transaction fields are safe to return publicly.
- [ ] Reconcile seller acceptance ordering. The current backend state machine allows `INVITED -> PAYMENT_PENDING` and `FUNDED -> ACCEPTED`, while the product description suggests seller acceptance before buyer payment. Confirm which ordering and acceptance endpoint are intended before presenting a binding user workflow.
- [ ] Confirm money units and formatting at every API boundary. Backend money helpers treat integer amounts as minor units (pesewas); transaction schemas and models do not, by themselves, describe a currency-safe wire contract. Current frontend demo uses pesewas internally and GHS for display.
- [ ] Confirm fee configuration, percentage calculation/rounding, whether fees are charged on the buyer or seller side, provider charges, and any limits. Backend defaults are 0.5% buyer and 0.5% seller, but rates are environment-configurable and the backend recalculates them.
- [ ] Confirm delivery and inspection behavior: only `PHYSICAL`/`DIGITAL` are accepted, inspection defaults to 24 hours and is configurable up to 720 hours. Backend routes include seller mark-shipped/mark-delivered and buyer confirm-delivery; confirm role enforcement and event payloads.
- [ ] Confirm payment initialization response/redirect handling and allowed Paystack channels. The payment model records `card`, `bank`, `ussd`, `qr_code`, `mobile_money`, or `unknown`; available channels are a provider/configuration concern. Only use the backend's server-created reference and server verification result.
- [ ] Confirm the source of truth and response shapes for transaction, payment, escrow, dispute, and settlement records. Keep their statuses separate. Backend status vocabularies are represented in frontend formatters, but only server responses may drive production actions.
- [ ] Confirm dispute response/evidence upload APIs, allowed actors, status changes, attachment provider/limits, notification visibility, resolution reason requirements, and whether authorized parties can add statements after opening.
- [ ] Confirm settlement list/detail endpoints and actual status behavior (`PENDING`, `PROCESSING`, `SUCCESS`, `FAILED`, `REVERSED`, `PARTIALLY_PAID`). Trade completion must not be treated as payout success.
- [ ] Confirm payout account UI requirements and mask policy. Backend supports `BANK_ACCOUNT` and `MOBILE_MONEY`, GHS, and MTN/TELECEL/AIRTELTIGO; provider recipient metadata is server-generated. Current UI creates only mock Mobile Money entries and deliberately omits bank entry until its validation requirements are implemented.
- [ ] Confirm all admin permissions, allowed data scopes, audited actions, reason requirements, and whether `SUPER_ADMIN` is the only unrestricted role. UI role checks are demonstrative only; backend authorization remains mandatory.
- [ ] Confirm notification delivery/read APIs, profile update/password change endpoints, session management, and account deactivation policy before exposing those settings as live operations.
- [ ] Replace draft Terms, Privacy, and Dispute/Refund copy with approved legal text; confirm support channels and remove all demo disclosures only after the real workflows are available.

## Suggested connection order

1. Define typed frontend request/response adapters from the confirmed OpenAPI or API documentation; preserve the existing mock service interface behind an implementation switch.
2. Integrate auth and session expiry first, including verified email/phone state and role/permission hydration.
3. Integrate transaction create/read/invitation and state-aware allowed actions; remove client-side assumptions when server action data is available.
4. Integrate payment initialize/redirect/verify using server references only; never collect provider credentials in SafeTra UI.
5. Integrate escrow/dispute/delivery and settlement/payout records as distinct resources, with idempotent mutation handling and clear pending/failure states.
6. Integrate payout account validation, evidence storage, notifications, profile/settings, and permission-scoped admin views.
7. Add contract tests against the confirmed schemas, authorization tests for each role, and end-to-end tests for valid/invalid state transitions, payment verification, disputes, settlement outcomes, and responsive keyboard-accessible workflows.

## Prototype data notes

- `src/services/mockSafetra.ts` is local-only and writes demo transactions, session selection, and payout account samples to browser local storage.
- Demo pricing uses backend default percentages as a clearly labelled estimate; mock status changes do not send requests, take custody of funds, create provider recipients, or issue refunds/payouts.
- Current demo account selectors are convenience controls, not authentication. Do not carry the demo role/session implementation into production.
