# 項目簡介
- 線上商城demo
- 前後端分離架構
- 前端採用 create-react-app
- 後端使用 koa2+mongoose
- 主要參考 eattheblock 替換掉部屬到測試網，以及代幣種類(真實上線使用USDT)
- 後端 mongo 使用 docker-compose 快速生成
# 項目建置流程
- cd compose 
- 視情況修改一下 mongo/init-mongo.js 的帳密
- docker-compose up --force-recreate 啟動基本服務 mongo
- truffle compile
- 到 infura 申請一個 eth 節點帳號，取得 rpc endpoint
- 到 chrome 安裝 metamask 並抄下自己的私鑰
- 到 goerli 水龍頭 https://discord.com/channels/476244492043812875/719985056319406182 領取33個測試eth
- 分別進到 frontend/backend/根目錄下做 npm install
- 修改 /backend/db.js 的 db 連線位置，預設帳密為 mihael/upay123
- 修改 server.js 的 rpcEndpoint ，注意要選 wss
- 修改 truffle-config.js 的 HDWallet Provider 私鑰
- truffle migrate --network goerli --reset (部屬到goerli 測試網，合約需自行部屬，最好把 frontend/src/contract 刪掉再重新佈署)
- truffle migrate --network mainnet --reset (部屬到主網)
- node ./backend/server.js (啟動後端)
- sudo iptables -I INPUT -p tcp -m tcp --dport 4000 -j ACCEPT  開啟4000 port 對外
- 在本地增加 netsh interface portproxy add v4tov4 listenport=4000 connectaddress=虛擬機ip connectport=4000(我是用VMWare，本地localhost代理到 虛擬機ip)
- 測試連線 localhost:4000
- cd frontend ; npm start
- 訪問 localhost:3000 如果正常運行，會看到前端 metamask 視窗彈出
## 可能會碰到的錯誤
- 部屬錯誤 "Migrations" exceeded the block limit (with a gas value you set)
```解法： gas 費用調低```
-  PollingBlockTracker - encountered an error while attempting to update latest block:
```測試網會出現的連線異常，重新佈署```
