# celo-dice-roll-sdk

TypeScript SDK for reading the Celo Dice Roll contract from Celo mainnet.

```ts
import { CeloDiceRollClient } from "celo-dice-roll-sdk";

const client = new CeloDiceRollClient({
  contractAddress: "0x943DfC4aFe76B2042031556516799ba03396B3F3",
});

const totalRolls = await client.getTotalRolls();
```
