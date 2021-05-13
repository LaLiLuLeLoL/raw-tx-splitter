//sizes are in byte x2
export var fragmentSizes;
(function (fragmentSizes) {
    fragmentSizes[fragmentSizes["transactionHash_LE"] = 64] = "transactionHash_LE";
    fragmentSizes[fragmentSizes["utxoIndex_LE"] = 8] = "utxoIndex_LE";
    fragmentSizes[fragmentSizes["utxoSequence_LE"] = 8] = "utxoSequence_LE";
    fragmentSizes[fragmentSizes["outputSatoshis_LE"] = 16] = "outputSatoshis_LE";
    fragmentSizes[fragmentSizes["compactSize_BE"] = 2] = "compactSize_BE";
    fragmentSizes[fragmentSizes["version_LE"] = 8] = "version_LE";
    fragmentSizes[fragmentSizes["segwitMarker_BE"] = 2] = "segwitMarker_BE";
    fragmentSizes[fragmentSizes["segwitFlag_BE"] = 2] = "segwitFlag_BE";
    fragmentSizes[fragmentSizes["noOfInputs_BE"] = 2] = "noOfInputs_BE";
    fragmentSizes[fragmentSizes["noOfOutputs_BE"] = 2] = "noOfOutputs_BE";
    fragmentSizes[fragmentSizes["noOfWitnesses_BE"] = 2] = "noOfWitnesses_BE";
    fragmentSizes[fragmentSizes["locktime_LE"] = 8] = "locktime_LE";
})(fragmentSizes || (fragmentSizes = {}));
