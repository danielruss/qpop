function code(){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
	if (this.readyState == 4 && this.status == 200) {
	    document.getElementById("output").innerHTML = this.responseText;
	}
    };
    //    xhttp.open("GET", "http://localhost:8080/soccer/code?title=farmer", true);

    var jobTitle=document.getElementById("jobTitleElement").value
    xhttp.open("GET",'https://sitf-cwlcji5kxq-uc.a.run.app/soccer/code?title='+jobTitle)
    xhttp.send();
}

