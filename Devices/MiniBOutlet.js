require('./Base');

const inherits = require('util').inherits;
var spawnSync = require('child_process').spawnSync;

var Accessory, PlatformAccessory, Service, Characteristic, UUIDGen;

MiniBOutlet = function(platform, config) {
    this.init(platform, config);

    Accessory = platform.Accessory;
    PlatformAccessory = platform.PlatformAccessory;
    Service = platform.Service;
    Characteristic = platform.Characteristic;
    UUIDGen = platform.UUIDGen;
    
    this.device = {
        ip: this.config['ip'],
        mac: this.config['mac'],
        passwd: this.config['password']
    };
    
    this.accessories = {};
    if(!this.config['outletDisable'] && this.config['outletName'] && this.config['outletName'] != "") {
        this.accessories['outletAccessory'] = new MiniBOutletOutletAccessory(this);
    }
    var accessoriesArr = this.obj2array(this.accessories);
    
    this.platform.log.debug("[IkonkeOutletPlatform][DEBUG]Initializing " + this.config["type"] + " device: " + this.config["ip"] + ", accessories size: " + accessoriesArr.length);
    
    return accessoriesArr;
}
inherits(MiniBOutlet, Base);

MiniBOutletOutletAccessory = function(dThis) {
    this.device = dThis.device;
    this.name = dThis.config['outletName'];
    this.platform = dThis.platform;
}

MiniBOutletOutletAccessory.prototype.getServices = function() {
    var services = [];

    var infoService = new Service.AccessoryInformation();
    infoService
        .setCharacteristic(Characteristic.Manufacturer, "ikonke")
        .setCharacteristic(Characteristic.Model, "K Mini Pro")
        .setCharacteristic(Characteristic.SerialNumber, this.device['mac']);
    services.push(infoService);
    
    var outletService = new Service.Outlet(this.name);
    outletService
        .getCharacteristic(Characteristic.On)
        .on('get', this.getPower.bind(this))
        .on('set', this.setPower.bind(this));
    outletService
        .getCharacteristic(Characteristic.OutletInUse)
        .on('get', this.getOutletInUse.bind(this));
    services.push(outletService);

    return services;
}

MiniBOutletOutletAccessory.prototype.getOutletInUse = function(callback) {
    var that = this;
    var process = spawnSync("sh", [that.platform.ikonkeIO, '-C', "mini_b", that.device.ip, that.device.mac, that.device.passwd, "getRelay"]);
    var stdoutInfo = process.stdout.toString().replace(/[\n]/g, "");
    that.platform.log.debug("[IkonkeOutletPlatform][DEBUG]MiniBOutlet - Outlet - getOutletInUse: " + stdoutInfo);
    if(stdoutInfo === "open") {
        callback(null, true);
    } else if(stdoutInfo === "close") {
        callback(null, false);
    } else {
        callback(new Error(stdoutInfo));
    }
}

MiniBOutletOutletAccessory.prototype.getPower = function(callback) {
    var that = this;
    var process = spawnSync("sh", [that.platform.ikonkeIO, '-C', "mini_b", that.device.ip, that.device.mac, that.device.passwd, "getRelay"]);
    var stdoutInfo = process.stdout.toString().replace(/[\n]/g, "");
    that.platform.log.debug("[IkonkeOutletPlatform][DEBUG]MiniBOutlet - Outlet - getPower: " + stdoutInfo);
    if(stdoutInfo === "open") {
        callback(null, true);
    } else if(stdoutInfo === "close") {
        callback(null, false);
    } else {
        callback(new Error(stdoutInfo));
    }
}

MiniBOutletOutletAccessory.prototype.setPower = function(value, callback) {
    var that = this;
    var process = spawnSync("sh", [that.platform.ikonkeIO, '-C', "mini_b", that.device.ip, that.device.mac, that.device.passwd, "setRelay", value ? "open" : "close"]);
    var stdoutInfo = process.stdout.toString().replace(/[\n]/g, "");
    that.platform.log.debug("[IkonkeOutletPlatform][DEBUG]MiniBOutlet - Outlet - setPower: " + stdoutInfo);
    if(stdoutInfo === "success") {
        callback(null);
    } else {
        callback(new Error(stdoutInfo));
    }
}
