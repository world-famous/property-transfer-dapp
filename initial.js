var web3;

window.addEventListener('load',function() {
    // Checking if Web3 has been injected by the browser (Mist/MetaMask)
    if (typeof web3 !== 'undefined') {
        // Use Mist/MetaMask's provider
        web3 = new Web3(web3.currentProvider);
        window.web3 = new Web3(web3.currentProvider);
        if (web3.currentProvider.isMetaMask === true) {
            startApp();
            // setInterval(function(){startApp()}, 3000);
            
        } else {
            $('#results').html('No web3? Please use google chrome and metamask plugin to enter this Dapp!');
        }
    }
});

var account = '';

function getting_time($input){
    ts = new Date($input*1000) 
    var year = ts.getFullYear();

    var months_arr = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

    // Month
    var month = months_arr[ts.getMonth()];

    // Day
    var day = ts.getDate();

    // Hours
    var hours = ts.getHours();

    // Minutes
    var minutes = "0" + ts.getMinutes();

    // Seconds
    var seconds = "0" + ts.getSeconds();

    // Display date time in MM-dd-yyyy h:m:s format
    var convdataTime = month+'-'+day+'-'+year+' '+hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

    return convdataTime;
}