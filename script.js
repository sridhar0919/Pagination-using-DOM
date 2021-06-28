fetch("https://raw.githubusercontent.com/Rajavasanthan/jsondata/master/pagenation.json")
.then(response => response.json())
.then(data => {
  const table_element = document.getElementById('table1');
  const pagination_element = document.getElementById('pagination');

  let current_page = 1;
  let rows = 10;

  function displayTable(items, wrapper, rows_per_page, page){
    wrapper.innerHTML = "";
    page--;

    let start = rows_per_page * page;
    let end = start + rows_per_page;
    let paginatedItems = items.slice(start, end);

    let table = document.createElement('table');
    table.classList.add('table','table-bordered');
    let thead = document.createElement('thead');
    let tr = document.createElement('tr');
    let th1 = document.createElement('th');
    th1.textContent = 'ID';
    let th2 = document.createElement('th');
    th2.textContent = 'Name';
    let th3 = document.createElement('th');
    th3.textContent = 'Email';
    tr.append(th1,th2,th3);
    thead.append(tr);
    table.append(thead);
    
    for (let i = 0; i < paginatedItems.length; i++){

      let tbody = document.createElement('tbody');
      let tr1 = document.createElement('tr');
      let th4 = document.createElement('th');
      th4.setAttribute('scope','row');
      th4.textContent = i+start+1;

      let td1 = document.createElement('td');
      td1.textContent = paginatedItems[i].name;
      let td2 = document.createElement('td');
      td2.textContent = paginatedItems[i].email;
      tr1.append(th4);
      tr1.append(td1,td2);
      tbody.append(tr1);
      table.append(tbody);
      wrapper.append(table);
    }
  }  

  function setupPagination (items, wrapper, rows_per_page){
    wrapper.innerHTML = "";

    let page_count = Math.ceil(items.length / rows_per_page);
    for(let i = 1; i <   page_count + 3; i++){
      let btn = PaginationButton(i, items, page_count);
      wrapper.appendChild(btn);
    }
    
    let first = document.getElementById('first');
    let last = document.getElementById('last');
    let prev = document.getElementById('prev');

    first.addEventListener('click', () => {
      displayTable(items, table_element, rows, 1);
    })

    last.addEventListener('click', () => {
      displayTable(items, table_element, rows, page_count);
    })
    
  }

  function PaginationButton(page, items, page_count) {

    let button = document.createElement('button');
    button.classList.add('btn','btn-primary','border','border-dark');

    if(page < page_count+1) {
      button.innerText = page;  
    }
    else {
      if(page == (page_count+1)) {
        button.innerText = 'First';
        button.setAttribute('id','first');
      }
      else if(page == (page_count+2)) {
        button.innerText = 'Last';
        button.setAttribute('id','last');
      }
    }

    if(current_page == page) {
      button.setAttribute('data-toggle','button');
      button.classList.add('active');
    }

    button.addEventListener('click',() => {
      current_page = page;
      displayTable(items, table_element, rows, current_page);

      let current_btn = document.querySelector('.pagenumbers button.active');
      current_btn.classList.remove('active');

      button.classList.add('active');
      
    })
    
    return button;
  }

  displayTable(data, table_element, rows, current_page);
  setupPagination(data, pagination_element,rows);

})











