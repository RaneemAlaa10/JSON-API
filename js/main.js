var title=document.getElementById("title")
var body=document.getElementById("body")
var updateBtn=document.getElementById("update")
var selectMenu=document.getElementById("idSelect")

allPosts=[]
/*SHOW FIRST CONTAINER SMOOTHLY*/ 
$(function(){
    $(".container").fadeIn('slow')
})
/*CHECK IF THERE IS DATA IN LOCAL STORAGE IF FALSE GO TO GET DATA FROM API IF TRUE SHOW DATA IN LOCAL STORAGE */
if (localStorage.getItem('x') == null) {
    getData()
    allPosts = []
} else {
    allPosts = JSON.parse(localStorage.getItem('x'))
}

/*GET DATA FROM API*/
async function getData()
{
    var data=await fetch('https://jsonplaceholder.typicode.com/posts')
    var converted=await data.json()
    allPosts=converted
    console.log(allPosts)
    localStorage.setItem('x', JSON.stringify(allPosts))
}

/*DISPLAY POSTS FUNCTION*/
function display() {
    var box = ``;
    for (i = 0; i < allPosts.length; i++) {
      box += `<div class="col-md-12">
          <div class="item text-light bg-dark card border-light text-left p-3 my-3">
          <h5>ID: ${allPosts[i].id}</h5>
          <p><span class="font-weight-bold">Title: </span>${allPosts[i].title}</p>
          <p><span class="font-weight-bold">Body: </span>${allPosts[i].body}</p>
          <div class="btns w-50 text-left">
          <button onclick="Delete(${i})" class="btn btn-danger">delete</button>
          </div>
      </div>
  </div>`;
    }
    document.getElementById("items").innerHTML = box;
    $(function() {
        $('#items').slideDown(1000);
    })
    document.getElementById("available").innerHTML=`<h5>All Posts:${allPosts.length}</h5>`
    $(function() {
        $('#available').slideDown(1000);
    })
}

/*CLICK ON BUTTON TO DISPLAY POSTS*/
displayBtn.addEventListener('click',function(){
    display()
})
/*DELETE POST FUNCTION*/ 
function Delete(index)
{
    console.log(index);
    allPosts.splice(index, 1)//DELETE SPECIFIC POST 
    console.log(allPosts);
    
    $(function(){
        $('#available').fadeOut(1000);
        $('#available').fadeIn(1000);
    })
    display()
    localStorage.setItem('x', JSON.stringify(allPosts))//UPDATE IN LOCAL STORAGE
}

/*RESET UPDATES AND SHOW THE ORIGINAL DATA FROM API*/
reset.addEventListener('click',async function(){
    console.log(allPosts)
    document.getElementById("items").style.display="none"
    await getData()
    await display()
})

/*SHOW  AND HIDE ADD & UPDATE FORM*/
let width =$("#box-input").innerWidth()
console.log(width)
$('#toggle').click(function(){
    let formRight=$("#slide").css('right')
    console.log(formRight)
    if(formRight=='0px')
    {
        $("#slide").animate({right:`-${width+5}`},1000)
    }
    else
    {
        $("#slide").animate({right:`0`},1000)
    }
})

/*FUNCTION TO ADD NEW POST*/
function getInput()
{

    var post ={
        id: allPosts.length+1,
        title: title.value,
        body: body.value,
    }
    console.log(post);
  

    allPosts.push(post)
    console.log(allPosts);
    display()
    localStorage.setItem('x', JSON.stringify(allPosts))
}
/*BUTTON TO ADD NEW POST BY RUN getInput() FUNCTION*/
add.onclick=function(){
    getInput()
}

/*VALIDATE IF THE INPUTS IS NOT EMPTY TO ADD NEW POST */
function validate()
{
    if(title.value!==" "&&body.value!=" ")
    {
        document.getElementById("add").disabled = false;
    }
    else
    {
        document.getElementById("add").disabled = true;
    }
}

body.onkeyup=function(){
    validate()
}
/*UPDATE SPECIFIC POST*/
function update()
{
    var index=document.getElementById("idSelect").selectedIndex;
    console.log(index)
    if(title.value!="")
    {
        allPosts[index].title=title.value
    }
    if(body.value!="")
    {
        allPosts[index].body=body.value
    }
    display()
    localStorage.setItem('x', JSON.stringify(allPosts))
    clear()
    console.log("done")
}
/*CLEAR DATA IN FORM INPUTS AFTER ADD OR UPDATE */
function clear()
{
    title.value = ""
    body.value = ""
}

/*CHECK THE USER CHOOSE TO UPDATE SPECIFIC POST OR ADD ONE */
function checkUpdateradio() {
    if (document.getElementById("updateOld").checked) 
    {
        var options=``
        for(var i=0;i<allPosts.length;i++)
        {
            options+=`<option>${i+1}</option>`
        }
        selectMenu.innerHTML=options
    
        $("#idSelect").slideDown(1000);
        $("#update").slideDown(1000);
        
    } 
    else 
    {
        $("#idSelect").hide(1000);
        $("#update").hide(1000);
    }
  }
  
  addEventListener("change", ({target}) => { if(target.matches("input[type='radio']")){ checkUpdateradio(); } })
  updateBtn.onclick=function()
  {
    update()
  }