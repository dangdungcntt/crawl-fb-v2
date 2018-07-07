# Crawl FB V2

Simple script to detect email and phone from facebook comment.

## Installation

```bash
git clone https://github.com/dangdungcntt/crawl-fb-v2.git
cd crawl-fb-v2
npm install
cp .env.sample .env
mkdir data
```

  * Update your `ACCESS_TOKEN` in `.env`
```bash
ACCESS_TOKEN=<ACCESS_TOKEN>
```


## Usage

  * `post_id` format: `<PAGE_ID|GROUP_ID>_<POST_ID>`
  * Your data will place in `data` directory
  * Add `post_id` to `listPostID.json` and `node getComment.js`

  * Or
```bash
node getComment.js [post_id_1] [post_id_2] [post_id_...]
```
