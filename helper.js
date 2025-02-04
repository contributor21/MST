function createAudioHTML(path) {
    return '<audio controls controlslist="nodownload" class="px-1"> <source src=' +
        path +
        ' type="audio/wav">Your browser does not support the audio element.</audio>';
  }
  
  
  function generateExampleRow(table_row, base_path, paddedNumber, folders, col_offset) {
    for (var i = 0; i < folders.length; i++) {
        if (folders[i] == 'devices') {
            let p = base_path + folders[i] + '/' + paddedNumber + '.txt';
            let cell = table_row.cells[col_offset + i];
            var req = new XMLHttpRequest();
            req.open("GET", p, false);
            req.send(null);
            cell.innerHTML = '<font size="-1">' + req.responseText + '</font>';
        } else {
            let p = base_path + folders[i] + '/' + paddedNumber + '.wav';
            let cell = table_row.cells[col_offset + i];
            cell.innerHTML = cell.innerHTML + createAudioHTML(p);
        }
    }
  }
  
  
  function generateT2A(tableId, e) {
    let table = document.getElementById(tableId);
    let example_idx = `${e}`; 
    let folders = ['devices', 'input', 'target', 'output'];
  
    for (var i = 0; i < 6; i++) {
      let paddedNumber = i.toString().padStart(5, '0');  
      generateExampleRow(table.rows[1 + i], 'assets/', example_idx, paddedNumber, folders, 0);
    }
  }


  // generateT2A('ex-1', 1);
  // generateT2A('ex-2', 2);
  // generateT2A('ex-3', 3);


  for (let i = 1; i <= 3; i++) {
    let id = '#ex-' + i;
    $(id).click(function() {
      generateT2A(
          'ex',
          paintingsFilenames, i);
      $(id).parent().siblings().removeClass('active');
      $(id).parent().addClass('active');
      return false;
    });
  }