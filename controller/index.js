//searchPatient();
var serverSEQ = localStorage.getItem('server-clinic-queue');
const socketSEQ = io.connect(serverSEQ);

function searchPatient() {
    let api = localStorage.getItem('server-clinic-card');
    var url = api + "/patient/checkpatientsmartcard";
    if (api == null) {
        alert("ยังไม่ได้เชื่อมต่อเครื่องแม่ข่าย...!!");
        return false;
    } else {
        var card = $("#cid").val();
        var data = { card: card };
        axios.defaults.headers.post['Content-Type'] = 'application/json';
        axios.post(url, data)
            .then((response) => {
                let res = response.data;
                console.log(res.name);
                if (res.name == null) {
                    alert("ไม่พบข้อมูลในระบบ...");
                    $("#btn-register").show();
                    $("#btn-update-enabled").hide();
                    $("#btn-update-disabled").show();
                    return false;
                } else {
                    $("#disease").val(res.disease);
                    $("#drug").val(res.drug);
                    $("#hn").val(res.hn);
                    $("#id").val(res.id);
                    $("#tel").val(res.tel);
                    $("#btn-register").hide();
                    $("#btn-update-enabled").show();
                    $("#btn-update-disabled").hide();
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }
}

function saveRegister() {
    let api = localStorage.getItem('server-clinic-card');
    var patient_disease = $("#disease").val();
    var patient_drug = $("#drug").val();
    var tel = $("#tel").val();
    var name = $("#fname").val();
    var lname = $("#lname").val();
    var birth = $("#birthday").val();
    var card = $("#card").val();
    var contact = $("#address").val();
    var prefix = $("#prefix").val();
    var url = api + "/patient/registersmartcard";
    if (api == null) {
        alert("ยังไม่ได้เชื่อมต่อเครื่องแม่ข่าย...!!");
        return false;
    } else {

    }
}

function Updateregister() {
    let api = localStorage.getItem('server-clinic-card');
    var url = api + "/patient/Updateregister";
    var id = $("#id").val();
    var patient_disease = $("#disease").val();
    var patient_drug = $("#drug").val();
    var tel = $("#tel").val();
    var data = {
        id: id,
        tel: tel,
        patient_disease: patient_disease,
        patient_drug: patient_drug
    };
    if (api == null) {
        alert("ยังไม่ได้เชื่อมต่อเครื่องแม่ข่าย...!!");
        return false;
    } else {
        axios.defaults.headers.post['Content-Type'] = 'application/json';
        axios.post(url, data)
            .then((response) => {
                let res = response.data;
                if (res.status == 1) {
                    alert("แก้ไขข้อมูลแล้ว...");
                } else {
                    alert("เกิดข้อผิดพลาด...");
                    return false;
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }
}

//นำเข้าคิว
function sendSeq() {
    let api = localStorage.getItem('server-clinic-card');
    var url = api + "/queue/saveseqsmartcard";

    var patient = $("#id").val();
    if (patient == "") {
        alert("ไม่พบบัตรประชาชน...");
        return false;
    }
    var weight = $("#weight").val();
    var height = $("#height").val();
    var btemp = $("#btemp").val();
    var pr = $("#pr").val();
    var rr = $("#rr").val();
    var ht = $("#ht").val();
    var waistline = $("#waistline").val();
    var cc = $("#cc_detail").val();
    if (cc == "") {
        alert("กรุณาใส่อาการที่มารักษา ...!");
        return false;
    }
    var data = {
        patient: patient,
        weight: weight,
        height: height,
        btemp: btemp,
        pr: pr,
        rr: rr,
        ht: ht,
        waistline: waistline,
        cc: cc
    };
    axios.defaults.headers.post['Content-Type'] = 'application/json';
    axios.post(url, data)
        .then((response) => {
            let res = response.data;
            if (res.status == 1) {
                nodeloadtable();
                //alert("นำเข้าคิวบริการแล้ว ... กรุณาดึงบัตรประชาชนออกจากเครื่อง");
                $("#pull-card").modal();
                new Audio('./sound/clode-card.mp3').play();
            } else {
                alert("เกิดข้อผิดพลาดกรุณาตรวจสอบ...");
                return false;
            }
        })
        .catch((error) => {
            console.error(error);
        });
    /*
    $.post(url, data, function(datas) {
        setnullform();
        nodeloadtable();
    });
    */
}

//คิวหน้าห้องตรวจ
function nodeloadtable() {
    let api = localStorage.getItem('server-clinic-card');
    var url = api + "/queue/getdata";
    var data = { a: 1 };
    axios.defaults.headers.post['Content-Type'] = 'application/json';
    axios.post(url, data)
        .then((response) => {
            let res = response.data;
            socketSEQ.emit("seqemployeeramet", res);
            ReautoloadseqDoctor();
        })
        .catch((error) => {
            console.error(error);
        });
}

//คิวห้องหมอ
function ReautoloadseqDoctor() {
    let api = localStorage.getItem('server-clinic-card');
    var url = api + "/queue/seqdoctor";
    var data = { a: 1 };
    axios.defaults.headers.post['Content-Type'] = 'application/json';
    axios.post(url, data)
        .then((response) => {
            let res = response.data;
            socketSEQ.emit("seqemployeedoctorramet", res, (success) => {});
        })
        .catch((error) => {
            console.error(error);
        });
}