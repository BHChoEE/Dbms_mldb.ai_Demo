import sys
from random import randint
from pymldb import Connection

mldb = Connection("http://localhost:8080")

url_list = open('./url_list.txt', 'r').read().splitlines()

# url = url_list[randint(0, len(url_list) - 1)]
url = url_list[int(sys.argv[1])]

result = mldb.query("""
    SELECT scores.pred as score
    NAMED imagenet_labels.label
    FROM transpose(
        (
            SELECT flatten(inception({url: '%s'})[softmax]) as *
            NAMED 'pred'
        )
    ) AS scores

    LEFT JOIN imagenet_labels ON
        imagenet_labels.rowName() = scores.rowName()

    ORDER BY score DESC
    LIMIT 10
""" % url)

print(url)
print(str(result.index[0]))
print(str(result['score'][0]))

# with open('prediction.txt', 'w') as output_file:
#     output_file.write(url + '\n')
#     output_file.write(str(result.index[0]) + '\n')
#     output_file.write(str(result['score'][0]))
