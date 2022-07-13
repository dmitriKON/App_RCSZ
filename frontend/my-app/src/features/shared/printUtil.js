import print from 'print-js'

export const printResults = (data) => {
    print({
	    printable: data,
        properties: Object.keys(data[0]),
	    type: 'json'
    })
}