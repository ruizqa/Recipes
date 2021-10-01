$(".register").on("submit",function(e){
    e.preventDefault();
    let is_valid = true;
    let messages='';
    let re_email = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    $(e.target).children('.messages').text(" ")

    if(e.target.fname.value.length <2 || e.target.lname.value.length <2)
    {
        messages +='<p>The first name and last name must be at least two characters long</p>'
        is_valid = false;

    }
    if (!re_email.test(e.target.email.value)){

        messages+='<p>The email is invalid</p>'
        is_valid = false;
    }
    if(e.target.pw.value != e.target.cpw.value){

        messages += '<p>The passwords must match</p>'
        is_valid = false;
    } 
    
    if (is_valid == true){
        Register(e.target)
    }
    else{
        $(e.target).children('.messages').html(messages)
    }
})

Register = async function(data){
    let form_data = new FormData(data);
    let url='/register';
    let settings={
        method:'POST',
        body: form_data
    };
    // console.log('sending data');
    let response = await fetch(url, settings);
    // console.log('response', response);
    let data_r = await response.json();
    // console.log(data_r);
    if(data_r.ok){
        window.location.href = "/homepage";
    }
    else{
        $(data).children('.messages').text(data_r.content);
    }

}

$(".login").on("submit",function(e){
    e.preventDefault();
    let is_valid = true;
    let messages='';
    let re_email = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (!re_email.test(e.target.email.value)){

        messages+='<p>The email is invalid</p>'
        is_valid = false;
    }
    if(e.target.pw.value.length <1){

        messages += '<p>Please enter a password</p>'
        is_valid = false;
    } 
    
    if (is_valid == true){
        Login(e.target)
    }
    else{
        $(e.target).children('.messages').html(messages)
    }
})

Login = async function(data){
    let form_data = new FormData(data);
    let url='/login';
    let settings={
        method:'POST',
        body: form_data
    };

    let send_r = await fetch(url, settings);
    let response = await send_r.json();
    if(response.ok){
        window.location.href = "/homepage";
    }
    else{
        $(data).children('.messages').text(response.content);
    }

}

$(".addRecipe").on("submit",function(e){
    e.preventDefault();
    let is_valid = true;
    let messages='';
    $(e.target).children('.messages').html("")
    if(e.target.name.value.length <3 || e.target.description.value.length <3 || e.target.instructions.value.length <3)
    {
        
        messages +='<p>The name of the recipe, its description and instructions must all be at least 3 characters long</p>'
        is_valid = false;

    }

    if(!e.target.made_on.value || !e.target.under_30min.value){
        is_valid = false;
        
    }
    
    if(is_valid){
        console.log("Recipe is valid")
        AddRecipe(e.target);
        
    }

    else{
        console.log("Recipe is invalid")
        $(e.target).children('.messages').html(messages)
    }
})

AddRecipe = async function(data){
    let form_data = new FormData(data);
    let url='/addRecipe';
    let settings={
        method:'POST',
        body: form_data
    };
    console.log('sending data');
    let response = await fetch(url, settings);
    console.log('response', response);
    let data_r = await response.json();
    console.log(data_r);
    if(data_r.ok){
        console.log(data_r.data)
        $('.recipes-tbody').append(`
        <tr>
            <td>${data_r.data.name}</td>
            <td>${data_r.data.under_30min}</td>
            <td class="d-flex flex-row justify-content-evenly"> 
                <a class="text-dark fw-b" href="/recipes/${data_r.data.id}">View Instructions</a>
                    <a class="text-dark fw-b" href="/recipes/edit/${data_r.data.id}">Edit</a>
                    <a class="text-dark fw-b" href="/recipes/delete/${data_r.data.id}">Delete</a>
                
            </td>
        
        </tr>`)
    }
    else{
        $(data).children('.messages').text(data_r.content);
    }

}