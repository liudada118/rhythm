export function Data(arr) {
    if(arr.length == 1){
        return 0
    }
    let res = 0
    for (let i = 1; i < arr.length; i++) {
        res += (arr[i] - arr[i - 1]) * (arr[i] - arr[i - 1])
    }
    return res / (arr.length - 1)
}


export function sum(arr){
    return arr.reduce((accumulator, currentValue) => accumulator + currentValue , 0)
}

