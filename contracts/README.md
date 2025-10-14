# Node Protocol Clarity Contracts

This directory contains the Clarity smart contracts for the Node Protocol.

- `nstx-token.clar`: The fungible token definition for `nSTX`.
- `node-protocol-v1.clar`: The main protocol contract for liquid and node staking.

## How to Deploy

Deploying these contracts requires the Stacks development tool, `clarinet`, and a Stacks wallet.

### 1. Install Clarinet

First, you need to install the `clarinet` command-line interface (CLI). This tool is used to test, debug, and deploy Clarity contracts.

Follow the installation instructions from the official Stacks documentation:
[**Install Clarinet**](https://docs.stacks.co/clarity/install-clarinet)

### 2. Set Up a Stacks Wallet

You'll need a Stacks-compatible wallet to manage your addresses and sign deployment transactions. The Hiro Wallet is a popular choice for developers.

- [**Install Hiro Wallet**](https://www.hiro.so/wallet) (available as a browser extension)
- Once installed, create or import an account.
- For testing, switch the network in your wallet to **Testnet**.
- Use the [**Stacks Testnet Faucet**](https://faucet.stacks.co/) to get free test STX tokens sent to your wallet's Testnet address. You will need these to pay for the deployment transaction fees.

### 3. Initialize a Clarinet Project

While the contracts are in your Next.js project, it's best to manage them within a dedicated Clarinet project.

1.  **Create a new directory** for your contracts outside of your current app structure.
    ```bash
    mkdir node-protocol-contracts
    cd node-protocol-contracts
    ```

2.  **Initialize Clarinet**:
    ```bash
    clarinet new .
    ```
    This will create a `clarinet` directory, a `contracts` directory, and a `tests` directory.

3.  **Move the Contracts**: Copy `nstx-token.clar` and `node-protocol-v1.clar` from *this* project's `contracts` folder into the `contracts` folder of your *new* `node-protocol-contracts` project.

4.  **Add a `nft-trait.clar`**: The `nstx-token.clar` contract uses a standard trait. Create a file named `traits.clar` in the `contracts` folder and add the following content:
    ```clarity
    ;; traits.clar

    (define-trait sip-010-ft-standard
      ((get-balance (principal) (response uint uint))
       (get-name () (response (string-ascii 64) uint))
       (get-symbol () (response (string-ascii 32) uint))
       (get-decimals () (response uint uint))
       (get-total-supply () (response uint uint))
       (get-token-uri () (response (optional (string-utf8 256)) uint))
       (transfer (uint principal principal (optional (buff 34))) (response bool uint))
       (mint (uint principal) (response bool uint))
       (burn (uint principal) (response bool uint))))
    ```
    Now, update `nstx-token.clar` to use it by changing the first line from:
    `(impl-trait '<nstx-token-ft-trait>)`
    to:
    `(impl-trait .traits.sip-010-ft-standard)`

### 4. Configure the Deployment

Open the `clarinet/settings/Testnet.toml` file in your new project. You need to define the deployment plan here.

First, deploy the token, then the protocol contract. It should look like this:

```toml
[deployment.default]
plan = "deploy"
transactions = [
  # 1. Deploy the nSTX token
  { transaction = "smart_contract", contract = "nstx-token" },

  # 2. Deploy the main protocol, passing the nSTX token's address
  { transaction = "smart_contract", contract = "node-protocol-v1" },
]
```

### 5. Run the Deployment

Now you're ready to deploy.

1.  **Check Syntax**: Make sure your contracts are valid.
    ```bash
    clarinet check
    ```

2.  **Deploy to Testnet**: This command will guide you through the deployment process, asking you to select your wallet account and confirm the transactions.
    ```bash
    clarinet integrate
    ```
    The `integrate` command simulates the deployment and provides a web interface to connect your wallet and execute the transactions on the Testnet.

### 6. Update the Main Contract

After the `nstx-token` contract is deployed, it will have a permanent address on the blockchain (e.g., `ST1...nstx-token`).

You must update `node-protocol-v1.clar` with this address.

1.  Find the line:
    ```clarity
    (use-trait nstx-token-trait '<nstx-token-ft-trait>)
    ```
2.  Change it to use the principal of your deployed token contract and the trait path:
    ```clarity
    (use-trait nstx-token-trait .traits.sip-010-ft-standard)
    (define-constant nstx-token-address 'ST1...nstx-token) ;; <--- REPLACE WITH YOUR DEPLOYED TOKEN ADDRESS
    ```

3. **Re-deploy `node-protocol-v1`** using `clarinet integrate` again.

You have now successfully deployed your contracts to the Stacks Testnet! You can follow a similar process for Mainnet deployment when you are ready.
