require('./Devices/K2ProOutlet');
require('./Devices/K2Outlet');
require('./Devices/MiniBOutlet');
require('./Devices/MiniWOutlet');

var fs = require('fs');
var packageFile = require("./package.json");
var PlatformAccessory, Accessory, Service, Characteristic, UUIDGen;

module.exports = function(homebridge) {
    if(!isConfig(homebridge.user.configPath(), "platforms", "IkonkeOutletPlatform")) {
        return;
    }
    
    PlatformAccessory = homebridge.platformAccessory;
    Accessory = homebridge.hap.Accessory;
    Service = homebridge.hap.Service;
    Characteristic = homebridge.hap.Characteristic;
    UUIDGen = homebridge.hap.uuid;

    homebridge.registerPlatform('homebridge-ikonke-outlet', 'IkonkeOutletPlatform', IkonkeOutletPlatform, true);
}

function isConfig(configFile, type, name) {
    var config = JSON.parse(fs.readFileSync(configFile));
    if("accessories" === type) {
        var accessories = config.accessories;
        for(var i in accessories) {
            if(accessories[i]['accessory'] === name) {
                return true;
            }
        }
    } else if("platforms" === type) {
        var platforms = config.platforms;
        for(var i in platforms) {
            if(platforms[i]['platform'] === name) {
                return true;
            }
        }
    } else {
    }
    
    return false;
}

function IkonkeOutletPlatform(log, config, api) {
    if(null == config) {
        return;
    }
    
    this.Accessory = Accessory;
    this.PlatformAccessory = PlatformAccessory;
    this.Service = Service;
    this.Characteristic = Characteristic;
    this.UUIDGen = UUIDGen;
    
    this.log = log;
    this.config = config;
    this.ikonkeIO = config['ikonkeIO'];

    if (api) {
        this.api = api;
    }
    
    this.log.info("[IkonkeOutletPlatform][INFO]******************************************************************");
    this.log.info("[IkonkeOutletPlatform][INFO]          IkonkeOutletPlatform v%s By YinHang", packageFile.version);
    this.log.info("[IkonkeOutletPlatform][INFO]  GitHub: https://github.com/YinHangCode/homebridge-ikonke-outlet ");
    this.log.info("[IkonkeOutletPlatform][INFO]                                             QQ Group: 107927710  ");
    this.log.info("[IkonkeOutletPlatform][INFO]******************************************************************");
    this.log.info("[IkonkeOutletPlatform][INFO]start success...");
}

IkonkeOutletPlatform.prototype = {
    accessories: function(callback) {
        var myAccessories = [];

        var deviceCfgs = this.config['deviceCfgs'];
        if(deviceCfgs instanceof Array) {
            for (var i = 0; i < deviceCfgs.length; i++) {
                var deviceCfg = deviceCfgs[i];
                if(null == deviceCfg['type'] || "" == deviceCfg['type'] || null == deviceCfg['mac'] || "" == deviceCfg['mac'] || null == deviceCfg['ip'] || "" == deviceCfg['ip'] || null == deviceCfg['password'] || "" == deviceCfg['password']) {
                    continue;
                }

                if (deviceCfg['type'] == "k2") {
                    new K2Outlet(this, deviceCfg).forEach(function(accessory, index, arr){
                        myAccessories.push(accessory);
                    });
                } else if (deviceCfg['type'] == "k2pro") {
                    new K2ProOutlet(this, deviceCfg).forEach(function(accessory, index, arr){
                        myAccessories.push(accessory);
                    });
                } else if (deviceCfg['type'] == "mini_b") {
                    new MiniBOutlet(this, deviceCfg).forEach(function(accessory, index, arr){
                        myAccessories.push(accessory);
                    });
                } else if (deviceCfg['type'] == "mini_w") {
                    new MiniWOutlet(this, deviceCfg).forEach(function(accessory, index, arr){
                        myAccessories.push(accessory);
                    });
                } else {
                }
            }
            this.log.info("[IkonkeOutletPlatform][INFO]device size: " + deviceCfgs.length + ", accessories size: " + myAccessories.length);
        }
        
        callback(myAccessories);
    }
}
