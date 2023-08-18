const CHANNELS_TOKEN = "";

const main = () => {
    const sheetApp = SpreadsheetApp.openById("1cROrxY3NRZQ50Yl5O2OUKzsFf54siKyr1PVHcAQ0DDM"),
        responseSheet = sheetApp.getSheetByName("表單回應 1"),
        lastResponse = sheetApp.getSheetByName("database").getRange("A1")

    let responseIndex = lastResponse.getValue() + 1 //;responseIndex=2
    let newResponse = responseSheet.getRange(`A${responseIndex}:I${responseIndex}`).getValues()[0]

    while (newResponse[0] !== "") {
        console.log(newResponse)

        UrlFetchApp.fetch(CHANNELS_TOKEN, {
            method: "post",
            contentType: "application/json",
            payload: JSON.stringify({
                "username": "2023 GDSC Core Team 表單通知",
                "content": `回覆序號：${responseIndex}，有人報名 Core Team 了 歡呼!:`,
                "embeds": [{
                    "description": `\n**簡述申請資訊**\n> ${String(newResponse[7]).replace(/\n/g, "\n> ")}\n​`,
                    "fields": [{
                            "name": "姓名",
                            "value": `${newResponse[4]}`,
                            "inline": true
                        },
                        {
                            "name": "學號",
                            "value": `${newResponse[3]}`,
                            "inline": true
                        },
                        {
                            "name": "床位",
                            "value": `${newResponse[6]}`,
                            "inline": true
                        },
                        {
                            "name": "系所",
                            "value": `${newResponse[5]}`,
                            "inline": true
                        },
                        {
                            "name": "電話號碼",
                            "value": `${newResponse[2]}`,
                            "inline": true
                        },
                        {
                            "name": "方便維修時間",
                            "value": `星期${String(newResponse[8]).match(/(?<=星期)./g).join("、")}\n​`,
                            "inline": true
                        }
                    ],
                    "url": `https://docs.google.com/spreadsheets/d/1cROrxY3NRZQ50Yl5O2OUKzsFf54siKyr1PVHcAQ0DDM/edit#gid=228193687&range=A${responseIndex}:I${responseIndex}`,
                    "title": "表單連結",
                    "timestamp": newResponse[0].toISOString(),
                    "footer": {
                        "text": "回覆時間"
                    },
                    "color": 2733814
                }]
            })
        })
        lastResponse.setValue(responseIndex++)
        newResponse = responseSheet.getRange(`A${responseIndex}:I${responseIndex}`).getValues()[0]
    }
}

function myFunction() {

}