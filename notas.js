
document.addEventListener('DOMContentLoaded', function(){
    var addButton = document.getElementById('addButton');
    var commentInput = document.getElementById('commentInput');
    var saveButton = document.getElementById('saveButton');
    var searchComment = document.getElementById('searchComment');

    addButton.addEventListener('click', function(){
        addButton.style.display = 'none';
        commentInput.style.display = 'block';
        saveButton.style.display = 'block';
        commentInput.focus();
    });

    saveButton.addEventListener('click', function(){
        addOrUpdateComment();
    });

    loadComments();

    searchComment.addEventListener('input', function(){
        var searchValue = searchComment.value.trim().toLowerCase();
        var comments = JSON.parse(localStorage.getItem('comments')) || [];

        var filteredComments = comments.filter(function(comment){
            return comment.text.toLowerCase().includes(searchValue);
        });
        renderComments(filteredComments);
    });

});


function loadComments() {
    var comments = JSON.parse(localStorage.getItem('comments')) || [];
    renderComments(comments);
}

function renderComments(comments) {
    var commentsContainer = document.getElementById('commentsContainer');
    commentsContainer.innerHTML = '';


    comments.forEach(function (comment, index) {
        var commentElement = createCommentElement(comment, index);
        commentsContainer.appendChild(commentElement);
    });

}


function createCommentElement(comment, index) {
    var commentElement = document.createElement('div');
    commentElement.className = 'col-lg-4 col-md-6 col-sm-12 comment';

    var textNode = document.createTextNode(comment.text);
    commentElement.appendChild(textNode);

    var editButton = document.createElement('button');
    editButton.className = 'edit-button';
    editButton.textContent = 'Editar';
    editButton.addEventListener('click', function(){
        editComment(index);
    });
    commentElement.appendChild(editButton);

    var deleteButton = document.createElement('button');
    deleteButton.className = 'delete-button';
    deleteButton.textContent = 'Eliminar';
    deleteButton.addEventListener('click', function(){
        deleteCommentElement(index);
    });
    commentElement.appendChild(deleteButton);

    return commentElement;
}


function addOrUpdateComment() {
    console.log('guardando comentario...');

    var commentInputValue = document.getElementById('commentInput').value.trim();
    if (commentInputValue !== '') {
        var comments = JSON.parse(localStorage.getItem('comments')) || [];
        var commentIndexElement = document.getElementById('CommentIndex');
        var commentIndex = commentIndexElement ? parseInt(commentIndexElement.value) : -1;
        if (!isNaN(commentIndex) && commentIndex >= 0 && commentIndex < comments.length) {
            comments[commentIndex].text = commentInputValue;
        } else {
            comments.push({ text: commentInputValue, completed: false });
        }

        localStorage.setItem('comments', JSON.stringify(comments));

        loadComments();

        document.getElementById('commentInput').value = '';
        document.getElementById('addButton').style.display = 'block';
        document.getElementById('commentInput').style.display = 'none';
        document.getElementById('saveButton').style.display = 'none';

        if (commentIndexElement){
            commentIndexElement.value = '';
        }
    } else {
        alert('El Comentario no puede estar vacio');
    }
}

function editComment(index){
    var comments = JSON.parse(localStorage.getItem('comments')) || [];
    if(index >= 0 && index < comments.length){

        document.getElementById('commentInput').value = comments[index].text;
        document.getElementById('commentIndex').value = index;
        document.getElementById('addButton').style.display = 'none';
        document.getElementById('commentInput').style.display = 'block';
        document.getElementById('saveButton').style.display = 'block';

    }
}

function deleteCommentElement(index){
    var comments = JSON.parse(localStorage.getItem('comments')) || [];
    if (index >= 0 && index < comments.length) {
        comments.splice(index, 1);
        localStorage.setItem('comments', JSON.stringify(comments));
        loadComments();
    }
}