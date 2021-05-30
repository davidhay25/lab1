
import axios from 'axios'

let state =  {

    identifier : "abc1234",
    hashMap : {},

    //function to get the ConceptMap and create the mapping hash  
    loadMap : function() {
        let that = this;
        return new Promise((resolve,reject) => {
            let url = "https://r4.ontoserver.csiro.au/fhir/ConceptMap/ClinFHIRLabToNZPOC"

            axios.get(url).then(function(data) {
                let conceptMap = data.data

                that.hashMap = {}   //will hold the translated code from bespoke lab to NZPOC
                //iterate through the groups & elements to create the hash. No error checking performed.
                conceptMap.group.forEach(function(group){
                    group.element.forEach(function (element) {
                        let mapFrom = group.source + "#" + element.code
                        let mapTo = group.target + "#" + element.target[0].code   //assume only 1
                        that.hashMap[mapFrom] = mapTo
                    })
                })

                //create a list of the hash for display...
                let hashDisplay = []
                Object.keys(that.hashMap).forEach(function(key){
                    let map = that.hashMap[key]
                    hashDisplay.push({key:key,map:map})
                })
                that.hashDisplay = hashDisplay;

                resolve(hashDisplay)

            }).catch(function(err){
                reject(err)
            })
        })
    },


    //function to load all lab data for this identifier, and convert to an internal object for display
    //check the hashMap to see if the code has been mapped

    loadData : function(identifier) {
        let that = this;        //needed to access hashmap in code below...
        return new Promise((resolve,reject)=> {
            //don't include the system in the identifier query for now...
            let url = "http://home.clinfhir.com:8054/baseR4/Observation?patient.identifier=" + identifier;       
            axios.get(url).then(function(data) {
                let bundle = data.data; 
                let arObservations = []               
                if (bundle && bundle.entry) {
                    bundle.entry.forEach(entry => {
                        let resource = entry.resource
                        let observation = {name:resource.code.coding[0].display}
    
                        observation.resource = resource;    //So we can get at the details if needed...
                        observation.date = resource.effectiveDateTime;
                        observation.value = resource.valueQuantity  //assume Quantity used
                        if (resource.valueQuantity) {
                            observation.valueDisplay = resource.valueQuantity.value + " " + resource.valueQuantity.unit
                        }
                    
                        if (resource.code && resource.code.coding) {
                            //the original code
                            observation.sourceCode = resource.code.coding[0].system + "#" + resource.code.coding[0].code
                            observation.code = observation.sourceCode   //the default 'real' code
                            //see if there is a map for this code
                            if (that.hashMap[observation.sourceCode]) {
                                observation.code = that.hashMap[observation.sourceCode];    //the mapped code
                            }
                        }
                        arObservations.push(observation)
                    });
                }
                resolve(arObservations)
            }).catch(function(err){
                reject(err)
            })
    })}

}

export {state}


