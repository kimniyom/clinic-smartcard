fetchData();
function fetchData() {
    let api = localStorage.getItem('server-clinic-card');
    var url = api + "/patient/checkpatientsmartcard";
    if (api == null) {
        alert("ยังไม่ได้เชื่อมต่อเครื่องแม่ข่าย...!!");
        return false;
    } else {
        var card = "1530600027345";
        var data = {
            card: card
        };
        axios.defaults.headers.post['Content-Type'] = 'application/json';
        axios.post(url, data)
            .then((response) => {
                let res = response.data;
                console.log(res.name);
                if (res.name == null) {
                    alert("ไม่พบข้อมูลในระบบ...");
                    return false;
                } else {
                    $("#disease").val(res.disease);
                    $("#drug").val(res.drug);
                    $("#hn").val(res.hn);
                    $("#id").val(res.id);
                    $("#tel").val(res.tel);
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }

}