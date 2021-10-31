export const err = [60, 60, 60, 60, 60, 60, 60, 60]
// export const initialArr = [435, 487, 481, 527, 504, 382, 457, 608]

export const dataArr = new Array(8)
export const dataArr1 = new Array(8)
// let err = 150
let initial = 0
export const initialArr = new Array(8)
export const stableArr = new Array(8)
let wsdata = []
let flag = 0
let oldArr = 0
let allInitialArr = []
export const maxArr = []
let allArr = []
let nowdataarr = []
let allnowArr = []
let minFlag = new Array(8).fill(0)


export function small(data){
    initial++
      if (initial == 1) {
        for (let i = 0; i < 8; i++) {
          initialArr[i] = data[i * 4] + 255 * data[i * 4 + 1]
        }
        for (let i = 0; i < 8; i++) {
          maxArr[i] = data[i * 4] + 255 * data[i * 4 + 1]
        }
      }
      // console.log()
      for (let i = 0; i < 8; i++) {

        dataArr[i] = data[i * 4] + 255 * data[i * 4 + 1]
        if (dataArr[i] < initialArr[i]) {
          initialArr[i] = dataArr[i]
        }
        if (dataArr[i] > maxArr[i]) {
          maxArr[i] = dataArr[i]
        }
        if (dataArr[i] < maxArr[i] - 50 && dataArr[i] > initialArr[i] + 5) {
          
          minFlag[i]++
          if (minFlag[i] / 30 == 1) {
            initialArr[i] = dataArr[i]
            minFlag[i] = 0
          }
        } else {
          minFlag[i] = 0
        }

        // if (dataArr[i] <  maxArr[i] - 50 && dataArr[i] > maxArr[i] - 5) {
        //   maxFlag[i]++
        //   if (maxFlag[i] / 20 == 1) {
        //     maxArr[i] = dataArr[i]
        //     maxFlag[i] = 0
        //   }
        // } else {
        //   maxFlag[i] = 0
        // }
        dataArr1[i] = data[i * 4] + 255 * data[i * 4 + 1] > initialArr[i] + err[i] ? 1 : 0
        nowdataarr[i] = (dataArr[i] - initialArr[i]) / (maxArr[i] - initialArr[i])
        stableArr[i] = data[i * 4] + 255 * data[i * 4 + 1] > initialArr[i] + err[i] ? data[i * 4] + 255 * data[i * 4 + 1] : 0
        // stableArr[i] = data[i * 4] + 255 * data[i * 4 + 1] > initialArr[i] + err ? data[i * 4] + 255 * data[i * 4 + 1] : 0
      }
    //   return [dataArr1,dataArr]
}