let _ = require('lodash')
import {AsyncStorage} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
import {Platform} from 'react-native';
import EventEmitter from 'events';

export default class DataManager {

    static myInstance = null;

    _data = [];
    _countryIndexName = [];
    _total =[];

    data = {};
    country = {};
    region = {};
    fullDataLength = 0;
    byGlassDataLength = 0;
    halfOffDataLength = 0;
    bestDataLength = 0;

    sourceData = 'local';
    mapWineIdGrapeName = null;
    emitter = null;
    constructor(){
        this.emitter = new EventEmitter();
        console.log('launch data manager constructor !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
        AsyncStorage.getItem('@ipad:upadted', (error, result) => {
             if(result == null && error == null){
                AsyncStorage.setItem('@ipad:upadted', 'false', error => {
                    if(error) throw 'error while setting async parameter';
                });
             }

             if(result == 'false' || result == null ){
                this.sourceData = 'local';
             }else{
                 this.sourceData = 'downloaded';
             }
        });
        this._initData('half');
        // let dirs  = RNFetchBlob.fs.dirs;
        // var imageDir = (Platform.OS === 'ios') ? dirs.DocumentDir : '' + dirs.DocumentDir;
        // console.log('/data/user/0/com.wine/files/20190414223211.jpg');
        //  RNFetchBlob.fs.unlink('/data/user/0/com.wine/files/20190414223211.jpg').then(() => {
        //                console.log('deleted');                  
        //  }).catch(err => {
        //      console.log(err);
        //     console.log('error while deleting ');
        // })
    }


    getWineWithNewImage(newData, oldData){
        var arrOld = _.map(oldData,'path');
        var arrNew = _.map(newData, 'path');
        arrOld = arrOld.map(path => {
            if(path.indexOf('/')> -1){
                return path.substring(path.lastIndexOf('/')+1, path.length);
            }else{
                return path;
            }
        });
        var imagesToAdd =  _.difference(arrNew,arrOld);
        return _.filter(newData, n => imagesToAdd.indexOf(n.path) > -1 );
    }

    getUnusedImagePath(newData, oldData){
        var arrOld = _.map(oldData,'path');
        var arrNew = _.map(newData, 'path');
        arrOld = arrOld.map(path => {
            if(path.indexOf('/')> -1){
                return path.substring(path.lastIndexOf('/')+1, path.length);
            }else{
                return path;
            }
        });
        var imagesToAdd =  _.difference(arrOld,arrNew);
        return _.filter(newData, n => imagesToAdd.indexOf(n.path) > -1 );
    }

    async  _initData(viewType){

        var s = await this.getDataFromSource();

       // var viewTypes = ['full','glass','best','half'];

        var c = s.ipad_countries;
        var m = [];
        this._total[viewType] = 0; 

        var main =[];
        main.push({type:'MenuHeader'});
        main.push({type:'ChampagneHeader'});

        c.forEach(e =>{
            let s = [e.id,e.name];
            m.push(s);
        })

        var dico = new Map(m);

        var m = [];

        var rg = s.ipad_regions;

        rg.forEach( e =>{
            let s = [e.id,e.name];
            m.push(s);
        })

        var dicoRegion = new Map(m);

        s= s.ipad_wines;

        s= _.filter(s, p => p.available == '1');

        s= s.map(e => {
            e.country = dico.get(e.country_id);
            e.region = dicoRegion.get(e.region_id);
            e.topRegion = dicoRegion.get(e.top_region_id);
            return e;
        });

        s = _.groupBy(s, 'type');
        var types = ['CHAMPAGNE','RED','WHITE','ROSE','SWEET'];


        for(var i=0; i<types.length; i++){
            var data = s[types[i]];
            this._countryIndexName[types[i]] = [];
            data = _.groupBy(data, 'country');
            var countryKey = _.keys(data);
            countryKey = _.sortBy(countryKey);

            if(i != 0){
                main.push({type:'TypeTitle',data:types[i]});
            }

            countryKey.forEach(country =>{
                //console.log(data[country]);return;
                var rows = [];

                if(viewType == 'full'){
                    rows = data[country];
                }else if(viewType == 'glass'){
                    rows = _.filter(data[country], rw => rw.byglass == '1');
                }else if(viewType == 'best'){
                    rows = _.filter(data[country], rw => rw.best == '1');
                }else if(viewType == 'half'){
                    rows = _.filter(data[country], rw =>rw.promotion == '1');
                }


                if(rows.length > 0){

                    this._countryIndexName[types[i]].push([main.length,country]);
                    main.push({type:'CountryTitle',data:country});
                        rows.forEach(row =>{
                            main.push({type:'Row',data:row});
                            this._total[viewType] = this._total[viewType] +1;
                        })
                }
            })
        }

        this._data[viewType] = main;

}





    getImageSource(path){
        //console.log('syx');
        //console.log(path);
        var result = {};
        if(path.indexOf('/') > -1){
           // path = '/data/user/0/com.wine/files/20190414223211.jpg';
           
            result = { uri : Platform.OS === 'android' ? 'file://' + path  : path }
            //return { uri : Platform.OS === 'android' ? 'file://' + path  : '' + path } ok
        }else{
            result = {uri: Platform.OS === 'android' ? 'asset:/1002.jpg':path.replace('.JPG','.jpg')};
        }
        console.log(result);
        return result;
    }

    resolveIconSourceForType(type){
        if(type == 'RED'){
            return require('../img/cone-red.png')
        }else if(type == 'WHITE'){
            return require('../img/cone-white.png');
        }else if(type == 'ROSE'){
            return require('../img/cone-rose.png');
        }else if(type == 'SWEET'){
            return require('../img/cone-sweet.png');
        }else if(type == 'CHAMPAGNE'){
            return require('../img/cone-champagne.png');
        }
    }

   sendMessageToUi(id,text){
    var message = {};
    message.text = text;
    message.text = text;
    this.emitter.emit('status', message);
   }

   async update(cb){
         fetch('http://mmbund.com/surgery/index.php/ipadjson')
        .then((response) => response.json())
        .then((responseJson) => {
            var id = 0;

            id++;
            this.sendMessageToUi(id,'Get response from server');

             this.getDataFromSource().then(oldData =>{
                var itemWithImageToDownload =  this.getWineWithNewImage(responseJson.ipad_wines, oldData.ipad_wines);
                var pathOfImageToDelete = this.getUnusedImagePath(responseJson.ipad_wines, oldData.ipad_wines);
                var total = itemWithImageToDownload.length;
                var currentDownloaded = 0;

            if(itemWithImageToDownload.length != 0){
                id++;
                this.sendMessageToUi(id,'Downloading new image');

                itemWithImageToDownload.forEach( e => {

                id++;    
                this.sendMessageToUi(id+e.path,'Downloading '+e.path);

                    this.downloadImage(e.path, path => {
                               
                        console.log('finished download path is '+path);
                        e.path = path;
                        currentDownloaded = currentDownloaded +1;

                        id++;

                        this.sendMessageToUi(id+path.substr(path.length-6),'Finished downloading to '+path+', '+currentDownloaded+'/'+total);

                        if(currentDownloaded == total){
                            console.log('all downloaded, persisting');

                            id++;    
                            this.sendMessageToUi(id,'All new image downloaded ');
    

                            AsyncStorage.setItem('@ipad:data', JSON.stringify(responseJson) , error => {
                                if(error) throw 'error while storing downloaded json';
                                console.log('SCRIPT END HERE');
                                
                            AsyncStorage.setItem('@ipad:upadted','true', error => { 
                                if(error) throw 'error while setting updated status'+error;
                                this.sourceData = 'updated';
                            })
                            });
                            console.log('SCRIPT END HERE, deleting unused image in storage');
                            //delete unused image in path here
                            if(pathOfImageToDelete.length > 0){

                                id++;    
                                this.sendMessageToUi(id,'Deleting unused image');
                                total = pathOfImageToDelete.length ;
                                var currentDeleted = 0;
                                pathOfImageToDelete.forEach(e =>{
                                    id++;    
                                    this.sendMessageToUi('Deleting '+e);
                                  

                                    RNFetchBlob.fs.unlink(e).then(() => {
                                        id++;    
                                        this.sendMessageToUi('Deleted '+e);

                                        currentDeleted++;
                                        if(currentDeleted == total){
                                            id++;    
                                            this.sendMessageToUi(id,'UPDATED SUCCESSFULLY ');   
                                            cb(true);
                                        }

                                          }).catch(err => {
                                            id++;    
                                            this.sendMessageToUi('Error while deleting '+err);
                                          })
                                });

                            }else{
                                id++;    
                                this.sendMessageToUi(id,'UPDATED SUCCESSFULLY '); 
                                cb(true);   
                            }
            

                        }
                    });
                });

        }else{
            //meme ensemble de fichier image pour origine available et local, ne necessite pas de mise a jour
                    alert('Application is already up to date');
                    cb(true);
            }
             });

        })
        .catch((error) => {
          console.error(error);
          cb(true);
        });


    }


    async getDataFromSource(){
        if(this.sourceData == 'local'){
            return require('../jsonData/ipadjson.json');
        }else{
            let value = await AsyncStorage.getItem('@ipad:data');
            console.log('source on updated');
            return JSON.parse(value);
        }
    }




    countryNamesIn(type){       
        var result = Object.getOwnPropertyNames(this.data[type]);
        result = result.map(e => this.countryById(e));
        return result.sort();
    }

    

    filterDataTypeForView(view, type){
        var keys = Object.getOwnPropertyNames(this.data[type]);
        var res = {};
        res = _.clone(this.data[type]);
        keys.forEach(key => {
            if(view == 'byglass'){
                res[key] = _.filter(this.data[type][key], e => e.byglass == 1);
            }
            if(view == 'promotion'){
                res[key] = _.filter(this.data[type][key], e => e.promotion == 1);
            }
            if(view == 'best'){
                res[key] = _.filter(this.data[type][key], e => e.best == 1);
            }
        });
        return res;
    }

    async filterDataViewByGlass(){
        let jsonData = await this.getDataFromSource();
        var dataByglass = _.filter(jsonData.ipad_wines, e => e.available == '1' && e.byglass == '1');
        this.byGlassDataLength = dataByglass.length;
    }

    async filterDataViewHalfOff(){
        let jsonData = await this.getDataFromSource();
        var dataHalfoff = _.filter(jsonData.ipad_wines, e => e.available == '1' && e.promotion == '1');
        this.halfOffDataLength = dataHalfoff.length;
    }

    async filterDataViewBestOf(){
        let jsonData = await this.getDataFromSource();
        var dataBest = _.filter(jsonData.ipad_wines, e => e.available == '1' && e.best == '1');
        this.bestDataLength = dataBest.length;
    }


    sortFunction(a,b){
        if(this.countryById(a) < this.countryById(b)){
                return -1;
        }else if(this.countryById(a) > this.countryById(b)){
                return 1;
        }
        return 0;
    }

    async organizeData(){
        let jsonData = await this.getDataFromSource();
        this.data = _.filter(jsonData.ipad_wines, e => e.available == '1');
        this.fullDataLength = this.data.length;
        this.data = _.groupBy(this.data, 'type');
        var keys = Object.getOwnPropertyNames(this.data);
        keys.forEach(key => {
            this.data[key] = _.groupBy(this.data[key], 'country_id');
        });        

        let dataGrape = jsonData.ipad_grapes;
        let dataJoin = jsonData.ipad_winesgrapes; 

        let mapDataGrapeArray = [];
        let mapDataArray = [];

        let mapGrape =null;
        let mapData = null;

        dataGrape.forEach(e =>{
            mapDataGrapeArray.push([e.id,e.name]);
        });
        mapGrape = new Map(mapDataGrapeArray);

        dataJoin.forEach(e => {
            mapDataArray.push([e.wine_id, mapGrape.get(e.grape_id)]);
        });
        this.mapWineIdGrapeName = new Map(mapDataArray);

        dataGrape = null;
        dataJoin = null;
        jsonData = null;
    }

    async wineOfIdsIn(arrayId){
        let jsonData = await this.getDataFromSource();
        jsonData = _.filter(jsonData.ipad_wines, e => e.available == '1' && arrayId.indexOf(String(e.id))> -1)
        return jsonData;
    }

   async  setGlobals(){
        var data = await this.getDataFromSource();

        var dataWine = data.ipad_wines;
        var dataWine = _.filter(dataWine, d => d.available == 1);
        var country_ids = _.map(_.uniqBy(dataWine, 'country_id'), 'country_id');       
        global.Countries  = _.filter(data.ipad_countries, r => country_ids.indexOf(r.id) > -1);
        this.country = _.clone(global.Countries);
        global.Countries.forEach( r => r.name = r.name.replace(/ /g, "") ); 
        global.Countries.forEach( c => global.CountryIds[c.name] = c.id );
        
        var region_ids = _.map(_.uniqBy(dataWine, 'region_id'), 'region_id');  
        global.Regions =  _.filter(data.ipad_regions, r => region_ids.indexOf(r.id) > -1);
        this.region = _.clone(global.Regions);
        global.Regions.forEach( c => {var name = c.name.replace(/ /g, ""); global.RegionIds[name] = c.id;  });

        var wine_ids = _.map(_.uniqBy(dataWine, 'id'), 'id');
        var selectedGrapeId = _.map(_.uniqBy(_.filter(data.ipad_winesgrapes, r => wine_ids.indexOf(r.wine_id) > -1),'grape_id'),'grape_id' );
        global.Grapes = _.map(_.uniqBy(_.filter(data.ipad_grapes, g => selectedGrapeId.indexOf(g.id) > -1),'name'),'name');
        data = null;
    }


    countryById(id){
        var res = _.find(this.country, c => c.id == id);
        if(res){
            return res.name;
        }else{
            throw 'DataManager: Contry of id '+id+' not found ';
        }
    }

    formatCountryName(name){
        var res = name.toLowerCase();
        return res.replace(' ','');
    }
    countryByName(name){
        var res = _.find(this.country, c => c.name == name);
        if(res){
            return res.id;
        }else{
            throw 'DataManager: Contry of name '+name+' not found ';
        }
    }

    regionById(id){
        var res = _.find(this.region, c => c.id == id);
        if(res){
            return res.name;
        }else{
            throw 'DataManager: Contry of id '+id+' not found ';
        }
    }

    fullRegionDetailDisplay(region_id, top_region_id){
          return  top_region_id ? this.regionById(top_region_id)+', '+this.regionById(region_id) : this.regionById(region_id);
    }

    regionByName(name){
        var res = _.find(this.region, c => c.name == name);
        if(res){
            return res.id;
        }else{
            throw 'DataManager: Contry of name '+name+' not found ';
        }
    }

     resolveGrapeForWineId(id){
        return this.mapWineIdGrapeName.get(id);
    }

   

    
        // let dirs = RNFetchBlob.fs.dirs
        //   RNFetchBlob
        //   .config({
        //     // response data will be saved to this path if it has access right.
        //     path : dirs.DocumentDir + '/1004.jpg'
        //   })
        //   .fetch('GET', 'http://mmbund.com/media/wine_list/1004.jpg', {
        //     //some headers ..
        //   })
        //   .then((res) => {
        //     // the path should be dirs.DocumentDir + 'path-to-file.anything'
        //     console.log('The file saved to ', res.path())
        //   })

    downloadImage(name, callback){
        console.log('downloading '+name);
        let dirs = RNFetchBlob.fs.dirs;
        return  RNFetchBlob
          .config({
            // response data will be saved to this path if it has access right.
            path : dirs.DocumentDir + '/'+name
          })
          .fetch('GET', 'http://mmbund.com/media/wine_list/'+name, {
            //some headers ..
          }).then((res) => {
                // the path should be dirs.DocumentDir + 'path-to-file.anything'
                console.log('The file saved to ', res.path())
                callback(res.path());
        }).catch((err,sts) => {console.log(err); alert('Error'+err)});
    }



    static getInstance() {
        if (DataManager.myInstance == null) {
            DataManager.myInstance = new DataManager();
        }
        return this.myInstance;
    }

}