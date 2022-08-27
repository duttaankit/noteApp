//JavaScript document
$(document).ready(()=> {

  $('.addBtn,.spAdd').click(()=> {
    $('.addND').addClass('active');
    $('#wrapper').addClass('active');
  });

  $('.clBtn').click(()=> {
    $('.addND').removeClass('active');
    $('#wrapper').removeClass('active');

    $('.editND').removeClass('active');
    $('#wrapper').removeClass('active');
  });


  var editIndex;
  const notesA = JSON.parse(localStorage.getItem('notes') || "[]");
  const showNote = () => {
    if (notesA == "") {
      $(".nothingTS").show();
    } else {
      notesA.forEach((noteFe, index)=> {
        const nTag = `<div class='noteDiv'><div class='noteDivH'><div class='noteDivT'>${noteFe.title}</div><div class='noteDivN'>${noteFe.note}</div></div><div class='noteDivF'><div class='editDel'><button><span class='material-icons edit' data-id='${index}'>edit_note</span></button><button><span class='material-icons del' data-id='${index}'>delete</span></button></div><div class='dateTime'><p>${noteFe.date}</p></div></div></div>`;
        $(nTag).insertAfter('.nothingTS');

      });
    }
  };

  showNote();

  $("#noteF").parsley();
  $("#noteE").parsley();

  $("#noteF").on('submit', (e)=> {
    e.preventDefault();
    if ($("#noteF").parsley().isValid()) {
      const title = $('#nTitle').val();
      const note = $('#nNote').val();
      const dT = getNoteDate();
      const nObj = {
        title,
        note,
        date: dT
      };

      notesA.push(nObj);
      localStorage.setItem("notes", JSON.stringify(notesA));


      $(".nothingTS").hide();
      $("#noteF").trigger('reset');
      $("#noteF").parsley().refresh().destroy();
      $('.addND').removeClass('active');
      $('#wrapper').removeClass('active');

      $('.noteDiv').remove();
      showNote();
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Note Added Successfuly',
        showConfirmButton: false,
        timer: 1500
      });
    }
  });

  $('.del').click(()=> {
    var indeX = $(".del").data("id");
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        notesA.splice(indeX, 1);
        localStorage.setItem('notes', JSON.stringify(notesA));
        $('.noteDiv').remove();
        showNote();
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Note Deleted Successfuly',
          showConfirmButton: false,
          timer: 1500
        });
      }
    });
  });

  $('.edit').click(()=> {
    var ind = $('.edit').data("id");
    editIndex = ind;
    var eNote = notesA[ind];
    $('#neNote').val(eNote.note);
    $('#neTitle').val(eNote.title);
    $('.editND').addClass('active');
    $('#wrapper').addClass('active');
  });
  $("#noteE").on('submit', (ee)=> {
    ee.preventDefault();
    var eNOte = notesA[editIndex];
    var ddT = eNOte.date;
    if ($("#noteE").parsley().isValid()) {
      const eetitle = $('#neTitle').val();
      const eenote = $('#neNote').val();
      const nOEbj = {
        title: eetitle,
        note: eenote,
        date: ddT
      };

      notesA[editIndex] = nOEbj;
      localStorage.setItem("notes", JSON.stringify(notesA));
      editIndex = '';

      $(".nothingTS").hide();
      $("#noteE").trigger('reset');
      $("#noteE").parsley().refresh().destroy();
      $('.editND').removeClass('active');
      $('#wrapper').removeClass('active');

      $('.noteDiv').remove();
      showNote();
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Note Updated Successfuly',
        showConfirmButton: false,
        timer: 1500
      });
    }
  });

});