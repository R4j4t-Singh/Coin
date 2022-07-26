var userAcccount ;
ethereum.request({ method: 'eth_accounts' }).then(function(result){
    console.log(result[0]);
});


function getBalance(){
    return contract1.methods.balance().call()
}

function mintCoin(amt) {
    contract1.methods.mint(amt).send({from:"0x4809d60B1062873C7f02A4983361cCcAb1d6c9f7"});
}

window.addEventListener('load',function(){
    web3 = new Web3(window.ethereum);

    startApp();
});


function startApp(){
    contract1 = new web3.eth.Contract(ethAbi,"0xd5f44219d1b8e25e11f03fb15bbf21a5daa99970");

    document.getElementById('balance').addEventListener('click',function(){
        getBalance().then(function(result){
                $("#balanceinfo").text(result);
             $("#balanceinfo").css("visibility","visible");
        });
    });

    document.getElementById('mint').addEventListener('click',function(){
        let amt = document.getElementById('amountOfCoins').value;
        mintCoin(amt);
    })

    // var accountInterval = setInterval(function() {
    //     if (userAcccount != getAccount()) {
    //       userAccount = getAccount();
    //       alert("account changed");
    //     }
    //   }, 100);
}