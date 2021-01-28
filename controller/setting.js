var server = localStorage.getItem('server-clinic-card');
var serverSEQ = localStorage.getItem('server-clinic-queue');
//console.log(server);
if(server != null && server != ""){
    $("#server_ip").val(server);
}

if(serverSEQ != null && serverSEQ != ""){
    $("#server_queue").val(serverSEQ);
}
function saveServer(){
    var server = $("#server_ip").val();
    var server_queue = $("#server_queue").val();
    if(server == "" || server_queue == ""){
        alert("กรุณากรอกข้อมูล...?");
        return false;
    } else {
        localStorage.setItem('server-clinic-card',server);
        localStorage.setItem('server-clinic-queue',server_queue);
    }
    
}