# serialized-bitcoin-transaction / encoded-bitcoin-tx-splitter
Single class library and parses a serialized bitcoin transaction into a TypeScript / JavaScript class allowing you to quickly access relevant section of transaction. The attributes of the class are kept as serialised strings with the names denoting if they are Big Endian (BE) encoded or Little Endian encoding. Aim is for it to support the parsing of Legacy, Segwit v0 and Segwit v1 (Taproot) transaction

## Motivation
This library exists out of a need to create a Taproot library, specifically Taproot Signitures where details of the inputs and outputs are required within the message which is signed. These "fragments" are required to be placed in the message within there serialised forms, hence the existance of this library to split out the transaction into its multiple fragment-encoded-parts.

## Features
- Uses Jest for testing. See test directory for test coverage. Suggest your own through an issue or pull request.