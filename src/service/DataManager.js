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
    _plusMoinsList = [];

    data = {};
    country = {};
    region = {};
    updateCancel = false;

    sourceData = 'local';
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

             this._initData('full');
             this._initData('best');
             this._initData('glass');
             this._initData('half');

        });

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

    async _update(){
        console.log('soo');
        var newJson = null;
        try{
            newJson = await fetch('http://mmbund.com/surgery/index.php/ipadjson');
        }catch(e){
            alert(e);
            return;
        }
        newJson = await newJson.json();

        var oldJson = await this.getDataFromSource();
        var id = 5;

        id++;
        this.sendMessageToUi(id,'Get response from server, downloading new images...');

        console.log('dum');

        var itemWithImageToDownload =  this.getWineWithNewImage(newJson.ipad_wines, oldJson.ipad_wines);
        var pathOfImageToDelete = this.getUnusedImagePath(newJson.ipad_wines, oldJson.ipad_wines);
        var dowloadedImage = [];
        var aborted = false;

        this.emitter.addListener('cancel', (e) => {
            aborted = true;
           
        });

        for(var i=0; i< itemWithImageToDownload.length; i++){

            if(aborted) {
                break;        
            }

            itemWithImageToDownload[i];
            console.log('downloading '+itemWithImageToDownload[i].path);

            id++;
            this.sendMessageToUi(id+'d','Downloading '+itemWithImageToDownload[i].path+', '+(dowloadedImage.length + 1)+'/'+itemWithImageToDownload.length);

            var downResult = await this._downloadImage(itemWithImageToDownload[i].path);
            if(downResult.error){
                aborted = true;
                console.log('breaking '+itemWithImageToDownload[i].path+' not downloaded'); 

                id++;
                this.sendMessageToUi(id,'Error while downloading '+item.path+', try again '+downResult.data);
                break;             
            }else{
                dowloadedImage.push(downResult.data);
                itemWithImageToDownload[i].path = downResult.data;
                id++;
                this.sendMessageToUi(id,'    Done');

            }
        }

        if(aborted || this.updateCancel){
            //delete downloadedImage
            dowloadedImage.forEach(e =>{           
                console.log('deleting '+e);
            });
            return;
        }

        //console.log(newJson.ipad_wines);

        if(this.updateCancel) return;

        //must not have error
        AsyncStorage.setItem('@ipad:data', JSON.stringify(newJson) , error => {
            if(error) throw 'error while storing downloaded json';
            console.log('SCRIPT END HERE');
            
        AsyncStorage.setItem('@ipad:upadted','true', error => { 
            if(error) throw 'error while setting updated status'+error;
            this.sourceData = 'updated';
        })
        });

        //DELETE unused image

        pathOfImageToDelete.forEach(e => {
            RNFetchBlob.fs.unlink(e.path).then(() => {});
        })

        //finished totally
        id++;
        this.sendMessageToUi(id,'Update finished successfully ');

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
        var imagesToRemove =  _.difference(arrOld,arrNew);
        return _.filter(oldData, n => imagesToRemove.indexOf(n.path) > -1 && n.path.indexOf('/')> -1 );
    }

    _addPlusMoinsRef(id, ref){
        if(_.find(this._plusMoinsList, e => e.id == id) == undefined){
            this._plusMoinsList.push({id:id, ref:ref});
        }
    }

    _updatePlusMoins(){
        var target = _.uniqBy(global.Selected, 'id');
        this._plusMoinsList.forEach(p =>{
            var selected = _.find(target, t => t.id == p.id && t.type=='byglass');
           
            if(selected){
                p.ref.init();
                if(p.ref.isMounted()){
                    p.ref.setState({refresh: p.ref.state.refresh - 1});
                }
            }else{
                if(p.ref.state.count > 0){
                    p.ref.init();
                    if(p.ref.isMounted()){
                        p.ref.setState({refresh: p.ref.state.refresh - 1});
                    }
                }
            }
        })
    }

    cancelUpdate(){
        this.cancelUpdate = true;
        this.emitter.emit('cancel', 'message');
    }


    _search(viewType,req){

        var result =[];
        var count = 0;
        var main = this._data[viewType];

        for(var i=0; i<main.length ; i++){
            var item = main[i];

            if(item.type == 'Row'){
                var toAdd = true;

                if(req['country_id'].length > 0 ){
                    if(req['country_id'].indexOf(item.data.country_id) == -1 )
                        toAdd = false;
                }

                if(toAdd && req['region_id'].length > 0 ){
                    if(req['region_id'].indexOf(item.data.region_id) == -1 )
                        toAdd = false;
                }

                if(toAdd && req['type'].length > 0 ){
                    if(req['type'].indexOf(item.data.type) == -1 )
                        toAdd = false;
                }

                if(toAdd && req['grapes'].length > 0 ){
                    if(req['grapes'].indexOf(item.data.grape) == -1 )
                        toAdd = false;
                }

                if(toAdd && req['price'].length > 0 ){
                    for(var j=0; j<req['price'].length; j++ ){
                        var type = req['price'][j];
                        if(type == 'priceRangeA'){
                            min = 0; max= 500;
                        }
                        if(type == 'priceRangeB'){
                            min = 501; max= 1000;
                        }
                        if(type == 'priceRangeC'){
                            min = 1001; max= 4000;
                        }
                        if(type == 'priceRangeD'){
                            min = 4001; max= Infinity;
                        }

                        if(item.data.price > max || item.data.price <min){
                            toAdd = false;
                            break;
                        }
                    }
                }

                if(toAdd && req['name'].length > 0 ){ 
                    if( item.data.name.indexOf(req['name']) == -1 && 
                          item.data.country.indexOf(req['name']) == -1 &&  item.data.region.indexOf(req['name']) == -1 
                        && item.data.info.indexOf(req['name']) == -1)
                                toAdd = false;

                    if(item.data.grape){
                        if(item.data.grape.indexOf(req['name']) > -1)
                            toAdd = true;
                    }
                }

                if(toAdd){
                    result.push(item);
                    count ++;
                }
                    

            }else{
                if(item.type =='TypeTitle' && result.length>0 && result[result.length - 1].type == 'CountryTitle')
                result.pop();
            
            if(item.type == 'CountryTitle' && result.length>0 && result[result.length - 1].type == 'CountryTitle')
                result.pop();
    
            result.push(item);
            }

        }

        if(result[result.length - 1].type == 'CountryTitle'){
            result.pop();
        }

        return [result, count];

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

        //dico grapes
        m=[];
        var wg = s.ipad_grapes;

        wg.forEach( e =>{
            let s = [e.id,e.name];
            m.push(s);
        })

        var dicoGrape = new Map(m);

        m =[];

        var wg = s.ipad_winesgrapes;
        wg.forEach( e =>{
            let s = [e.wine_id,dicoGrape.get(e.grape_id)];
            m.push(s);
        })

        var dicoWineGrape = new Map(m);
        //end

        s= s.ipad_wines;

        s= _.filter(s, p => p.available == '1');

        s= s.map(e => {
            e.country = dico.get(e.country_id);
            e.region = dicoRegion.get(e.region_id);
            e.topRegion = dicoRegion.get(e.top_region_id);
            e.grape = dicoWineGrape.get(e.id);
            return e;
        });

        s = _.groupBy(s, 'type');
        var types = ['CHAMPAGNE','RED','WHITE','ROSE','SWEET'];

        this._countryIndexName[viewType] = [];
        for(var i=0; i<types.length; i++){
            var data = s[types[i]];
            this._countryIndexName[viewType][types[i]] = [];
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

                    this._countryIndexName[viewType][types[i]].push([main.length,country]);
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
        console.log('imgsrc '+result);
        console.log(path);
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

  


    async getDataFromSource(){
        if(this.sourceData == 'local'){
            return require('../jsonData/ipadjson.json');
        }else{
            let value = await AsyncStorage.getItem('@ipad:data');
            console.log('source on updated');
            let s = JSON.parse(value);
            return JSON.parse(value);
        }
    }




    async organizeData(){
        let jsonData = await this.getDataFromSource();
        this.data = _.filter(jsonData.ipad_wines, e => e.available == '1');
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

     downloadImage(name,cb){

        let dirs = RNFetchBlob.fs.dirs;
        RNFetchBlob
          .config({
            // response data will be saved to this path if it has access right.
            path : dirs.DocumentDir + '/'+name
          })
          .fetch('GET', 'http://mmbund.com/media/wine_list/'+name, {
            //some headers ..
          }).then((res) => {
                // the path should be dirs.DocumentDir + 'path-to-file.anything'
                console.log('The file saved to ', res.path())
                return res.path();
              });
    }

    async _downloadUnit(name){
        
        let dirs = RNFetchBlob.fs.dirs;
        var s = await         RNFetchBlob
        .config({
          // response data will be saved to this path if it has access right.
          path : dirs.DocumentDir + '/'+name
        })
        .fetch('GET', 'http://mmbund.com/media/wine_list/'+name, {
          //some headers ..
        });

        return s.data;
       
    }

    async _downloadImage(name){
        let s = null;
        try{
            s = await this._downloadUnit(name);
        }catch(e){
            console.log('sro'+e);
            return {error:true,data: e};
        }

        return {error:false, data: s};
    }


    static getInstance() {
        if (DataManager.myInstance == null) {
            DataManager.myInstance = new DataManager();
        }
        return this.myInstance;
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

}