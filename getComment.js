require('dotenv').config();

const fs = require('fs');
const FB = require('./libs/FB');
const Regex = require('./libs/Regex');
const ACCESS_TOKEN = process.env.ACCESS_TOKEN;

let paramPostID = process.argv[2];
let paramFileName = process.argv[3] || paramPostID;

let listPosts = process.argv.slice(2, process.argv.length);

if (fs.existsSync('./listPostID.json')) {
    listPosts = listPosts.concat(require('./listPostID.json'));
}

listPosts.forEach(async postID => {

    console.log(`PROCESSING: ${postID}`);

    let graphUrl = `https://graph.facebook.com/v3.0/${postID}/comments?fields=message,from&limit=500&access_token=${ACCESS_TOKEN}`;
    let rawData = await FB.graphAll(graphUrl);

    console.log(`CRAWLED   : ${postID}`);

    if (rawData.error) {
        console.log(rawData.error);
        return;
    }

    let listComment = rawData.data;
    fs.writeFileSync(`./data/${postID}_raw.json`, JSON.stringify(listComment));

    console.log(`DETECTING : ${postID}`);

    let listData = listComment
        .reduce((res, comment) => {
            let phone = Regex.getPhone(comment.message);
            let email = Regex.getEmail(comment.message);

            if (phone || email) {
                res.push({
                    phone: phone,
                    email: email,
                    from: comment.from
                });
            }

            return res;
        }, []);
    fs.writeFileSync(`./data/${postID}.json`, JSON.stringify(listData));

    console.log(`DONE      : ${postID}`);
});