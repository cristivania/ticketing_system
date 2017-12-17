function tickets () {
  var issues = JSON.parse(localStorage.getItem('issues'));
  var issuesList = document.getElementById('ticketList');

  issuesList.innerHTML = '';

  for (var i = 0; i < issues.length; i++) {
    var id = issues[i].id;
    var desc = issues[i].description;
    var severity = issues[i].severity;
    var assignedTo = issues[i].assignedTo;
    var status = issues[i].status;

    ticketList.innerHTML +=   '<div class="well">'+
                              '<h6>Issue ID: ' + id + '</h6>'+
                              '<p><span class="label label-info">' + status + '</span></p>'+
                              '<h3>' + desc + '</h3>'+
                              '<p><span class="glyphicon glyphicon-time"></span> ' + severity + ' '+
                              '<span class="glyphicon glyphicon-user"></span> ' + assignedTo + '</p>'+
                              '<a href="#" class="btn btn-warning" onclick="setStatusClosed(\''+id+'\')">Close</a> '+
                              '<a href="#" class="btn btn-danger" onclick="deleteIssue(\''+id+'\')">Delete</a>'+
                              '</div>';
  }
}

document.getElementById('ticketForm').addEventListener('submit', saveIssue);
function saveIssue(e) {
  var issueId = Math.random();
  var issueDesc = document.getElementById('ticketDesc').value;
  var issuePriority = document.getElementById('ticketPriority').value;
  var issueAssignedTo = document.getElementById('ticketAssigned').value;
  var issueStatus = 'Open';
  var issue = {
    id: issueId,
    description: issueDesc,
    severity: issuePriority,
    assignedTo: issueAssignedTo,
    status: issueStatus
  }

  if (localStorage.getItem('issues') === null) {
    var issues = [];
    issues.push(issue);
    localStorage.setItem('issues', JSON.stringify(issues));
  } else {
    var issues = JSON.parse(localStorage.getItem('issues'));
    issues.push(issue);
    localStorage.setItem('issues', JSON.stringify(issues));
  }

  document.getElementById('ticketForm').reset();

  tickets();

  e.preventDefault();
}



function setStatusClosed (id) {
  var issues = JSON.parse(localStorage.getItem('issues'));

  for(var i = 0; i < issues.length; i++) {
    if (issues[i].id == id) {
      issues[i].status = "Closed";
    }
  }

  localStorage.setItem('issues', JSON.stringify(issues));

  tickets();
}

function deleteIssue (id) {
  var issues = JSON.parse(localStorage.getItem('issues'));

  for(var i = 0; i < issues.length; i++) {
    if (issues[i].id == id) {
      issues.splice(i, 1);
    }
  }

  localStorage.setItem('issues', JSON.stringify(issues));

  tickets();
}
