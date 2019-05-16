var governmentmanageContract = web3.eth.contract([{"constant":true,"inputs":[{"name":"_property","type":"address"}],"name":"checkOwnership","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"properties","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"government","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_property","type":"address"}],"name":"checkGovernmentSigned","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_owner_name","type":"string"},{"name":"_location","type":"string"},{"name":"_ptype","type":"string"},{"name":"_size","type":"uint256"},{"name":"_cost","type":"uint256"},{"name":"_tax","type":"uint256"}],"name":"NewPropertyCreate","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_property","type":"address"}],"name":"GovernmentSign","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner_address","type":"address"},{"indexed":true,"name":"property_address","type":"address"},{"indexed":false,"name":"created_time","type":"uint256"}],"name":"NewPropertyCreated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"time","type":"uint256"}],"name":"GovernmentSigned","type":"event"}]);
var GovernmentManage = governmentmanageContract.at("0x59867010faec5838ccd2663eae606a53e73c3c28");

var propertycontractContract = web3.eth.contract([{"constant":true,"inputs":[],"name":"ptype","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"GovernmentSign","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"cost","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"checkOwnership","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"government","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"location","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"checkGovernmentSigned","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"size","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"tax","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"isGovernmentSigned","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner_name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"governmentSignedTime","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"_owner_name","type":"string"},{"name":"_location","type":"string"},{"name":"_ptype","type":"string"},{"name":"_size","type":"uint256"},{"name":"_cost","type":"uint256"},{"name":"_tax","type":"uint256"},{"name":"_government","type":"address"},{"name":"_owner","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner_address","type":"address"},{"indexed":false,"name":"created_time","type":"uint256"}],"name":"NewPropertyCreated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"time","type":"uint256"}],"name":"GovernmentSigned","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"previousOwner","type":"address"},{"indexed":true,"name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"}]);


var account = '';

function startApp() {
  
  account = web3.eth.accounts[0];
  var CreatedPropertiesLog = GovernmentManage.NewPropertyCreated({},{fromBlock:0, toBlock:'latest'});

  var AllLogCreatedProperties = CreatedPropertiesLog.get(function(error, logs){
    if(!error){
      var propertylist = "";
      console.log(logs)
      for(var i = 0; i < logs.length; i++){
        var trxhash = logs[i].transactionHash.toString();
        var created_time = logs[i].args.created_time.toString();
        var property_address = logs[i].args.property_address.toString();

        PropertyContract = propertycontractContract.at(logs[i].args.property_address);
        GovernmentManage.government.call(function(err,fgovernment){
          if(err == null){
            PropertyContract.owner_name.call(function(err1, fowner_name){
              if(err1 == null){
                PropertyContract.owner.call(function(err2, fowner){
                  if(err2 == null){
                    PropertyContract.location.call(function(err3, flocation){
                      if(err3 == null){
                        PropertyContract.cost.call(function(err4, fcost){
                          if(err4 == null){
                            PropertyContract.size.call(function(err5, fsize){
                              if(err5 == null){
                                PropertyContract.ptype.call(function(err6, fptype){
                                  if(err6 == null){
                                    PropertyContract.tax.call(function(err7, ftax){
                                      if(err7 == null){
                                        PropertyContract.isGovernmentSigned.call(function(err8, bGovernmentSigned){
                                          if(err8 == null){
                                            PropertyContract.owner.call(function(err9, propertyOwner){
                                              if(err9 == null){
                                                var isOwner = ''; var isSigned = '';
                                                if(propertyOwner.toString() == account) isOwner = "Yes";
                                                else isOwner = "No";
                                                console.log(bGovernmentSigned)
                                                if(bGovernmentSigned == true) isSigned = "Yes";
                                                else isSigned = "No";
                                                var action = ''; var action1 = '';
                                                if(fgovernment == account && bGovernmentSigned != true)
                                                  action = "<button id=\"sign-btn\"  data-address = "+property_address+">Sign</buton>";
                                                if(account == propertyOwner.toString())
                                                  action1 = "<button id=\"transfer-btn\" data-toggle=\"modal\" data-target=\"#transfermodal\" data-address = "+property_address+" >TransferOwnership</buton>";
                                                propertylist = propertylist 
                                                + "<tr><td><a href=\"https://ropsten.etherscan.io/tx/"+trxhash+"\">"+trxhash+"</a></td>"
                                                +"<td>"+getting_time(created_time)+"</td>"
                                                +"<td><a href=\"https://ropsten.etherscan.io/address/"+property_address+"\">"+property_address+"</a></td>"
                                                +"<td>"+fowner_name.toString()+"</td>"
                                                +"<td><a href=\"https://ropsten.etherscan.io/address/"+fowner+"\">"+fowner.toString()+"</a></td>"
                                                +"<td>"+flocation.toString()+"</td>"
                                                +"<td>"+fcost.toString()+"</td>"
                                                +"<td>"+fsize.toString()+"</td>"
                                                +"<td>"+fptype.toString()+"</td>"
                                                +"<td>"+ftax.toString()+"</td>"
                                                +"<td>"+isSigned+"</td>"
                                                +"<td>"+isOwner+"</td>"
                                                +"<td>"+action+"<br>"+action1+"</td></tr>";

                                                $("#propertylist").html(propertylist);
                                              }
                                            });
                                          }
                                        });
                                        
                                      }
                                      
                                    });
                                  }
                                  
                                });
                              }
                              
                            });
                          }
                          
                        });
                      }
                      
                    });
                  }
                  
                });
              }
            });
          }


          
        });

      }
    }
  });


}