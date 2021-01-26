var server = localStorage.getItem('server-clinic-card');
console.log(server);
if(server != null && server != ""){
    $("#server_ip").val(server);
}

function saveServer(){
    var server = $("#server_ip").val();
    if(server == ""){
        alert("กรุณากรอกข้อมูล...?");
        return false;
    } else {
        localStorage.setItem('server-clinic-card',server);
    }
    
}