# bitcoin-tx-splitter (Raw/Serialised Bitcoin Transaction Splitter)
Single class library that parses and splits out the composite fragments of a serialized bitcoin transaction into a TypeScript / JavaScript class. This allows developers to quickly access relevant section of transaction. The attributes of the classes are kept as serialised strings with each attribute names denoting if they are Big Endian (BE) encoded or Little-Endian (LE) encoded. Support legacy, segwit v0 and segwit v1 (taproot) Bitcoin transaction. 

This library is NOT production ready and should be used only for educational purposes at this stage. Limitations include:
- No support for inputs, outputs greater than 252. This is pending VarInt (issue #11) support.
- Coverage of testing is limited.
- Partially signed bitcoin transaction support has not been tested yet.

## Motivation
- This library exists out of a personal need to create a Taproot library, specifically functionality around Taproot Signatures. “Fragments” of a transaction are required to be placed in the message, which is signed, normally in their serialised forms. Hence the existence of this library to split out the transaction into its multiple fragment-encoded-parts.
- Provide users with the explicit encoding format of each fragment of a serialised tx, mainly if they are little or big endian encoded which can be confusing for beginners as bitcoin uses a mixture within the same serialized object.
- Aimed at beginner developers who are more comfortable with using string instead of BufferArrays which is common in more advanced Bitcoin development.

## Features
- Supports Legacy (pre-segwit), segwit transaction including upcoming taproot transaction. 
- Uses Jest for testing. See test directory for test coverage. Suggest your own through an issue or pull request.

## Class Design
This library provides a single class which represents a Raw Bitcoin Transaction (SerializedTransaction) which contains attributes which represent each significant fragment of a bitcoin transaction. These attributes are provided in raw hex form using strings. Typescript Interfaces are uses to represent composite structure within the SerializedTransaction e.g. PreviousOutput. A UML diagram is provided of the Typescript Class and Interface design.

Note how each attribute (apart from arrays) is suffixed with either ```_LE``` or ```_BE```. This indicates if the fragment is encoding in Little or Big-Endian respectively.

![alt text](./docs/serialized_transaction_uml.jpg?raw=true "SerializedTransaction Data Model (UML)")

Currently there is only a single method on this class which is ```getOutput()```, which provides a concatenation of PreviousOutput.transactionHash_LE + PreviousOutput.utxoIndex_LE. Outpoints are used as part of the message which gets signed as part of the segwit v0 and v1 (taproot) signature regimes. See BIP-0143 and BIP-0341 respectively.

## How to use

### Installation

```
npm install raw-tx-splitter
```

### Use

```Javascript
const { SerializedTransaction } = require('raw-tx-splitter');


const rawTx = "020000000001015036a4e1e299...48700000000"
const serializedTx = new SerializedTransaction(rawTx);
```

### Tests
Run current tests using. These tests use the Jest test framework.

```
npm test
```

## LICENSE [MIT](LICENSE)
