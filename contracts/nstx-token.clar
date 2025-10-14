;; nstx-token.clar
;; Fungible Token for Node Protocol's liquid staked STX

(define-fungible-token nstx-token)

;; --- Constants and Variables ---
(define-constant contract-owner tx-sender)
(define-data-var token-uri (optional (string-utf8 256)) none)

;; --- Errors ---
(define-constant ERR_UNAUTHORIZED (err u100))

;; --- Public Functions ---

;; Get the total supply of nSTX
(define-read-only (get-total-supply)
  (ok (ft-get-supply nstx-token))
)

;; Get the balance of a specific owner
(define-read-only (get-balance (owner principal))
  (ok (ft-get-balance nstx-token owner))
)

;; Get the token's name
(define-read-only (get-name)
  (ok "Node Staked STX")
)

;; Get the token's symbol
(define-read-only (get-symbol)
  (ok "nSTX")
)

;; Get the token's decimals
(define-read-only (get-decimals)
  (ok u6) ;; Same as STX
)

;; Get the token's URI for metadata
(define-read-only (get-token-uri)
  (ok (var-get token-uri))
)

;; --- Admin Functions ---

;; Transfer tokens to a recipient
(define-public (transfer (amount uint) (sender principal) (recipient principal) (memo (optional (buff 34))))
  (begin
    (asserts! (is-eq tx-sender sender) ERR_UNAUTHORIZED)
    (match (ft-transfer? nstx-token amount sender recipient)
      (success (response) (ok response))
      (error (err-code) (err err-code))
    )
  )
)

;; Set the token URI (callable by contract owner only)
(define-public (set-token-uri (uri (string-utf8 256)))
  (begin
    (asserts! (is-eq tx-sender contract-owner) ERR_UNAUTHORIZED)
    (ok (var-set token-uri (some uri)))
  )
)

;; --- Minter Functions (called by the main protocol contract) ---

;; Mint new nSTX tokens
(define-public (mint (amount uint) (recipient principal))
  (begin
    (asserts! (is-eq tx-sender (as-contract contract-owner)) ERR_UNAUTHORIZED)
    (ft-mint? nstx-token amount recipient)
  )
)

;; Burn nSTX tokens
(define-public (burn (amount uint) (owner principal))
  (begin
    (asserts! (is-eq tx-sender (as-contract contract-owner)) ERR_UNAUTHORIZED)
    (ft-burn? nstx-token amount owner)
  )
)
