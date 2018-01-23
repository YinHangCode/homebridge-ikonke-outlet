# homebridge-ikonke-outlet
[![npm version](https://badge.fury.io/js/homebridge-ikonke-outlet.svg)](https://badge.fury.io/js/homebridge-ikonke-outlet)

HomeBridge的控客插座插件。   
   
**注: 我只有一部分设备，所以有些设备并没有亲自测试。如果有bug请提交到 [issues](https://github.com/YinHangCode/homebridge-ikonke-outlet/issues) 或 [QQ群: 107927710](//shang.qq.com/wpa/qunwpa?idkey=8b9566598f40dd68412065ada24184ef72c6bddaa11525ca26c4e1536a8f2a3d)。**   

![](https://raw.githubusercontent.com/YinHangCode/homebridge-ikonke-outlet/master/images/K2.jpg)
![](https://raw.githubusercontent.com/YinHangCode/homebridge-ikonke-outlet/master/images/K2Pro.jpg)
![](https://raw.githubusercontent.com/YinHangCode/homebridge-ikonke-outlet/master/images/MiniB.jpg)

## 支持的设备
1.K2   
2.K2 Pro   
3.K Mini Pro   

## 安装说明
1.安装HomeBridge, 可以参考文件[README](https://github.com/nfarina/homebridge/blob/master/README.md)。   
如果你是安装在树莓派里，可以参考[Running-HomeBridge-on-a-Raspberry-Pi](https://github.com/nfarina/homebridge/wiki/Running-HomeBridge-on-a-Raspberry-Pi)。   
2.确保你能在IOS设备的家庭app内搜到HomeBridge，如果不能请返回第一步。   
3.安装[ikonkeIO](https://github.com/YinHangCode/ikonkeIO)。   
4.安装本插件。
```
npm install -g homebridge-ikonke-outlet
```
## 配置说明
配置"ikonkeIO"为ikonkeIO目录下sh文件的绝度路径。   
设备的"type"、"ip"、"mac"、"password"可以通过ikonkeIO获取，具体参考[ikonkeIO](https://github.com/YinHangCode/ikonkeIO)项目。   
"outletName"配置为配件的名字。   
示例如下：   
```
"platforms": [{
    "platform": "IkonkeOutletPlatform",
    "ikonkeIO": "/home/pi/ikonkeIO/ikonkeIO.sh",
    "deviceCfgs": [{
        "type": "k2pro",
        "ip": "192.168.88.42",
        "mac": "28-d0-8a-08-79-4d",
        "password": "36629",
        "outletDisable": false,
        "outletName": "K2Pro插座"
    }, {
        "type": "k2",
        "ip": "192.168.88.43",
        "mac": "28-d0-8a-02-3f-e6",
        "password": "88663",
        "outletDisable": false,
        "outletName": "K2插座"
    }, { 
        "type": "mini_b",   
        "ip": "192.168.88.41",
        "mac": "28-d0-8a-81-77-5f",
        "password": "eA,-J=57",
        "outletDisable": false,
        "outletName": "KMiniPro插座"   
    }]
}]
```
## 版本更新记录
### 0.0.1
1.支持控制K2设备.   
2.支持控制K2 Pro设备.   
3.支持控制K Mini Pro设备.   
