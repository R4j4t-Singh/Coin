var userAccounts;

function getAccount(){
let result = ethereum.request({ method: 'eth_accounts' })
return result;
}

function getBalance(){
    return contract1.methods.balance(userAccounts[0]).call();
}

function mintCoin(amt) {
    contract1.methods.mint(amt).send({from:userAccounts[0]});
}

function transfer(reciever,amt){
    contract1.methods.transfer(reciever,amt).send({from:userAccounts[0]});
}

window.addEventListener('load',function(){
    web3 = new Web3(window.ethereum);

    startApp();
});


async function startApp(){
    contract1 = new web3.eth.Contract(ethAbi,"0x722C63a9ea2bF333908140EE03Afa10b19CD52bC");

    userAccounts = await getAccount();

    document.getElementById('balance').addEventListener('click',function(){
        getBalance().then(function(result){
                $("#balanceinfo").text(result);
        });
    });

    document.getElementById('mint').addEventListener('click',function(){
        let amt = document.getElementById('amountOfCoins').value;
        mintCoin(amt);
    })

    document.getElementById('button').addEventListener('click',function(){
        let reciever = document.getElementById('address').value;
        let amt = document.getElementById('amount').value;
        transfer(reciever,amt);
    })


    var accountInterval = setInterval(async function() {
        var currentAccounts = await getAccount();
       
        if (userAccounts[0] != currentAccounts[0]) {
          userAccounts[0] = currentAccounts[0];
          alert("account changed");
        }
      }, 100);
}