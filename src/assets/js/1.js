export class obj{
    constructor(){
        this.mixFlag = new Array(8).fill(0)
        this.maxFlag = new Array(8).fill(0)
        this.initialArr = new Array(8).fill(0)
        this.maxArr = new Array(8).fill(0)
        this.err = 50
        this.nowdataarr = new Array(8).fill(0)
    }
    app(dataArr) {
        // let initialArr = new Array(8).fill(0), maxArr = new Array(8).fill(0)
        for (let i = 0; i < dataArr.length; i++) {
    
    
            if (dataArr[i] < this.initialArr[i]) {
                this.initialArr[i] = dataArr[i]
            }
            if (dataArr[i] > maxArr[i]) {
                this.maxArr[i] = this.dataArr[i]
            }
            if (dataArr[i] < this.maxArr[i] - 50 && dataArr[i] > this.initialArr[i] + 5) {
                // console.log(initialArr[i], dataArr[i], minFlag)
                this.minFlag[i]++
                if (this.minFlag[i] / 20 == 1) {
                    this.initialArr[i] = dataArr[i]
                    this.minFlag[i] = 0
                }
            } else {
                this.minFlag[i] = 0
            }
    
            if (dataArr[i] > this.initialArr[i] + 50 && dataArr[i] < this.maxArr[i] - 5) {
                this.maxFlag[i]++
                if (this.maxFlag[i] / 20 == 1) {
                    this.maxArr[i] = dataArr[i]
                    this.maxFlag[i] = 0
                }
            } else {
                this.maxFlag[i] = 0
            }
            dataArr1[i] = dataArr[i] > this.initialArr[i] + this.err ? 1 : 0
            this.nowdataarr[i] = (dataArr[i] - this.initialArr[i]) / (this.maxArr[i] - this.initialArr[i])
            // stableArr[i] = data[i * 4] + 255 * data[i * 4 + 1] > initialArr[i] + err ? data[i * 4] + 255 * data[i * 4 + 1] : 0
        }
    }
    
}


function app(dataArr) {
    let initialArr = new Array(8).fill(0), maxArr = new Array(8).fill(0)
    for (let i = 0; i < dataArr.length; i++) {


        if (dataArr[i] < initialArr[i]) {
            initialArr[i] = dataArr[i]
        }
        if (dataArr[i] > maxArr[i]) {
            maxArr[i] = dataArr[i]
        }
        if (dataArr[i] < maxArr[i] - 50 && dataArr[i] > initialArr[i] + 5) {
            console.log(initialArr[i], dataArr[i], minFlag)
            minFlag[i]++
            if (minFlag[i] / 20 == 1) {
                initialArr[i] = dataArr[i]
                minFlag[i] = 0
            }
        } else {
            minFlag[i] = 0
        }

        if (dataArr[i] > initialArr[i] + 50 && dataArr[i] < maxArr[i] - 5) {
            maxFlag[i]++
            if (maxFlag[i] / 20 == 1) {
                maxArr[i] = dataArr[i]
                maxFlag[i] = 0
            }
        } else {
            maxFlag[i] = 0
        }
        dataArr1[i] = data[i * 4] + 255 * data[i * 4 + 1] > initialArr[i] + err ? 1 : 0
        nowdataarr[i] = (dataArr[i] - initialArr[i]) / (maxArr[i] - initialArr[i])
        // stableArr[i] = data[i * 4] + 255 * data[i * 4 + 1] > initialArr[i] + err ? data[i * 4] + 255 * data[i * 4 + 1] : 0
    }
}