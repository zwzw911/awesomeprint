/**
 * Created by 张伟 on 2017/12/22.
 */
'use strict'
const chalk=require('chalk')

function print(prompt='value is',value,inJSON=true,color='white'){
    let separator
    if(undefined!==value){
        separator=` =====================> `
    }
    if(true===inJSON){
        if(undefined!==value){
            console.log(chalk[color](`${prompt}${separator}${JSON.stringify(value)}`))
        }else{
            console.log(chalk[color](`${prompt}`))
        }

    }else{
        if(undefined!==value){
            console.log(`${prompt}${separator}${value}`)
        }else{
            console.log(`${prompt}`)
        }

    }

}


function inf(prompt,value,inJSON=true){
    let prefix=`INF: `
    let color='green'
    print(prefix+prompt,value,inJSON,color)
}


function wrn(prompt,value,inJSON=true){
    let prefix=`WRN: `
    let color='yellow'
    print(prefix+prompt,value,inJSON,color)
}

function err(prompt,value,inJSON=true){
    let prefix=`ERR: `
    let color='red'
    print(prefix+prompt,value,inJSON,color)
}

/*****************************************/
/**     打印提示性文本，例如本提示     **/
/*****************************************/
function title(title,color='white'){
    let seperateChar='='
    let maxLengthPerLine=90 //每行最大字符数
    let assistPrefix='====    '
    let assistSuffix='    ===='
    let space=' '

    let minAssistCharLength=assistPrefix.length+assistSuffix.length //每行最小辅助字符（例如/*** ***/，或者==== ====，不包含空白和字符）

    let maxAvailableCharlength=maxLengthPerLine-minAssistCharLength //打印内容的长度，包括空白和内容字符

    //计算需要几行
    let needLineNum=1       //默认需要一行

    if(title.length>maxAvailableCharlength){
        needLineNum=Math.ceil(title.length/maxAvailableCharlength)
    }
    //如果行数为1，需要计算padding的空白，以便内容居中
    if(1===needLineNum){
        //需要的空白总数=200-minAssistCharLength-title.length
        let totalSpaceLength=maxLengthPerLine-minAssistCharLength-title.length
        inf('totalSpaceLength',totalSpaceLength)
        //需要padding的空白总数是否为偶数
        let ifEven=(0===totalSpaceLength%2)

        //开始打印
        //打印分割行
        console.log(chalk[color](seperateChar.repeat(maxLengthPerLine)))
        //打印内容行
        if(true===ifEven){
            console.log(chalk[color](assistPrefix+space.repeat(totalSpaceLength/2)+title+space.repeat(totalSpaceLength/2)+assistSuffix))
        }else{
            console.log(chalk[color](assistPrefix+space.repeat(Math.ceil(totalSpaceLength/2))+title+space.repeat(Math.floor(totalSpaceLength/2))+assistSuffix))
        }

        console.log(chalk[color](seperateChar.repeat(maxLengthPerLine)))
        return
    }

    if(1<needLineNum){
        console.log(chalk[color](seperateChar.repeat(maxLengthPerLine)))
        console.log(chalk[color](seperateChar.repeat(maxLengthPerLine)))

        for(let lineNum=0;lineNum<needLineNum;lineNum++){
            //计算每行的起始/结束的字符index
            let shouldStartIdx=lineNum*maxAvailableCharlength
            let shouldEndIdx=(lineNum+1)*maxAvailableCharlength  //此处不甚明了，为何不是减去1，得到index

            let printContent
            //当前行结束index小于整个打印内容的index，说明并未打印到最后一行，则只打印字符内容
            if(shouldEndIdx<title.length-1){
                printContent=title.slice(shouldStartIdx,shouldEndIdx)
            }else{
               //打印最后一行，计算需要补齐多少空白
               let paddingSpaceNum=shouldEndIdx-(title.length) //此处不甚明了，为何title.length不是减去1，得到index
                printContent=title.slice(shouldStartIdx,shouldEndIdx)+space.repeat(paddingSpaceNum)
            }

            console.log(chalk[color](assistPrefix+printContent+assistSuffix))
        }

        console.log(chalk[color](seperateChar.repeat(maxLengthPerLine)))
        console.log(chalk[color](seperateChar.repeat(maxLengthPerLine)))
    }
}
module.exports={
    print,
    inf,
    wrn,
    err,
    title,
}

/*
let a={b:1}
inf('test result is ')
inf('value result is', a)
wrn('test result is ')
wrn('value result is', a)
err('test result is ')
err('value result is', a)*/

// title('asdfasdfasdf'.repeat(10))
