;; PoX Staking Contract in Clarity
;; Users can stake STX and withdraw their stake
;; This is a simplified version and does not implement the full PoX reward logic

(define-map stakers
  ;; key: principal (user address)
  ;; value: (staked-amount uint)
  principal uint)

(define-constant ERR_ALREADY_STAKED u100)
(define-constant ERR_NOT_STAKED u101)
(define-constant ERR_INSUFFICIENT_AMOUNT u102)

(define-public (stake)
  ;; The user sends STX along with the transaction to stake
  (let ((amount (stx-get-transfer-amount?)))
    (if (is-none amount)
        (err ERR_INSUFFICIENT_AMOUNT)
        (let ((amt (unwrap! amount (err ERR_INSUFFICIENT_AMOUNT))))
          (if (map-get? stakers tx-sender)
              (err ERR_ALREADY_STAKED)
              (begin
                ;; store the staked amount
                (map-set stakers tx-sender amt)
                ;; transfer STX from user to this contract
                (ok (stx-transfer? amt tx-sender (as-contract tx-sender)))))))))


(define-public (withdraw)
  ;; Allow the user to withdraw their stake
  (let ((stake-entry (map-get? stakers tx-sender)))
    (match stake-entry
      entry
      (begin
        (map-delete stakers tx-sender)
        ;; send back the staked STX
        (ok (stx-transfer? (get amount entry) (as-contract tx-sender) tx-sender)))
      (err ERR_NOT_STAKED))))

;; Read-only function to get staked amount of a user
(define-read-only (get-stake (user principal))
  (default-to u0 (get amount (map-get? stakers user))))
