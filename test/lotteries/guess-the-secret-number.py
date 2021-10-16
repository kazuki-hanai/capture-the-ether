import sha3

for i in range(256):
    k = sha3.keccak_256()
    k.update(i.to_bytes(1, 'big'))
    res = k.hexdigest()
    if res == 'db81b4d58595fbbbb592d3661a34cdca14d7ab379441400cbfa1b78bc447c365':
        print(i)
