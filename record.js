
document.getElementById('recordInputForm').addEventListener('submit', recordIssue);

//save records in local storage
function recordIssue(e) {
  var recordDesc = document.getElementById('recordDescInput').value;
  var departmentR = document.getElementById('departmentInput').value;
  var addressR  = document.getElementById('addressInput').value;
  var recordId = chance.guid();
  

  var issue = {
    id: recordId,
    description: recordDesc,
    department: departmentR,
    address: addressR,
  
  }

  if (localStorage.getItem('issues') == null) {
    var issues = [];
    issues.push(issue);
    localStorage.setItem('issues', JSON.stringify(issues));
  } else {
    var issues = JSON.parse(localStorage.getItem('issues'));
    issues.push(issue);
    localStorage.setItem('issues', JSON.stringify(issues));
  }

  document.getElementById('recordInputForm').reset();

  fetchIssues();
  alert("your data has been saved to local Storage")

  e.preventDefault();
}


//fetching from local storage

function fetchIssues() {
  var issues = JSON.parse(localStorage.getItem('issues'));
  var recordsList = document.getElementById('recordList');

 recordsList.innerHTML = '';

  for (var i = 0; i < issues.length; i++) {
    var id = issues[i].id;
    var desc = issues[i].description;
    var department = issues[i].department;
    var address = issues[i].address;
    
// output to main page
   recordsList.innerHTML +=   '<div class="well">'+
                              
                              '<h4>'+ '<i class="fas fa-user"></i> '
                             + desc + "</h4>"+ 
                               '<i class="fas fa-graduation-cap"></i>  '
                              + department + 
                             '<p><span class="glyphicon glyphicon-map-marker"></span>  ' 
                               + address + '<br>'+'<br>'+
                              '<a href="#" onclick="showSomethings(\''+id+'\')" class="btn btn-danger">Delete</a>'+
                              '<h6>Auto genereted ID: ' + id + '</h6>'+
                              '</div>';
  }
}


//confirmation for delete 
function showSomethings(id) {
  let userName = confirm(" are you sure to delete? yor are no longer to recover it ")
if (userName === true) {


  var issues = JSON.parse(localStorage.getItem('issues'));

  for (var i = 0; i < issues.length; i++) {
    if (issues[i].id == id) {
      issues.splice(i, 1);
    }
  }

  localStorage.setItem('issues', JSON.stringify(issues));

  fetchIssues();

}else{ 
 alert(" ok! your data is  secured ")
}
}
