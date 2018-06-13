from pymldb import Connection

mldb = Connection("http://localhost:8080")

inceptionUrl = 'http://public.mldb.ai/models/inception_dec_2015.zip'

mldb.put('/v1/functions/fetch', {
    "type": 'fetcher',
    "params": {}
})
print("done")

mldb.put('/v1/functions/inception', {
    "type": 'tensorflow.graph',
    "params": {
        "modelFileUrl": 'archive+' + inceptionUrl + '#tensorflow_inception_graph.pb',
        "inputs": 'fetch({url})[content] AS "DecodeJpeg/contents"',
        "outputs": "softmax"
    }
})
print("done")

mldb.put("/v1/procedures/imagenet_labels_importer", {
    "type": "import.text",
    "params": {
        "dataFileUrl": 'archive+' + inceptionUrl + '#imagenet_comp_graph_label_strings.txt',
        "outputDataset": {"id": "imagenet_labels", "type": "sparse.mutable"},
        "headers": ["label"],
        "named": "lineNumber() -1",
        "offset": 1,
        "runOnCreation": True
    }
})
print("done")
