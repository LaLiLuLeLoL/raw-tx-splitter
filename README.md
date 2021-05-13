# raw-tx-splitter (Raw/Serialized Bitcoin Transaction Splitter)
Single class library that parses and splits out the component fragments of a serialized bitcoin transaction into a TypeScript / JavaScript class. This allows developers to quickly access relevant section of transaction. The attributes of the classes are kept as serialised strings with each attribute names denoting if they are Big Endian (BE) encoded or Little-Endian (LE) encoded. Support legacy, segwit v0 and segwit v1 (taproot) Bitcoin transaction.

## Example use

```Javascript
const { SerializedTransaction } = require('raw-tx-splitter');


const rawTx = "020000000001015036a4e1e299...48700000000"
const serializedTx = new SerializedTransaction(rawTx);
//  => {
//         version_LE: '02000000',
//         segwitMarker_BE: '00',
//         segwitFlag_BE: '01',
//         noOfInputs_BE: '01',
//         inputs: [
//           {
//             transactionHash_LE: '5036a4e1e299b37e0555d1490aa8cb6de379709349088159a5280e13892c74e9',
//             utxoIndex_LE: '00000000',
//             utxoScriptSigSizePrefix_BE: '00',
//             utxoSequence_LE: 'feffffff'
//           }
//         ],
//         noOfOutputs_BE: '02',
//         outputs: [
//           {
//             outputSatoshis_LE: '8096980000000000',
//             outputScriptPubkeySizePrefix_BE: '22',
//             outputScriptPubkey_BE: '5120f128a8a8a636e19f00a80169550fedfc26b6f5dd04d935ec452894aad938ef0c'
//           },
//           {
//             outputSatoshis_LE: 'e75a6d2901000000',
//             outputScriptPubkeySizePrefix_BE: '16',
//             outputScriptPubkey_BE: '0014cfb604b3feadf3367e96c701abd4912d0c99877f'
//           }
//         ],
//         witnessesOfInputs: [
//           {
//             noOfWitnesses_BE: '02',
//             witnesses: [
//               {
//                 witnessSizePrefix_BE: '47',
//                 witness_BE: `304402206c4c1c9e2fa82d087e5c1a6256f2bcd7cab3b915bf2f6b782a80045f9dc7a9b20
//                              22034c720cbbab2e75cbd8a35bc99d148f408b16205592e80200bf2f491bb0fa88b01`
//               },
//               {
//                 witnessSizePrefix_BE: '21',
//                 witness_BE: '02077c102914911f57b8c1881e207ea09297024803e1c10ce3f20453c2c3f735c6'
//               }
//             ]
//           }
//         ],
//         locktime_LE: '0d000000'
// }
```
See the test directories instance data for more examples.

## Caveats
This library is NOT production ready and should be used only for educational purposes at this stage. Limitations include:
- No support for inputs, outputs greater than 252. This is pending VarInt (issue #11) support.
- Coverage of testing is limited.
- Partially signed bitcoin transaction support has not been tested yet.
- Limited input error handling, meaning that if the raw transaction you are passing into the constructor is malformed, then the instantiated object is likely to be odd.

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

### Use (node.js)

```Javascript
const { SerializedTransaction } = require('raw-tx-splitter');


const rawTx = "020000000001015036a4e1e299...48700000000"
const serializedTx = new SerializedTransaction(rawTx);
```

### Tests
Run current tests using:

```
npm test
```
These tests use the Jest test framework.

## LICENSE [MIT](LICENSE)
