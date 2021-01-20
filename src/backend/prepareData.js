module.exports = rows => {
    return new Promise((resolver, reject) => {
        try{
            const words = rows
                .filter(filterValidRow)
                .map(removePontuation)
                .map(removeTags)
                .reduce(mergeRows)
                .split(' ')
                .map(word => word.toLowerCase())
                .map(word => word.replace('"', ''))

                resolver(words)
        }catch(e){
            reject(e)
        }
    })
}



function filterValidRow(row){
    const notNumber = !parseInt(row.trim())

    const notEmpty = !!row.trim() // se linha não for vazia retornará verdadeiro.

    const notInterval = !row.includes('-->')

    return notNumber && notEmpty && notInterval
}

const removePontuation = row => row.replace(/[,?!.-]/g, '')
const removeTags = row => row.replace(/(<[^>]+)>/ig, '').trim()
const mergeRows = (fullText, row) => `${fullText} ${row}`