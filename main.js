const POST_URL = "WEBHOOK URL";

function onSubmit(e) {
    const response = e.response.getItemResponses();
    let items = [];

    for (const responseAnswer of response) {
        const question = responseAnswer.getItem().getTitle();
        const answer = responseAnswer.getResponse();
        let parts = []

        try {
            parts = answer.match(/[\s\S]{1,1024}/g) || [];
        } catch (e) {
            parts = answer;
        }

        if (!answer) {
            continue;
        }

        for (const [index, part] of Object.entries(parts)) {
            if (index == 0) {
                items.push({
                    "name": question,
                    "value": part,
                    "inline": false
                });
            } else {
                items.push({
                    "name": question.concat(" (cont.)"),
                    "value": part,
                    "inline": false
                });
            }
        }
    }

    const options = {
        "method": "post",
        "headers": {
            "Content-Type": "application/json",
        },
        "payload": JSON.stringify({
            "content": "‌有人填表單啦！記得安排時間面試",
            "embeds": [{
                "title": "表單連結",
                "url": 'https://docs.google.com/spreadsheets/d/1FWF_r4n4kSYRK_pPVo_IAReQHq3ZgsrXgqXxTei-HW8/edit?resourcekey#gid=112893270',
                "color": 33023, // This is optional, you can look for decimal colour codes at https://www.webtoolkitonline.com/hexadecimal-decimal-color-converter.html
                "timestamp": new Date().toISOString(),
                "footer": {
                  "text": "回覆時間"
                },
            }]
        })
    };

    UrlFetchApp.fetch(POST_URL, options);
};
