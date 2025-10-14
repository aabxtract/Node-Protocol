;; node-protocol-v1.clar
;; Main contract for Node Protocol, handling liquid staking and node staking.

;; --- Traits ---
(define-trait ft-trait
  (
    (transfer (uint principal principal (optional (buff 34))) (response bool uint))
    (get-name () (response (string-utf8 256) uint))
    (get-symbol () (response (string-utf8 256) uint))
    (get-decimals () (response uint uint))
    (get-balance (principal) (response uint uint))
    (get-total-supply () (response uint uint))
    (set-token-uri ((string-utf8 256)) (response bool uint))
    (mint (uint principal) (response bool uint))
    (burn (uint principal) (response bool uint))
  )
)

;; --- Constants ---
(define-constant contract-owner tx-sender)
(define-constant nstx-token-contract <nstx-token-ft-trait>)
(define-constant STX_DECIMALS u6)

;; Initial exchange rate precision
(define-constant RATE_PRECISION u1000000)

;; --- Data Variables ---

;; Manages the contract's locked/unlocked state
(define-data-var contract-locked bool true)

;; Total STX staked in the liquid staking vault
(define-data-var total-stx-liquid-staked uint u0)

;; --- Errors ---
(define-constant ERR_UNAUTHORIZED (err u100))
(define-constant ERR_CONTRACT_LOCKED (err u101))
(define-constant ERR_STAKE_AMOUNT_ZERO (err u102))
(define-constant ERR_NOTHING_TO_UNSTAKE (err u103))
(define-constant ERR_INSUFFICIENT_NSTX_BALANCE (err u104))

;; =============================================
;; LIQUID STAKING (LONG-RUN VAULTS)
;; =============================================

;; --- Internal Functions ---

;; Calculates how much nSTX to mint for a given STX amount
(define-private (calculate-nstx-to-mint (stx-amount uint))
  (let
    (
      (total-stx (var-get total-stx-liquid-staked))
      (total-nstx (try! (contract-call? nstx-token-contract get-total-supply)))
    )
    (if (or (is-eq total-stx u0) (is-eq total-nstx u0))
      ;; Initial rate is 1:1
      stx-amount
      ;; Subsequent rate: (stx-amount * total-nstx) / total-stx
      (/ (* stx-amount total-nstx) total-stx)
    )
  )
)

;; Calculates how much STX to return for a given nSTX amount
(define-private (calculate-stx-to-return (nstx-amount uint))
  (let
    (
      (total-stx (var-get total-stx-liquid-staked))
      (total-nstx (try! (contract-call? nstx-token-contract get-total-supply)))
    )
    (if (or (is-eq total-stx u0) (is-eq total-nstx u0))
      ;; Should not happen if nstx-amount > 0, but as a fallback
      nstx-amount
      ;; Rate: (nstx-amount * total-stx) / total-nstx
      (/ (* nstx-amount total-stx) total-nstx)
    )
  )
)

;; --- Public Functions ---

;; Stake STX and receive nSTX
(define-public (stake-liquid (stx-amount uint))
  (begin
    (asserts! (not (var-get contract-locked)) ERR_CONTRACT_LOCKED)
    (asserts! (> stx-amount u0) ERR_STAKE_AMOUNT_ZERO)

    ;; Transfer STX from user to this contract
    (try! (stx-transfer? stx-amount tx-sender (as-contract tx-sender)))

    ;; Calculate nSTX to mint based on current exchange rate
    (let
      (
        (nstx-to-mint (calculate-nstx-to-mint stx-amount))
        (current-total-stx (var-get total-stx-liquid-staked))
      )
      ;; Mint new nSTX to the user
      (try! (as-contract (contract-call? nstx-token-contract mint nstx-to-mint tx-sender)))

      ;; Update total STX staked
      (var-set total-stx-liquid-staked (+ current-total-stx stx-amount))

      (print { action: "stake-liquid", stx-amount: stx-amount, nstx-minted: nstx-to-mint, staker: tx-sender })
      (ok true)
    )
  )
)

;; Unstake nSTX and receive STX
(define-public (unstake-liquid (nstx-amount uint))
  (begin
    (asserts! (not (var-get contract-locked)) ERR_CONTRACT_LOCKED)
    (asserts! (> nstx-amount u0) ERR_NOTHING_TO_UNSTAKE)

    ;; Check if user has enough nSTX
    (let ((user-nstx-balance (try! (contract-call? nstx-token-contract get-balance tx-sender))))
      (asserts! (>= user-nstx-balance nstx-amount) ERR_INSUFFICIENT_NSTX_BALANCE)
    )

    ;; Calculate STX to return
    (let
      (
        (stx-to-return (calculate-stx-to-return nstx-amount))
        (current-total-stx (var-get total-stx-liquid-staked))
      )
      ;; Burn user's nSTX
      (try! (as-contract (contract-call? nstx-token-contract burn nstx-amount tx-sender)))

      ;; Transfer STX from contract to user
      (try! (as-contract (stx-transfer? stx-to-return tx-sender)))

      ;; Update total STX staked
      (var-set total-stx-liquid-staked (- current-total-stx stx-to-return))

      (print { action: "unstake-liquid", nstx-amount: nstx-amount, stx-returned: stx-to-return, staker: tx-sender })
      (ok true)
    )
  )
)

;; --- Read-Only Functions ---

;; Get the current exchange rate of 1 STX to nSTX
(define-read-only (get-liquid-exchange-rate)
  (ok (calculate-nstx-to-mint RATE_PRECISION))
)

;; Get total STX in the liquid vault
(define-read-only (get-total-stx-liquid-staked)
  (ok (var-get total-stx-liquid-staked))
)


;; =============================================
;; NODE STAKING (PLACEHOLDER)
;; =============================================
;; This section is a basic framework. The logic for how "Node Power" is
;; represented (e.g., as an NFT) and how rewards are distributed would
;; need to be implemented based on your specific protocol design.

(define-map node-stakes principal uint)

(define-public (stake-for-node (stx-amount uint))
  (begin
    (asserts! (not (var-get contract-locked)) ERR_CONTRACT_LOCKED)
    (asserts! (> stx-amount u0) ERR_STAKE_AMOUNT_ZERO)

    ;; TODO: Add logic to delegate STX to a stacking pool or node operator
    ;; For now, we just record the stake internally
    (let ((current-stake (default-to u0 (map-get? node-stakes tx-sender))))
      (map-set node-stakes tx-sender (+ current-stake stx-amount))
      (print { action: "stake-for-node", stx-amount: stx-amount, staker: tx-sender })
      (ok true)
    )
  )
)

(define-read-only (get-node-stake (staker principal))
  (ok (default-to u0 (map-get? node-stakes staker)))
)


;; =============================================
;; ADMIN FUNCTIONS
;; =============================================

;; Toggles the contract's locked state (callable by contract owner only)
(define-public (toggle-contract-lock)
  (begin
    (asserts! (is-eq tx-sender contract-owner) ERR_UNAUTHORIZED)
    (var-set contract-locked (not (var-get contract-locked)))
    (ok (var-get contract-locked))
  )
)

;; Function to add rewards to the liquid pool, which increases the value of nSTX
(define-public (add-liquid-rewards)
  (let ((rewards (stx-get-balance (as-contract tx-sender))))
    ;; This function assumes rewards have been transferred to the contract address.
    ;; It updates the total STX, which implicitly increases nSTX value.
    (var-set total-stx-liquid-staked (+ (var-get total-stx-liquid-staked) rewards))
    (ok rewards)
  )
)
